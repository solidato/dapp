const COMMON_FIELDS = ["display_name", "email", "ethereum_address"];

export const USER_FIELDS = {
  neokingdom: [...COMMON_FIELDS, "avatar_256"],
  teledisko: [...COMMON_FIELDS, "image"],
};
