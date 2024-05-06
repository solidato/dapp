import { AuthUser } from "types";

const userFactory = (data: Partial<AuthUser>): AuthUser => ({
  id: data.id || -1,
  name: data.name || "",
  ethAddress: data.ethAddress || "",
  isLoggedIn: Boolean(data.isLoggedIn),
});

export default userFactory;
