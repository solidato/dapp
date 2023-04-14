import { format } from "date-fns";
import { Offer } from "types";

import { Alert, Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

import { getDateFromUnixTimestamp } from "@lib/resolutions/common";

import User from "@components/User";

import { bigIntToNum, isExpired } from "@hooks/useUserBalanceAndOffers";

export default function OfferCard({ offer, onMatchClicked }: { offer: Offer; onMatchClicked: (offer: Offer) => void }) {
  const expired = isExpired(offer);
  const expirationDate = format(getDateFromUnixTimestamp(offer.expirationTimestamp), "dd LLL yyyy HH:mm");
  return (
    <Card variant="outlined">
      <CardContent sx={{ pt: 3, pb: 3 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Created by
        </Typography>
        <User address={offer.from} sx={{ mb: 2 }} />
        {expired ? (
          <Alert severity="info">Offer expired on {expirationDate}</Alert>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Amount: {bigIntToNum(offer.amount)}
            </Typography>
            <Typography variant="body2">Expires {expirationDate}</Typography>
          </Box>
        )}
      </CardContent>
      {!expired && (
        <CardActions
          sx={{
            borderTop: (t) => `1px solid ${t.palette.divider}`,
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button size="small" variant="contained" onClick={() => onMatchClicked(offer)}>
            Match
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
