import { useAccount } from "wagmi";

import { Alert, CircularProgress } from "@mui/material";

import useResolutionsAcl from "@hooks/useResolutionsAcl";

import NewConfirmation from "./NewConfirmation";

NewConfirmationPage.title = "New resolution confirmation";
NewConfirmationPage.requireLogin = false;
NewConfirmationPage.checkMismatch = true;

export default function NewConfirmationPage() {
  const { acl, isLoading } = useResolutionsAcl();
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Alert severity="warning">Please connect your wallet first</Alert>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return acl?.canCreate ? (
    <NewConfirmation />
  ) : (
    <Alert severity="error">You don&apos;t have permission to create a resolution</Alert>
  );
}
