import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

import { getShareholdersInfo } from "@graphql/subgraph/queries/get-shareholders-info-query";

import { sessionOptions } from "@lib/session";

import { db } from "../../../drizzle";
import { SHAREHOLDERS_ROLES } from "../../../lib/constants";
import { fetcherGraphqlPublic } from "../../../lib/graphql/subgraph/subgraph-client";
import { bigIntToNum } from "../../../lib/utils";
import { insertShareholdersSchema, shareholders } from "../../../schema/shareholders";
import { Shareholder } from "../../../schema/shareholders";

const shareholdersRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = req.session.cookie;
  if (!cookie) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    const users = await fetcherGraphqlPublic([getShareholdersInfo, {}]);
    const shareholders = await db.query.shareholders.findMany();
    const shareholdersAddresses = shareholders.reduce((acc, shareholder) => {
      acc[shareholder.ethAddress] = shareholder;
      return acc;
    }, {} as Record<string, Shareholder>);

    const totalVotingPower = bigIntToNum(users?.daoManager?.totalVotingPower || BigInt(0));
    const daoUsers = users.daoUsers
      .map((daoUser) => ({
        ...daoUser,
        status: getShareholderStatus(daoUser.address, users.daoManager),
        power: ((100 * bigIntToNum(daoUser.votingPower)) / totalVotingPower).toFixed(2),
        // ownership: number of gov token in wallet + shares / total supply of gov token + shares * 100,
        // shareholder rights: number of gov token in wallet + shares
        user: shareholdersAddresses[daoUser.address],
      }))
      .filter((user) => user.status.length > 0)
      .sort((userA, userB) => (Number(userB.power) > Number(userA.power) ? 1 : -1));

    return res.status(200).json(daoUsers);
  }

  if (req.method === "POST") {
    try {
      const shareholder = insertShareholdersSchema.parse(JSON.parse(req.body));
      const newShareholder = await db.insert(shareholders).values(shareholder).returning();
      return res.status(200).json(newShareholder);
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({ message: "Validation Error!", errors: err.format() });
      }
      let duplicateKeyError = "";
      if (err.message.includes("email_idx")) {
        duplicateKeyError = "Email already exists!";
      }
      if (err.message.includes("eth_address_idx")) {
        duplicateKeyError = "Eth address already exists!";
      }
      return res.status(500).json({ message: duplicateKeyError || err.message });
    }
  }
};

function getShareholderStatus(address: string, daoManager: any) {
  if (!daoManager || !address) return [];
  const isManagingBoard = daoManager?.managingBoardAddresses.includes(address.toLowerCase());
  const isContributor = daoManager?.contributorsAddresses.includes(address.toLowerCase());
  const isShareholder = daoManager?.shareholdersAddresses.includes(address.toLowerCase());
  const isCommonShareholder = isManagingBoard && !isContributor;
  const isActiveShareholder = isManagingBoard && isContributor;
  const isPassiveShareholder = isShareholder;
  return [
    isManagingBoard && SHAREHOLDERS_ROLES.BOARD_MEMBER,
    isCommonShareholder && SHAREHOLDERS_ROLES.COMMON_SHAREHOLDER,
    isActiveShareholder && SHAREHOLDERS_ROLES.ACTIVE_SHAREHOLDER,
    isPassiveShareholder && SHAREHOLDERS_ROLES.PASSIVE_SHAREHOLDER,
  ].filter(Boolean);
}

export default withIronSessionApiRoute(shareholdersRoute, sessionOptions);
