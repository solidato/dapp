import { ShareholderStatus } from "../types";

export const TEMP_SHAREHOLDERS_VALUES: Record<string, { percentage: number; shares: number }> = {
  "0xbded7c8a2efa4cf2ee6c953e6447a246f3ac4e12": {
    percentage: 11.82,
    shares: 2000,
  },
  "0xace13f04231222a585573312ccf811e9e61ed958": {
    percentage: 11.82,
    shares: 2000,
  },
  "0xa64d568f331f2774d5cff492f2299505abc0186a": {
    percentage: 23.63,
    shares: 4000,
  },
  "0x8e2e09eb2a0a8e6e1d8de3e5fb09ec1e05b0cdbf": {
    percentage: 11.82,
    shares: 2000,
  },
  "0x6b7bfdeb2c5282f284111738987ccf54291bd3da": {
    percentage: 11.82,
    shares: 2000,
  },
  "0x62817523f3b94182b9df911a8071764f998f11a4": {
    percentage: 11.82,
    shares: 2000,
  },
  "0x4b2625de2d7236b18f728d8c56ae9d9fce910f9f": {
    percentage: 11.82,
    shares: 2000,
  },
  "0xda817b0e5dd79303239876c64ff6d2047077ff6c": {
    percentage: 0.47,
    shares: 79,
  },
  "0x4706ed7a10064801f260bbf94743f241fcef815e": {
    percentage: 5.0,
    shares: 846,
  },
};

export const ODOO_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

export const SHAREHOLDERS_ROLES: Record<string, ShareholderStatus> = {
  BOARD_MEMBER: "Board Member",
  ACTIVE_SHAREHOLDER: "Active Shareholder",
  PASSIVE_SHAREHOLDER: "Passive Shareholder",
  COMMON_SHAREHOLDER: "Common Shareholder",
};

export const STAGE_TO_COLOR_MAP: Record<string, string> = {
  backlog: "default",
  created: "default",
  progress: "primary",
  inprogress: "primary",
  done: "success",
  approved: "warning",
  canceled: "error",
};

export const TAGS_COLORS: Record<number, string> = {
  1: "#AB46D2",
  2: "#FCF69C",
  3: "#F7D060",
  4: "#A8D1D1",
  5: "#ADA2FF",
  6: "#FF6D28",
  7: "#D49D42",
  8: "#C15050",
  9: "#F0D43A",
  10: "#CC0066",
  11: "#AB46D2",
  12: "#FCF69C",
  13: "#F7D060",
  14: "#A8D1D1",
  15: "#ADA2FF",
  16: "#FF6D28",
  17: "#D49D42",
  18: "#C15050",
  19: "#F0D43A",
  20: "#CC0066",
  21: "#AB46D2",
  22: "#FCF69C",
  23: "#F7D060",
  24: "#A8D1D1",
  25: "#ADA2FF",
  26: "#FF6D28",
  27: "#D49D42",
  28: "#C15050",
  29: "#F0D43A",
  30: "#CC0066",
};

export const BLOCKCHAIN_TRANSACTION_KEYS = {
  APPROVE_TO_OFFER: "approveToOffer",
  APPROVE_TO_MATCH_OFFER: "approveToMatchOffer",
  OFFER_TOKENS: "offerTokens",
  REDEEM_TOKENS: "redeemTokens",
  MATCH_TOKENS: "matchTokens",
  APPROVE_DEPOSIT_NEOK: "approveDepositNeok",
  DEPOSIT_NEOK: "depositNeok",
};

const PROJECT_TASK_TYPE_TELEDISKO = [
  {
    id: 1,
    name: "Created",
  },
  {
    id: 90,
    name: "Inbox",
  },
  {
    id: 97,
    name: "Internal",
  },
  {
    id: 5,
    name: "In Progress",
  },
  {
    id: 91,
    name: "Today",
  },
  {
    id: 2,
    name: "Done",
  },
  {
    id: 92,
    name: "This Week",
  },
  {
    id: 3,
    name: "Approved",
  },
  {
    id: 93,
    name: "This Month",
  },
  {
    id: 94,
    name: "Later",
  },
  {
    id: 96,
    name: "Canceled",
  },
];

const PROJECT_TASK_TYPE_NEOKINGDOM = [
  {
    id: 29,
    name: "Created",
  },
  {
    id: 156,
    name: "Inbox",
  },
  {
    id: 30,
    name: "In Progress",
  },
  {
    id: 157,
    name: "Today",
  },
  {
    id: 31,
    name: "Done",
  },
  {
    id: 158,
    name: "This Week",
  },
  {
    id: 32,
    name: "Approved",
  },
  {
    id: 159,
    name: "This Month",
  },
  {
    id: 160,
    name: "Later",
  },
  {
    id: 162,
    name: "Canceled",
  },
];

const PROJECT_TASK_TYPE_CROWDPUNK = [
  {
    id: 1,
    name: "Created",
  },
  {
    id: 9,
    name: "Inbox",
  },
  {
    id: 10,
    name: "Today",
  },
  {
    id: 37,
    name: "In Progress",
  },
  {
    id: 11,
    name: "This Week",
  },
  {
    id: 38,
    name: "Done",
  },
  {
    id: 12,
    name: "This Month",
  },
  {
    id: 39,
    name: "Approved",
  },
  {
    id: 13,
    name: "Later",
  },
  {
    id: 14,
    name: "Done",
  },
  {
    id: 15,
    name: "Canceled",
  },
];

const STAGE_IDS: Record<string, { id: number; name: string }[]> = {
  crowdpunk: PROJECT_TASK_TYPE_CROWDPUNK,
  teledisko: PROJECT_TASK_TYPE_TELEDISKO,
  neokingdom: PROJECT_TASK_TYPE_NEOKINGDOM,
};

export const getStageId = (stageName: string) => {
  const PROJECT_TASK_TYPE = STAGE_IDS[process.env.NEXT_PUBLIC_PROJECT_KEY];
  const stage = PROJECT_TASK_TYPE?.find((projectType) => projectType.name.toLowerCase() === stageName.toLowerCase());
  return stage?.id;
};
