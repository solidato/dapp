import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { shallow } from "zustand/shallow";

import { useState } from "react";

import { Alert, Chip, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import useLoginModalStore from "@store/loginModal";

import { useSnackbar } from "@hooks/useSnackbar";
import useUser from "@hooks/useUser";
import useWalletLogin from "@hooks/useWalletLogin";

export default function SimpleLoginForm({ onLoggedIn }: { onLoggedIn?: () => void }) {
  const { query } = useRouter();
  const { open: openWeb3Modal } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { handleWalletLogin } = useWalletLogin();

  const { enqueueSnackbar } = useSnackbar();
  const [openLoginForm, setOpenLoginForm] = useState(false);

  const { mutateUser, user: sessionUser } = useUser(
    !onLoggedIn
      ? {
          redirectTo: String(query?.redirectTo || "/"),
          redirectIfFound: true,
        }
      : {},
  );

  const { setIsReadyToSign, openLoginModal } = useLoginModalStore(
    (state) => ({
      setIsReadyToSign: state.setIsReadyToSign,
      openLoginModal: state.openLoginModal,
    }),
    shallow,
  );

  const connectedButLoggedOut = !sessionUser?.isLoggedIn && isConnected;

  const [user, setUser] = useState<{ username: string; password: string }>({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user }),
    });
    if (res.status === 200) {
      const resUser = await res.json();
      mutateUser(resUser);
      onLoggedIn && onLoggedIn();
    } else {
      enqueueSnackbar(res.status >= 500 ? (await res.json())?.error : "Login Failed: Invalid email or password", {
        variant: "error",
      });
    }
    setIsLoading(false);
  };

  const handleSignInClick = async () => {
    await handleWalletLogin();
  };

  return (
    <>
      {!isConnected ? (
        <Button variant="outlined" onClick={() => openWeb3Modal()} fullWidth size="large">
          Connect your Wallet
        </Button>
      ) : (
        <Button variant="contained" onClick={() => handleSignInClick()} fullWidth size="large">
          Click to Login
        </Button>
      )}
    </>
  );
}
