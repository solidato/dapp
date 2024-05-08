import { useRouter } from "next/router";
import useSWR from "swr";

import { Grid, Typography } from "@mui/material";

import { fetcher } from "@lib/net";

import { useActions } from "@store/shareholderStore";

import ShareholderForm from "@components/shareholders/ShareholderForm";

import useErrorHandler from "@hooks/useErrorHandler";

import { Shareholder } from "../../../schema/shareholders";

EditShareholder.title = "Edit shareholder";
EditShareholder.requireLogin = true;

export default function EditShareholder() {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const actions = useActions();
  const { handleError } = useErrorHandler();
  const updateShareholder = handleError(actions.updateShareholder);
  const { data: shareholder } = useSWR<Shareholder>(id ? `/api/shareholders/${id}` : null, fetcher);

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={12} md={9}>
          <Typography variant="h3">Edit Shareholder</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <ShareholderForm
            shareholder={shareholder}
            onCancel={() => router.push("/shareholders")}
            onConfirm={async (data) => {
              const { error } = await updateShareholder(data);
              if (!error) router.push("/shareholders");
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
