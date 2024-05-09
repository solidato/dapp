import Image from "next/image";
import { useAccount } from "wagmi";

import { Box, Container, Typography } from "@mui/material";

import SimpleLoginForm from "@components/SimpleLoginForm";

export default function Login() {
  const { address } = useAccount();
  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      {!address && (
        <>
          <Box sx={{ w: 100, display: "flex", justifyContent: "center", m: 2 }}>
            <Image width={180} height={180} src={"/wallet.png"} alt="wallet" />
          </Box>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Hello!
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Please connect your wallet
          </Typography>
        </>
      )}

      {address && (
        <>
          <Box sx={{ w: 100, display: "flex", justifyContent: "center", m: 2 }}>
            <Image width={180} height={180} src={"/favicon-solidato.ico"} alt="wallet" />
          </Box>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Your wallet is connected!
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Now you can Login
          </Typography>
        </>
      )}

      <SimpleLoginForm />
    </Container>
  );
}
