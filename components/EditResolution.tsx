import { useRouter } from "next/router";
import { useStore } from "zustand";

import { forwardRef, useEffect, useRef, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Button, Slide, Stack, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";
import { createResolutionFormStore } from "@store/resolutionFormStore";

import ResolutionForm from "@components/ResolutionForm";

import useResolutionTypes from "@hooks/useResolutionTypes";
import useResolutionUpdate from "@hooks/useResolutionUpdate";
import useResolutionsAcl from "@hooks/useResolutionsAcl";

import { ResolutionEntity } from "../types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditResolution({ resolution }: { resolution: ResolutionEntity }) {
  const { types } = useResolutionTypes();
  const { acl } = useResolutionsAcl();
  const { onSubmit } = useResolutionUpdate();
  const router = useRouter();
  const store = useRef(
    createResolutionFormStore({
      title: resolution?.title || "",
      content: resolution?.content || "",
      typeId: "routineVeto",
    }),
  ).current;
  const [dialogOpen, setDialogOpen] = useState(false);
  const { reset, ...formProps } = useStore(store, (s) => s);
  const theme = useTheme();

  const { isAwaitingConfirmation, isLoading } = useBlockchainTransactionStore();

  const disabledSubmit = !formProps.typeId || !acl?.canCreate || !formProps.title.trim() || !formProps.content.trim();
  const loadingSubmit = isAwaitingConfirmation || isLoading;

  useEffect(() => {
    if (resolution) {
      reset({
        typeId: resolution.resolutionType.id,
        title: resolution.title,
        content: resolution.content,
      });
    }
  }, [resolution]); // eslint-disable-line

  const handleUpdate = async () => {
    const vetoTypeId =
      formProps.typeId === "routineVeto" ? types.find((type) => type.name === "routine")?.id || null : null;
    const submittedCorrectly = await onSubmit({
      resolutionId: resolution.id,
      vetoTypeId,
      currentResolution: {
        typeId: formProps.typeId,
        title: formProps.title,
        content: formProps.content,
      },
    });

    if (submittedCorrectly) {
      reset();
      router.push("/resolutions");
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handlePreApprove = () => {
    setDialogOpen(true);
  };

  const handleApprove = async () => {
    setDialogOpen(false);
    // todo
  };

  if (!resolution) {
    return <Alert severity="warning">Resolution not found</Alert>;
  }

  const toUpdate =
    resolution.title !== formProps.title ||
    resolution.content !== formProps.content ||
    resolution.resolutionType.id !== formProps.typeId;

  return (
    <>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(4px)",
            },
          },
        }}
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleApprove}>Agree</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h3">
        {formProps.title.trim() ? `Pre draft: ${formProps.title}` : "Pre draft Resolution"}
      </Typography>
      <ResolutionForm {...formProps} />
      <Box sx={{ pb: 4, pt: 4 }}>
        {toUpdate ? (
          <LoadingButton
            size="large"
            loading={loadingSubmit}
            variant="outlined"
            onClick={handleUpdate}
            disabled={disabledSubmit}
          >
            Update pre draft
          </LoadingButton>
        ) : (
          <Stack direction={{ md: "row" }} spacing={{ xs: 2 }} width="100%">
            <Button
              size="large"
              variant="outlined"
              startIcon={<PictureAsPdfIcon />}
              href={`/resolutions/${resolution.id}?viewMode=print`}
              target="_blank"
            >
              Export to pdf
            </Button>
            <LoadingButton
              size="large"
              loading={loadingSubmit}
              variant="contained"
              onClick={handlePreApprove}
              disabled={disabledSubmit}
              startIcon={<VerifiedUserIcon />}
            >
              Approve pre draft
            </LoadingButton>
            <LoadingButton
              size="large"
              loading={loadingSubmit}
              variant="outlined"
              onClick={handlePreApprove}
              disabled={disabledSubmit}
              color="error"
              sx={{ marginLeft: { md: "auto !important" } }}
              startIcon={<DeleteIcon />}
            >
              Reject pre draft
            </LoadingButton>
          </Stack>
        )}
      </Box>
    </>
  );
}
