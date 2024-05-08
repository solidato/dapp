import { useAccount } from "wagmi";

import { ReactElement, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import { isSameAddress } from "@lib/utils";

import User from "@components/User";

import { DaoUser } from "@hooks/useShareholders";

import useUser from "../../hooks/useUser";

export default function UserCard({ daoUser, cta }: { daoUser: DaoUser; cta?: ReactElement }) {
  const { address: connectedAddress } = useAccount();
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const cardProps = isSameAddress(connectedAddress as string, daoUser.address)
    ? {
        variant: "elevation" as "elevation",
        elevation: 6,
      }
    : { variant: "outlined" as "outlined" };

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  const handleAddUser = () => {
    console.log("add user");
  };

  return (
    <Card {...cardProps}>
      <CardHeader
        title={<User user={{ ...(daoUser.user || {}), ethAddress: daoUser.address }} />}
        action={
          user?.isLoggedIn && (
            <IconButton onClick={openMenu} aria-label="action-menu">
              <MoreVertIcon />
            </IconButton>
          )
        }
      />
      <CardContent sx={{ p: 0, pb: 3 }}>
        <Stack
          direction="row"
          justifyContent="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ textAlign: "center" }}
        >
          <Box>
            <Typography variant="body2">Voting power</Typography>
            <Typography variant="caption">{daoUser.power}%</Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ borderTop: (t) => `1px solid ${t.palette.divider}`, display: "flex", width: "100%" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          <Box>
            {(daoUser.status || daoUser.user?.status || []).map((status) => (
              <Chip key={status} size="small" label={status} />
            ))}
          </Box>
        </Stack>
        <Menu
          id="user-actions-menu"
          aria-labelledby="user-actions-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={closeMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            zIndex: 10002,
          }}
        >
          <MenuItem onClick={handleAddUser} key="add">
            <AddIcon sx={{ mr: 1 }} /> Add User
          </MenuItem>
          {daoUser.user && (
            <>
              <MenuItem onClick={handleAddUser} key="edit">
                <EditIcon sx={{ mr: 1 }} />
                Edit
              </MenuItem>
              <MenuItem sx={{ color: (theme) => theme.palette.error.light }} onClick={handleAddUser} key="delete">
                <DeleteOutlineIcon sx={{ mr: 1, color: (theme) => theme.palette.error.light }} />
                Delete
              </MenuItem>
            </>
          )}
        </Menu>
      </CardActions>
    </Card>
  );
}
