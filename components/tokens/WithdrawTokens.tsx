import { useAccount } from "wagmi";

import { useState } from "react";

import { Alert, Box, Button, Slider, TextField, Typography } from "@mui/material";

import Modal from "@components/Modal";

import useUserBalanceAndOffers from "@hooks/useUserBalanceAndOffers";
import useWithdrawTokens from "@hooks/useWithdrawTokens";

export default function WithdrawTokens() {
  const { address } = useAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawing, setWithdrawing] = useState(0);
  const [withdrawalAddress, setWithdrawalAddress] = useState(String(address));
  const [changeAddress, setChangeAddress] = useState(false);

  const { data } = useUserBalanceAndOffers();
  const { onSubmit } = useWithdrawTokens();

  const handlePlaceOffer = async () => {
    const submitted = await onSubmit({ amount: withdrawing, toAddress: withdrawalAddress });
    if (submitted) {
      setModalOpen(false);
    }
  };

  const maxToWithdraw = data?.balance.unlocked || 0;

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} disabled={maxToWithdraw === 0}>
        Withdraw tokens
      </Button>
      <Modal open={modalOpen} setOpen={setModalOpen} size="medium">
        <>
          <Typography variant="h5">Withdraw tokens</Typography>
          <Box sx={{ p: 4 }}>
            <Slider
              size="small"
              value={withdrawing}
              max={maxToWithdraw}
              aria-label="Small"
              valueLabelDisplay="auto"
              step={100}
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
              />
            ) : (
              <Alert
                severity="info"
                action={
                  <Button size="small" variant="outlined" onClick={() => setChangeAddress(true)}>
                    Change
                  </Button>
                }
              >
                By default you will receive your tokens on the same address you are connected with: <b>{address}</b>
              </Alert>
            )}
          </Box>
          <Box sx={{ textAlign: "center", pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={withdrawing <= 0}
              onClick={handlePlaceOffer}
            >
              Withdraw
            </Button>
          </Box>
        </>
      </Modal>
    </>
  );
}
