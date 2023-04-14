import { useState } from "react";

import { Alert, Box, Button, Slider, TextField, Typography } from "@mui/material";

import Modal from "@components/Modal";

import useOfferTokens from "@hooks/useOfferTokens";
import useUserBalanceAndOffers from "@hooks/useUserBalanceAndOffers";

export default function OfferTokens() {
  const [modalOpen, setModalOpen] = useState(false);
  const [approved, setApproved] = useState(false); // todo get this from the contract
  const [offered, setOffered] = useState(0);

  const { data } = useUserBalanceAndOffers();
  const { onSubmit } = useOfferTokens();

  const handlePlaceOffer = async () => {
    const submitted = await onSubmit({ amount: offered });
    if (submitted) {
      setModalOpen(false);
    }
  };

  const maxToOffer = data?.balance.maxToOffer || 0;

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} disabled={maxToOffer === 0}>
        I want to offer my tokens
      </Button>
      <Modal open={modalOpen} setOpen={setModalOpen} size="medium">
        <>
          <Typography variant="h5">Token offer</Typography>
          {approved ? (
            <>
              <Box sx={{ p: 4 }}>
                <Slider
                  size="small"
                  value={offered}
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
                  onChange={(_, value) => setOffered(value as number)}
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
                  value={offered}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value) < 0 ? 0 : Number(e.target.value);
                    setOffered(inputValue > maxToOffer ? maxToOffer : inputValue);
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "center", pt: 4 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={offered === 0}
                  onClick={handlePlaceOffer}
                >
                  Place offer
                </Button>
              </Box>
            </>
          ) : (
            <Alert
              severity="warning"
              action={
                <Button variant="contained" onClick={() => setApproved(true)}>
                  Approve
                </Button>
              }
              sx={{ mt: 2 }}
            >
              Before offering, you need to approve the contract to spend your *NEOK INTERNAL*. You have to do this only
              once, forever. TODO define terminology here
            </Alert>
          )}
        </>
      </Modal>
    </>
  );
}
