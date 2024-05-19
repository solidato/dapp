import { SHAREHOLDERS_ROLES } from "./constants";

export function getShareholderStatus(address: string, daoManager: any) {
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
