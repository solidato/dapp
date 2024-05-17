import { useRouter } from "next/router";

import { Controller, useForm } from "react-hook-form";

import { Box, Button, Grid, TextField } from "@mui/material";

import { Shareholder } from "../../schema/shareholders";

export default function ShareholderForm({
  shareholder,
  onConfirm,
  onCancel,
}: {
  shareholder?: Shareholder;
  onConfirm: (data: any) => void;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const { ethAddress } = router.query;
  const defaultValues = {
    name: "",
    email: "",
    ethAddress: ethAddress?.toString() || "",
    avatar: "",
    personalIdNumber: "",
    birthdate: "",
    residenceAddress: "",
    country: "",
    nationality: "",
    phone: "",
    hourlyRate: "",
  };
  const { control, handleSubmit } = useForm<Shareholder>({
    defaultValues,
    ...(shareholder && { values: shareholder }),
  });

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
              <TextField required sx={{ mt: 1, width: "100%" }} id="user-email" label="Email" {...field} />
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
                sx={{ mt: 1, width: "100%" }}
                id="user-ethAddress"
                label="Ethereum address"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="personalIdNumber"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ mt: 1, width: "100%" }}
                id="personalIdNumber"
                label="Personal identification number (only Estonians and e-residents)"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="birthdate"
            control={control}
            render={({ field }) => (
              <TextField sx={{ mt: 1, width: "100%" }} id="birthdate" label="Date of birth (dd/mm/yy)" {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="residenceAddress"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ mt: 1, width: "100%" }}
                id="residenceAddress"
                label="Residence address (apartment, house, street, city, postal code)"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField sx={{ mt: 1, width: "100%" }} id="country" label="Country of residence" {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ mt: 1, width: "100%" }}
                id="nationality"
                label="Nationality (as in the presented document)"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField sx={{ mt: 1, width: "100%" }} id="phone" label="Phone number (with country code)" {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="hourlyRate"
            control={control}
            render={({ field }) => (
              <TextField sx={{ mt: 1, width: "100%" }} id="hourlyRate" label="Hourly Rate" {...field} />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <TextField sx={{ mt: 1, mb: 2, width: "100%" }} id="user-avatar" label="Avatar" {...field} />
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
