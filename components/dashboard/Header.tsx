import { useState } from "react";

import { Alert, Chip, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { useFeatureFlags } from "@lib/feature-flags/useFeatureFlags";

import User from "@components/User";

import useTimestamp from "@hooks/useTimestamp";
import useUser from "@hooks/useUser";

import Modal from "../Modal";

const messages: [number, string][] = [
  [22, "Working late 🦉"],
  [18, "Good evening 🌆"],
  [12, "Good afternoon 🌞"],
  [6, "Good morning 🐦"],
  [0, "Oh it's late 😴"],
];

export default function Header() {
  const { user } = useUser();
  const { currentTimestamp } = useTimestamp();
  const [infoOpen, setInfoOpen] = useState(false);
  const featureFlags = useFeatureFlags();
  const isDeveloper = featureFlags.isDeveloper().get(false);

  const hr = currentTimestamp.getHours();
  const message = messages.find((msg) => hr >= msg[0]);
  const welcomeMessage = message ? message[1] : "Welcome";

  return (
    <>
      <Modal open={infoOpen} onClose={() => setInfoOpen(false)}>
        <Alert severity="info">
          Once the completed tasks will be approved, the corresponding tokens will be minted through the monthly
          resolution
        </Alert>
      </Modal>
      <Box sx={{ mr: 2, width: { xs: "100%", sm: "auto" }, mt: { xs: 4, md: 0 } }}>
        <Typography variant="h3" sx={{ pb: 2 }}>
          {welcomeMessage}
        </Typography>
        <User user={user || {}} shouldMarkCurrentUser={false} />
        <Stack sx={{ pt: 2 }} spacing={1} direction="row">
          {user?.status?.map((status) => (
            <Chip key={status} size="small" label={status} />
          ))}
          {isDeveloper && <Chip size="small" label="Developer" color="info" />}
        </Stack>
      </Box>
    </>
  );
}
