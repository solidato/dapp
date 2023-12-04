import useGetNeokBalance from "@hooks/useGetNeokBalance";

import DepositTokens from "./tokens/DepositTokens";

export default function CheckNeokBalance() {
  const { neokBalance } = useGetNeokBalance();

  const hasNeokWhitelisted = (neokBalance || 0) > 0;

  return hasNeokWhitelisted ? <DepositTokens /> : null;
}
