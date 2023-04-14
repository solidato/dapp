import { Offer } from "types";

import { useState } from "react";

import { Alert, Box, Button, Grid, Slider, TextField, Typography } from "@mui/material";

import Modal from "@components/Modal";

import { bigIntToNum } from "@hooks/useUserBalanceAndOffers";

import OfferCard from "./OfferCard";

export default function OffersList({ offers }: { offers: Offer[] }) {
  const [matchingOfferOpen, setMatchingOfferOpen] = useState<Offer | null>(null);
  const [approved, setApproved] = useState(false); // todo get/set this from the contract
  const [matchingTokens, setMatchingTokens] = useState(0);

  const handleOnMatch = (offer: Offer) => {
    setMatchingOfferOpen(offer);
  };

  const handleMatchOffer = () => {
    setMatchingOfferOpen(null);
    console.log("TODO: call contract method, reset state, close modal, etc");
  };

  const maxToOffer = matchingOfferOpen ? bigIntToNum(matchingOfferOpen?.amount) : 0; // will be USDC balance (if less than offer amount, otherwise offer amount)

  return (
    <>
      <Modal open={!!matchingOfferOpen} setOpen={() => setMatchingOfferOpen(null)} size="medium">
        <>
          <Typography variant="h5">Match offer</Typography>
          {approved ? (
            <>
              <Alert sx={{ mt: 2 }} severity="info">
                Your USDC balance is 8k, The offer is 10k, you can buy up to 8k
              </Alert>
              <Box sx={{ p: 4 }}>
                <Slider
                  size="small"
                  value={matchingTokens}
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
                  onChange={(_, value) => setMatchingTokens(value as number)}
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
                  value={matchingTokens}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value) < 0 ? 0 : Number(e.target.value);
                    setMatchingTokens(inputValue > maxToOffer ? maxToOffer : inputValue);
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "center", pt: 4 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  disabled={matchingTokens === 0}
                  onClick={handleMatchOffer}
                >
                  Match offer
                </Button>
              </Box>
            </>
          ) : (
            <Alert
              severity="warning"
              action={
                <Button variant="contained" size="small" onClick={() => setApproved(true)}>
                  Approve USDC
                </Button>
              }
              sx={{ mt: 2 }}
            >
              Before buying, you need to approve the contract to spend your USDC. You have to do this only once,
              forever.
            </Alert>
          )}
        </>
      </Modal>
      <Grid container spacing={2}>
        {offers.map((offer) => (
          <Grid key={offer.id} item xs={12} md={6} lg={4}>
            <OfferCard offer={offer} onMatchClicked={handleOnMatch} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
