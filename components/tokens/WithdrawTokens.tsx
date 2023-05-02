import { useAccount } from "wagmi";

import { useState } from "react";

import { CloseRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, IconButton, InputAdornment, Slider, TextField, Typography } from "@mui/material";

import { calculateSteps } from "@lib/utils";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";

import Modal from "@components/Modal";

import useUserBalanceAndOffers from "@hooks/useUserBalanceAndOffers";
import useWithdrawTokens from "@hooks/useWithdrawTokens";

export default function WithdrawTokens() {
  const { address } = useAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawing, setWithdrawing] = useState(0);
  const [withdrawalAddress, setWithdrawalAddress] = useState(String(address));
  const [changeAddress, setChangeAddress] = useState(false);
  const { isAwaitingConfirmation, isLoading } = useBlockchainTransactionStore();

  const { data } = useUserBalanceAndOffers();
  const { onSubmit } = useWithdrawTokens();

  const handlePlaceOffer = async () => {
    const submitted = await onSubmit({ amount: withdrawing, toAddress: withdrawalAddress });
    if (submitted) {
      setModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setWithdrawing(0);
    setWithdrawalAddress(String(address));
    setChangeAddress(false);
  };

  const handleSetChangeAddress = () => {
    setChangeAddress(true);
    setTimeout(() => {
      document.getElementById("address")?.focus();
    }, 100);
  };

  const handleResetSetChangeAddress = () => {
    setChangeAddress(false);
    setWithdrawalAddress(String(address));
  };

  const maxToWithdraw = data?.balance.unlockedTokens || 0;

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} disabled={maxToWithdraw === 0}>
        Withdraw tokens
      </Button>
      <Modal open={modalOpen} onClose={handleModalClose} size="medium">
        <>
          <Typography variant="h5">Withdraw tokens</Typography>
          <Box sx={{ p: 4 }}>
            <Slider
              size="small"
              value={withdrawing}
              max={maxToWithdraw}
              aria-label="Small"
              valueLabelDisplay="auto"
              step={calculateSteps(maxToWithdraw)}
              marks={[
                {
                  value: maxToWithdraw,
                  label: "Max Tokens",
                },
              ]}
              onChange={(_, value) => setWithdrawing(value as number)}
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <TextField
              id="tokens-number"
              label="Tokens"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value={withdrawing}
              onChange={(e) => {
                const inputValue = Number(e.target.value) < 0 ? 0 : Number(e.target.value);
                setWithdrawing(inputValue > maxToWithdraw ? maxToWithdraw : inputValue);
              }}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            {changeAddress ? (
              <TextField
                id="address"
                label="Withdrawal address"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={withdrawalAddress}
                onChange={(e) => {
                  setWithdrawalAddress(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle back" onClick={handleResetSetChangeAddress} edge="end">
                        <CloseRounded />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <Alert
                severity="info"
                action={
                  <Button size="small" variant="outlined" onClick={handleSetChangeAddress}>
                    Change
                  </Button>
                }
              >
                By default you will receive your tokens on the same address you are connected with: <b>{address}</b>
              </Alert>
            )}
          </Box>
          <Box sx={{ textAlign: "center", pt: 2 }}>
            <LoadingButton
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={withdrawing === 0 || withdrawalAddress.trim() === ""}
              onClick={handlePlaceOffer}
              loading={isAwaitingConfirmation || isLoading}
            >
              Withdraw
            </LoadingButton>
          </Box>
        </>
      </Modal>
    </>
  );
}
