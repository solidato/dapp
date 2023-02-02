import { Container, Typography } from "@mui/material";

import LoginForm from "@components/LoginForm";

export default function Login() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" component="h2">
        Log in
      </Typography>
      <Typography sx={{ mt: 2 }}>Use your odoo credentials to be able to log in</Typography>
      <LoginForm />
    </Container>
  );
}
