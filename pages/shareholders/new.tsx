import { useRouter } from "next/router";

import { Grid, Typography } from "@mui/material";

import { useActions } from "@store/shareholderStore";

import ShareholderForm from "@components/shareholders/ShareholderForm";

import useErrorHandler from "@hooks/useErrorHandler";

NewShareholder.title = "New shareholder";
NewShareholder.requireLogin = true;

export default function NewShareholder() {
  const router = useRouter();
  const {
    query: { shareholderId },
  } = router;
  const actions = useActions();
  const { handleError } = useErrorHandler();
  const createShareholder = handleError(actions.createShareholder);

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item sx={{ display: "flex", justifyContent: "center" }} xs={12} md={9}>
          <Typography variant="h3">New Shareholder</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <ShareholderForm
            onConfirm={async (data) => {
              const { error } = await createShareholder(data);
              if (!error) router.push("/shareholders");
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
