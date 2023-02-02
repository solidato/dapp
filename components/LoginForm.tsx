import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useUser from "@hooks/useUser";
import useAlertStore from "@store/alertStore";
import { useRouter } from "next/router";

export default function LoginForm({ onLoggedIn }: { onLoggedIn?: () => void }) {
  const { query } = useRouter();

  const { mutateUser } = useUser(
    !onLoggedIn
      ? {
          redirectTo: String(query?.redirectTo || "/"),
          redirectIfFound: true,
        }
      : {},
  );

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
      onLoggedIn && onLoggedIn();
    } else {
      openAlert({ message: "Login Failed: Your email or password is incorrect" });
    }
    setIsLoading(false);
  };

  return (
    <Box component="form" onSubmit={onSubmit} autoComplete="off">
      <Box sx={{ mt: 3 }}>
        <TextField
          required
          autoFocus
          id="odoo-uname"
          name="odoo-uname"
          label="Odoo username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          value={user.username}
          fullWidth
        />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <TextField
          required
          id="odoo-pwd"
          name="odoo-pwd"
          type="password"
          label="Odoo Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          fullWidth
        />
      </Box>
      <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
        Login
      </Button>
    </Box>
  );
}
