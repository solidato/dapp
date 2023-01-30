import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import useUser from "@lib/useUser";
import useAlertStore from "@store/alertStore";
import { shallow } from "zustand/shallow";
import Link from "next/link";
import { getLettersFromName } from "@lib/utils";
import useOdooUsers from "@hooks/useOdooUsers";
import { Modal, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import useLoginModalStore from "@store/loginModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AccountMenu() {
  const { user, mutateUser } = useUser();
  const {
    users: [currentOdooUser],
  } = useOdooUsers(user?.ethereum_address);

  const { openAlert } = useAlertStore(
    (state) => ({
      openAlert: state.openAlert,
    }),
    shallow,
  );

  const { modalOpen, handleModalOpen, handleModalClose } = useLoginModalStore(
    (state) => ({
      modalOpen: state.isLoginModalOpen,
      handleModalOpen: state.handleOpenLoginModalFromLink,
      handleModalClose: state.closeLoginModal,
    }),
    shallow,
  );

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        mutateUser(await res.json());
      } else {
        openAlert({ message: "Logout failed" });
      }
    } catch (error) {
      openAlert({ message: "Network Error" });
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Log in
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Use your odoo credentials to be able to log in
          </Typography>
          <LoginForm onLoggedIn={handleModalClose} />
        </Box>
      </Modal>

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {user?.isLoggedIn ? (
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={user?.display_name}
                src={`data:image/jpeg;charset=utf-8;base64,${currentOdooUser?.image || ""}`}
              >
                {getLettersFromName(user?.display_name)}
              </Avatar>
            ) : (
              <Avatar sx={{ width: 32, height: 32 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {!user?.isLoggedIn && (
          <MenuItem href="/login" onClick={handleModalOpen} component={Link}>
            Login via odoo
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>Connect Wallet</MenuItem>
        {user?.isLoggedIn && [
          <Divider key="divider" />,
          <MenuItem onClick={handleClose} key="settings">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>,
          <MenuItem onClick={logout} key="logout">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>,
        ]}
      </Menu>
    </React.Fragment>
  );
}
