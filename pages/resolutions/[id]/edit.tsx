import { useRouter } from "next/router";
import useSWR from "swr";
import { useStore } from "zustand";

import { forwardRef, useEffect, useRef, useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Button, CircularProgress, Slide, Typography, useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";

import { fetcherWithParams } from "@graphql/client";
import { getResolutionQuery } from "@graphql/queries/get-resolution.query";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";

import ResolutionForm from "@components/ResolutionForm";

import useResolutionCreate from "@hooks/useResolutionCreate";
import useResolutionTypes from "@hooks/useResolutionTypes";
import useResolutionsAcl from "@hooks/useResolutionsAcl";

import Modal from "../../../components/Modal";
import { createResolutionFormStore } from "../../../store/resolutionFormStore";

EditResolution.title = "Edit resolution";
EditResolution.requireLogin = true;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditResolution() {
  const { types } = useResolutionTypes();
  const { acl } = useResolutionsAcl();
  const { onSubmit } = useResolutionCreate();
  const router = useRouter();
  const store = useRef(createResolutionFormStore()).current;
  const [init, setInit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { reset, ...formProps } = useStore(store, (s) => s);
  const theme = useTheme();

  const { data: resolutionData, isLoading: isLoadingResolution } = useSWR(
    [getResolutionQuery, { id: router.query.id }],
    fetcherWithParams,
  );

  const { isAwaitingConfirmation, isLoading } = useBlockchainTransactionStore();

  const disabledSubmit = !formProps.typeId || !acl?.canCreate || !formProps.title.trim() || !formProps.content.trim();
  const loadingSubmit = isAwaitingConfirmation || isLoading;

  useEffect(() => {
    if (resolutionData?.resolution) {
      reset({
        typeId: resolutionData?.resolution.resolutionType.id,
        title: resolutionData?.resolution.title,
        content: resolutionData?.resolution.content,
      });
    }
    if (resolutionData?.resolution || (resolutionData && !resolutionData.resolution)) {
      setInit(true);
    }
  }, [resolutionData]); // eslint-disable-line

  const handleUpdate = async () => {
    const vetoTypeId =
      formProps.typeId === "routineVeto" ? types.find((type) => type.name === "routine")?.id || null : null;
    const submittedCorrectly = await onSubmit({
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

  if (isLoadingResolution || !init) {
    return <CircularProgress />;
  }

  if (resolutionData && !resolutionData.resolution) {
    return <Alert severity="warning">Resolution not found</Alert>;
  }

  const { resolution } = resolutionData;

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
        <LoadingButton
          size="large"
          loading={loadingSubmit}
          variant="outlined"
          onClick={handlePreApprove}
          disabled={disabledSubmit}
        >
          Approve pre draft
        </LoadingButton>
      )}
    </>
  );
}
