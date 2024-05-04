import { AuthUser } from "types";

const userFactory = (data: Partial<AuthUser>): AuthUser => ({
  id: data.id || -1,
  name: data.name || "",
  email: data.email || "",
  ethAddress: data.ethAddress || "",
  isLoggedIn: Boolean(data.isLoggedIn),
});

export default userFactory;
