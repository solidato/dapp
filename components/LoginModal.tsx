import { useAccount } from "wagmi";
import { shallow } from "zustand/shallow";

import { Alert, Box, Button, Chip, Divider } from "@mui/material";

import useLoginModalStore from "@store/loginModal";

import useWalletLogin from "@hooks/useWalletLogin";

import Modal from "./Modal";
import SimpleLoginForm from "./SimpleLoginForm";

export default function LoginModal() {
  const { handleWalletLogin } = useWalletLogin();

  const { modalOpen, handleModalClose, readyToSign, setIsReadyToSign } = useLoginModalStore(
    (state) => ({
      modalOpen: state.isLoginModalOpen,
      handleModalOpen: state.handleOpenLoginModalFromLink,
      handleModalClose: state.closeLoginModal,
      readyToSign: state.isReadyToSign,
      setIsReadyToSign: state.setIsReadyToSign,
    }),
    shallow,
  );

  const handleSignInClick = async () => {
    await handleWalletLogin();
    handleModalClose();
  };

  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <>
        {readyToSign ? (
          <>
            <Alert severity="info" sx={{ mb: 2 }}>
              Your wallet is connected. Log in to Odoo by signing a message with your wallet.
            </Alert>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button focusRipple variant="contained" onClick={handleSignInClick}>
                Sign in
              </Button>
              <Divider sx={{ pt: 4, mb: 4 }}>
                <Chip label="Or" />
              </Divider>
              <Button variant="outlined" onClick={() => setIsReadyToSign(false)}>
                Go back
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ pt: 3 }}>
            <SimpleLoginForm onLoggedIn={handleModalClose} />
          </Box>
        )}
      </>
    </Modal>
  );
}
