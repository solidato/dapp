import { Container, Typography } from "@mui/material";

import SimpleLoginForm from "@components/SimpleLoginForm";

export default function Login() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Welcome back!</Typography>
      <Typography variant="body2" sx={{ mb: 4 }}>
        Please sign in to continue.
      </Typography>
      <SimpleLoginForm />
    </Container>
  );
}
