import { renderToBuffer } from "@react-pdf/renderer";
import { db } from "drizzle";
import { withIronSessionApiRoute } from "iron-session/next";
import kebabCase from "lodash.kebabcase";
import { getResolution } from "model/resolution";
import { NextApiRequest, NextApiResponse } from "next";
import { ResolutionEntityEnhanced } from "types";

import React from "react";

import { getResolutionQuery } from "@graphql/subgraph/queries/get-resolution-query";
import { fetcherGraphqlPublic } from "@graphql/subgraph/subgraph-client";

import { getEnhancedResolutionMapper } from "@lib/resolutions/common";
import isCorrupted from "@lib/resolutions/corruption-check";
import { sessionOptions } from "@lib/session";

import ResolutionPdf from "@components/resolutions/Pdf";

const getResolutionPdf = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const cookie = req.session.cookie;
  if (!cookie) {
    return res.status(401).end("Unauthorised");
  }

  try {
    const graphQlResolutionData: any = await fetcherGraphqlPublic([getResolutionQuery, { id: id as string }]);

    if (graphQlResolutionData.resolution === null) {
      return res.status(404).send("resolution not found");
    }

    const shareholders = await db.query.shareholders.findMany();
    const shareholdersData = shareholders.map((user) => ({
      ethereumAddress: user.ethAddress,
      name: user.name,
      email: user.email,
    }));

    const currentTimestamp = +new Date();
    const resolutionData: ResolutionEntityEnhanced = getEnhancedResolutionMapper(currentTimestamp)(
      graphQlResolutionData?.resolution,
      true,
    );

    const dbResolution = await getResolution(resolutionData.ipfsDataURI as string);

    if (!dbResolution) {
      return res.status(404).end();
    }

    if (isCorrupted(dbResolution.hash, dbResolution)) {
      return res.status(500).send("This resolution is corrupted. Please reach out to engineers ASAP");
    }

    const pdf = await renderToBuffer(
      // @ts-ignore
      React.createElement(ResolutionPdf, {
        resolution: {
          ...resolutionData,
          title: dbResolution.title,
          content: dbResolution.content,
        },
        usersData: shareholdersData,
        resolutionUrl: `${{ solidato: "https://dao.solidato.org" }[process.env.NEXT_PUBLIC_PROJECT_KEY]}/resolutions/${
          resolutionData.id
        }`,
      }),
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename="#${resolutionData.id}-${kebabCase(resolutionData.title)}.pdf"`,
    );
    res.setHeader("Content-Type", "application/pdf");

    return res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send("failed to generate resolution pdf, please try again later");
  }
};

export default withIronSessionApiRoute(getResolutionPdf, sessionOptions);
