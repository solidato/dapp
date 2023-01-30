import { OdooUser } from "types";

export type User = {
  uid: number;
  username: string;
  password: string;
  isLoggedIn: boolean;
} & OdooUser;

const userFactory = (user: Partial<User> = {}): User => ({
  uid: -1,
  username: "",
  password: "",
  isLoggedIn: false,
  email: "",
  ethereum_address: "",
  display_name: "",
  ...user,
});

export default userFactory;
