import { useDisconnect } from "wagmi";

import { useCallback } from "react";

import { useSnackbar } from "./useSnackbar";
import useUser from "./useUser";

export default function useLogout() {
  const { disconnect } = useDisconnect();
  const { user, mutateUser } = useUser();

  const { enqueueSnackbar } = useSnackbar();

  const logout = useCallback(async (fromDisconnect = false) => {
    try {
      if (!fromDisconnect) {
        disconnect();
      }
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        mutateUser(await res.json());
      } else {
        enqueueSnackbar("Logout failed, please try again later", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Network error, please try again later", { variant: "error" });
    }
  }, []);

  return { logout, user };
}
