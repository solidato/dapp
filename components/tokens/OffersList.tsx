import { Offer } from "types";

import { CircularProgress } from "@mui/material";

import useUserBalanceAndOffers from "@hooks/useUserBalanceAndOffers";

const filterNonExpired = (offer: Offer) => Number(offer.expirationTimestamp) * 1000 > Date.now();

const filterExpired = (offer: Offer) => Number(offer.expirationTimestamp) * 1000 <= Date.now();

export default function OffersList({ onlyExpired = false }: { onlyExpired?: boolean }) {
  const { data, isLoading } = useUserBalanceAndOffers();

  if (isLoading) {
    return <CircularProgress />;
  }

  const offers = (data?.offers || []).filter(onlyExpired ? filterExpired : filterNonExpired);

  return (
    <>
      {offers.map((offer) => (
        <div key={offer.id}>{offer.id}</div>
      ))}
    </>
  );
}
