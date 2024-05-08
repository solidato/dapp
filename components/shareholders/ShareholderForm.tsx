import { Controller, useForm } from "react-hook-form";

import { Box, Button, Grid, TextField } from "@mui/material";

import { Shareholder } from "../../schema/shareholders";

type FormData = {
  name: string;
  email: string;
  ethAddress: string;
};

export default function ShareholderForm({
  shareholder,
  onConfirm,
  onCancel,
}: {
  shareholder?: Shareholder;
  onConfirm: (data: any) => void;
  onCancel?: () => void;
}) {
  const defaultValues = {
    name: "",
    email: "",
    ethAddress: "",
  };
  const { control, handleSubmit } = useForm<FormData>({ defaultValues, ...(shareholder && { values: shareholder }) });

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onConfirm)();
      }}
      autoComplete="off"
    >
      <Grid sx={{ width: "100%", maxWidth: "500px" }} container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField required sx={{ mt: 3, width: "100%" }} id="user-name" label="Name" {...field} />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField required sx={{ mt: 3, width: "100%" }} id="user-email" label="Email" {...field} />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="ethAddress"
            control={control}
            render={({ field }) => (
              <TextField
                required
                sx={{ mt: 3, width: "100%" }}
                id="user-ethAddress"
                label="Ethereum address"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", mb: 2 }}>
            {onCancel && (
              <Button onClick={onCancel} variant="outlined" sx={{ mr: 2, flex: "50%" }}>
                Cancel
              </Button>
            )}

            <Button type="submit" variant="contained" sx={{ flex: "50%" }}>
              {shareholder ? "Update" : "Create"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
