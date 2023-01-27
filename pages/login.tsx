import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useUser from "@lib/useUser";
import useAlertStore from "@store/alertStore";
import { Container, Typography } from "@mui/material";

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: "/shareholders",
    redirectIfFound: true,
  });

  const [user, setUser] = useState<{ username: string; password: string }>({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const openAlert = useAlertStore((state) => state.openAlert);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user }),
    });
    if (res.status === 200) {
      const resUser = await res.json();
      mutateUser(resUser, false);
    } else {
      openAlert({ message: "Login Failed: Your email or password is incorrect" });
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Login</Typography>
      <Box component="form" onSubmit={onSubmit}>
        <Box sx={{ mt: 3 }}>
          <TextField
            required
            autoFocus
            id="username"
            label="Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 2, mb: 2 }}>
          <TextField
            required
            id="password"
            type="password"
            label="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
