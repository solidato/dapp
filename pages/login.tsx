import { useWeb3Modal } from "@web3modal/react";

import { Button, Chip, Container, Divider, Typography } from "@mui/material";

import LoginForm from "@components/LoginForm";

export default function Login() {
  const { open: openWeb3Modal } = useWeb3Modal();

  return (
    <Container maxWidth="sm">
      <Button variant="outlined" onClick={() => openWeb3Modal()} fullWidth size="large">
        Connect wallet to login to odoo
      </Button>
      <Divider sx={{ pt: 4, mb: 4 }}>
        <Chip label="Or" />
      </Divider>
      <Typography variant="h6" component="h2">
        Log in via Odoo
      </Typography>
      <LoginForm />
    </Container>
  );
}
