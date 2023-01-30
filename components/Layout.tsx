import React, { useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Chip, Stack, Divider, Container, Slide, useScrollTrigger, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import useAlertStore from "../store/alertStore";
import { shallow } from "zustand/shallow";
import AccountMenu from "./AccountMenu";
import NkdLogo from "./svg-logos/NkdLogo";

const initActiveStyle = (currentPath: string) => (href: string) => currentPath === href;

export default function Layout({ children, toggleTheme }: { children: React.ReactNode; toggleTheme: () => void }) {
  const { isAlertOpen, alertMessage, alertSeverity, closeAlert } = useAlertStore(
    (state) => ({
      isAlertOpen: state.open,
      alertMessage: state.message,
      alertSeverity: state.severity,
      closeAlert: state.closeAlert,
    }),
    shallow,
  );

  const router = useRouter();
  const trigger = useScrollTrigger();
  const isActive = useMemo(() => initActiveStyle(router.asPath), [router.asPath]);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "rgba(33, 33, 33, 0.9)" : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(4px)",
          position: "fixed",
          width: "100%",
          zIndex: 2,
          isolation: "isolate",
          transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          transform: trigger ? "translate3d(0, -71px, 0)" : "translate3d(0, 0, 0)",
        }}
      >
        <AppBar position="relative" elevation={0} variant="outlined" color="transparent">
          <Slide appear={false} direction="down" in={!trigger}>
            <Toolbar sx={{ "& svg": { fill: (t) => (t.palette.mode === "dark" ? "#FFFFFF" : "#000000") } }}>
              <Link href="/" style={{ display: "inherit" }}>
                <NkdLogo height={70} />
              </Link>
              <Box sx={{ ml: "auto" }}>
                <AccountMenu toggleTheme={toggleTheme} />
              </Box>
            </Toolbar>
          </Slide>
          <Divider />
          <Toolbar variant="dense">
            <Stack direction="row" spacing={1} sx={{ overflow: "auto" }}>
              <Chip
                label="Dashboard"
                component={Link}
                href="/"
                variant={isActive("/") ? "filled" : "outlined"}
                clickable
              />
              <Chip
                label="Tasks"
                component={Link}
                href="/tasks"
                variant={isActive("/tasks") ? "filled" : "outlined"}
                clickable
              />
              <Chip
                label="Shareholders"
                component={Link}
                href="/shareholders"
                variant={isActive("/shareholders") ? "filled" : "outlined"}
                clickable
              />
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: { md: 3 }, pt: { xs: 18, md: 18 } }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={isAlertOpen}
          onClose={closeAlert}
          key="alert-snackbar"
        >
          <Alert onClose={closeAlert} severity={alertSeverity} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </>
  );
}
