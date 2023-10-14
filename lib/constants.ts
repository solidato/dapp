export const ODOO_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

export const STAGE_TO_COLOR_MAP: Record<STAGE_NAME, string> = {
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

export const getStageId = (stageName: string) => {
  const PROJECT_TASK_TYPE =
    process.env.NEXT_PUBLIC_PROJECT_KEY === "teledisko" ? PROJECT_TASK_TYPE_TELEDISKO : PROJECT_TASK_TYPE_NEOKINGDOM;
  const stage = PROJECT_TASK_TYPE.find((projectType) => projectType.name.toLowerCase() === stageName.toLowerCase());
  return stage?.id;
};
