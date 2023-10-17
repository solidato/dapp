import useSWR from "swr";
import { useAccount } from "wagmi";

import { Alert, Button, Container } from "@mui/material";

import { fetcher } from "@graphql/client";
import { getDaoManagerQuery } from "@graphql/queries/get-dao-manager.query";

import useLogout from "@hooks/useLogout";
import useResolutionsAcl from "@hooks/useResolutionsAcl";

export default function ExtraneousWarning() {
  const { acl, isLoading } = useResolutionsAcl();
  const { isConnected, address, isConnecting } = useAccount();
  const { data, isLoading: isLoadingGetDaoManager } = useSWR<any>(address ? getDaoManagerQuery : null, fetcher);
  const { logout } = useLogout();

  if (!isLoadingGetDaoManager && data.daoManager === null) {
    return (
      <Container maxWidth="lg" sx={{ mb: 6, mt: 1 }}>
        <Alert severity="error">
          There are indexing problems. If this persist please reach out to the dev team on Discord.
        </Alert>
      </Container>
    );
  }

  if (
    !isLoading &&
    !isLoadingGetDaoManager &&
    acl?.isExtraneous &&
    isConnected &&
    !isConnecting &&
    address &&
    data.daoManager
  ) {
    return (
      <Container maxWidth="lg" sx={{ mb: 6, mt: 1 }}>
        <Alert
          severity="warning"
          action={
            <Button size="small" variant="outlined" onClick={() => logout()} sx={{ whiteSpace: "nowrap", ml: 2 }}>
              Log out
            </Button>
          }
        >
          The addess ({address}) of the wallet you&apos;re connected with is not part of the DAO users addresses.{" "}
        </Alert>
      </Container>
    );
  }

  return null;
}
