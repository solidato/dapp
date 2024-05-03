import { useSignMessage } from "wagmi";

import { useSnackbar } from "./useSnackbar";
import useUser from "./useUser";

export default function useWalletLogin() {
  const { signMessageAsync } = useSignMessage();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateUser } = useUser();

  const getSigningToken = async () => {
    const response = await fetch("/api/walletLogin", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const resBody = await response.json();
    if (!response.ok) throw resBody;
    return resBody;
  };

  const loginAuthUser = async (payload: { signature: string; signingToken: string }) => {
    const response = await fetch("/api/walletLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const resBody = await response.json();
    if (!response.ok) throw resBody;
    return resBody;
  };

  const handleWalletLogin = async () => {
    try {
      const { message, signingToken } = await getSigningToken();
      const signature = await signMessageAsync({ message });
      const authUser = await loginAuthUser({
        signature,
        signingToken,
      });
      mutateUser(authUser);
    } catch (err: any) {
      console.error("Login Failed:", err);
      enqueueSnackbar(`Login Failed: ${err.error}`, { variant: "error" });
    }
  };

  return { handleWalletLogin };
}
