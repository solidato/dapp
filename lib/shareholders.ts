import { SHAREHOLDERS_ROLES } from "./constants";

export function getShareholderStatus(address: string, daoManager: any) {
  if (!daoManager || !address) return [];
  const isManagingBoard = daoManager?.managingBoardAddresses.includes(address.toLowerCase());
  const isContributor = daoManager?.contributorsAddresses.includes(address.toLowerCase());
  const isShareholder = daoManager?.shareholdersAddresses.includes(address.toLowerCase());
  const isInvestor = daoManager?.investorsAddresses.includes(address.toLowerCase());

  const isActiveShareholder = isManagingBoard || isContributor;
  const isCommonShareholder = isManagingBoard && !isContributor;
  const isPassiveShareholder = isShareholder || isInvestor;

  if (address === "0x4706ed7a10064801f260bbf94743f241fcef815e") {
    // neokingdom
    return [SHAREHOLDERS_ROLES.PASSIVE_SHAREHOLDER];
  }

  return [
    isManagingBoard && SHAREHOLDERS_ROLES.BOARD_MEMBER,
    isCommonShareholder && SHAREHOLDERS_ROLES.COMMON_SHAREHOLDER,
    isActiveShareholder && SHAREHOLDERS_ROLES.ACTIVE_SHAREHOLDER,
    isPassiveShareholder && SHAREHOLDERS_ROLES.PASSIVE_SHAREHOLDER,
  ].filter(Boolean);
}
