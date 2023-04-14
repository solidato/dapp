import { useState } from "react";

import { Alert, Box, Button, Slider, TextField, Typography } from "@mui/material";

import Modal from "@components/Modal";

import useUserBalanceAndOffers from "@hooks/useUserBalanceAndOffers";

export default function DepositTokens() {
  const [modalOpen, setModalOpen] = useState(false);
  const [approved, setApproved] = useState(false); // todo get this from the contract
  const [depositing, setDepositing] = useState(0);

  const { data } = useUserBalanceAndOffers();

  const handleDepositTokens = async () => {
    // todo contract interaction
  };

  const maxToOffer = data?.balance.maxToOffer || 0;

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} disabled={maxToOffer === 0}>
        I want to deposit tokens
      </Button>
      <Modal open={modalOpen} setOpen={setModalOpen} size="medium">
        <>
          <Typography variant="h5">Deposit tokens</Typography>
          {approved ? (
            <>
              <Box sx={{ p: 4 }}>
                <Slider
                  size="small"
                  value={depositing}
                  max={maxToOffer}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  step={100}
                  marks={[
                    {
                      value: maxToOffer,
                      label: "Max Tokens",
                    },
                  ]}
                  onChange={(_, value) => setDepositing(value as number)}
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
                  value={depositing}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value) < 0 ? 0 : Number(e.target.value);
                    setDepositing(inputValue > maxToOffer ? maxToOffer : inputValue);
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "center", pt: 4 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={depositing === 0}
                  onClick={handleDepositTokens}
                >
                  Deposit tokens
                </Button>
              </Box>
            </>
          ) : (
            <Alert
              severity="warning"
              action={
                <Button variant="contained" onClick={() => setApproved(true)}>
                  Approve NEOK
                </Button>
              }
              sx={{ mt: 2 }}
            >
              Before depositing, you need to approve the contract to spend your NEOK. You have to do this only once,
              forever.
            </Alert>
          )}
        </>
      </Modal>
    </>
  );
}
