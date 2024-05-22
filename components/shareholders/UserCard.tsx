import Link from "next/link";
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

import { bigIntToNum, isSameAddress } from "@lib/utils";

import { useActions } from "@store/shareholderStore";

import User from "@components/User";

import useErrorHandler from "@hooks/useErrorHandler";
import useShareholders, { DaoUser } from "@hooks/useShareholders";
import useUser from "@hooks/useUser";

import Dialog from "../Dialog";

export default function UserCard({ daoUser, cta }: { daoUser: DaoUser; cta?: ReactElement }) {
  const { address: connectedAddress } = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showDeleteModal, openDeleteModal] = useState(false);
  const { user } = useUser();
  const actions = useActions();
  const { handleError } = useErrorHandler();
  const deleteShareholder = handleError(actions.deleteShareholder);
  const { mutate } = useShareholders();

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

  const handleDeleteShareholder = async () => {
    await deleteShareholder(daoUser?.user);
    await mutate();
    openDeleteModal(false);
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
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Typography variant="body2">Shareholding rights: {daoUser.shareholdingRights}</Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ textAlign: "center" }}
        >
          <Box>
            <Typography variant="body2">Ownership</Typography>
            <Typography variant="caption">{daoUser.ownership}%</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Voting rights</Typography>
            <Typography variant="caption">{daoUser.power}%</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Dividend rights</Typography>
            <Typography variant="caption">{daoUser.ownership}%</Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ borderTop: (t) => `1px solid ${t.palette.divider}`, display: "flex", width: "100%" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          <Box>
            {(daoUser.status || daoUser.user?.status || []).map((status) => (
              <Chip sx={{ mr: 1 }} key={status} size="small" label={status} />
            ))}
          </Box>
        </Stack>
        {cta}
      </CardActions>
      <Menu
        id="user-actions-menu"
        aria-labelledby="user-actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {daoUser.user ? (
          <>
            <MenuItem component={Link} href={`/shareholders/${daoUser.user.id}/edit`} key="edit">
              <EditIcon sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              sx={{ color: (theme) => theme.palette.error.light }}
              onClick={() => {
                openDeleteModal(true);
                closeMenu();
              }}
              key="delete"
            >
              <DeleteOutlineIcon sx={{ mr: 1, color: (theme) => theme.palette.error.light }} />
              Delete
            </MenuItem>
          </>
        ) : (
          <MenuItem component={Link} href={`/shareholders/new?ethAddress=${daoUser.address}`} key="add">
            <AddIcon sx={{ mr: 1 }} /> Add User
          </MenuItem>
        )}
      </Menu>
      <Dialog
        open={showDeleteModal}
        handleClose={() => openDeleteModal(false)}
        handleApprove={handleDeleteShareholder}
        descriptionId="dialog-delete-shareholder"
        title={"Delete Shareholder"}
      >
        <Typography variant="body1">
          Are you sure you want to delete the shareholder <b>{daoUser?.user?.name}</b>?
        </Typography>
      </Dialog>
    </Card>
  );
}
