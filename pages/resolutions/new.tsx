import { useAccount } from "wagmi";

import { Alert, CircularProgress } from "@mui/material";

import useResolutionsAcl from "@hooks/useResolutionsAcl";

import NewResolution from "../../components/NewResolution";

NewResolutionPage.title = "New resolution";
NewResolutionPage.requireLogin = true;

export default function NewResolutionPage() {
  const { acl, isLoading } = useResolutionsAcl();
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Alert severity="warning">Please connect your wallet first</Alert>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return acl?.canCreate ? (
    <NewResolution />
  ) : (
    <Alert severity="error">You don&apos;t have permission to create a resolution</Alert>
  );
}
