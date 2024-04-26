import { useAccount, useSignMessage } from "wagmi";

import { useCallback } from "react";

import { useSnackbar } from "./useSnackbar";
import useUser from "./useUser";

export default function useWalletOdooLogin() {
  const { address } = useAccount();
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

  const getAccessToken = async (payload: { signature: string; signingToken: string }) => {
    const response = await fetch("/api/walletLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const resBody = await response.json();
    if (!response.ok) throw resBody;
    return resBody;
  };

  const getAuthUser = async (payload: { address: `0x${string}`; signature: string; signingToken: string }) => {
    const response = await fetch("/api/walletLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const resBody = await response.json();
    if (!response.ok) throw resBody;
    return resBody;
  };

  const handleWalletOdooLogin = useCallback(
    async function () {
      if (address) {
        try {
          const { message, signingToken } = await getSigningToken();
          const signature = await signMessageAsync({ message });
          const authUser = await getAuthUser({
            address,
            signature,
            signingToken,
          });
          mutateUser(authUser);
        } catch (err: any) {
          console.error("Login Failed:", err);
          enqueueSnackbar(`Login Failed: ${err.error}`, { variant: "error" });
        }
      }
    },
    [address], // eslint-disable-line
  );

  const handleWalletLogin = async () => {
    try {
      const { message, signingToken } = await getSigningToken();
      const signature = await signMessageAsync({ message });
      console.log("🐞 > signature:", signature);
      const authUser = await getAccessToken({
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
