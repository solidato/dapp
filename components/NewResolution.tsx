import { useRouter } from "next/router";
import { useStore } from "zustand";

import { useRef } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";
import { createResolutionFormStore } from "@store/resolutionFormStore";

import ResolutionForm from "@components/ResolutionForm";

import useResolutionCreate from "@hooks/useResolutionCreate";
import useResolutionTypes from "@hooks/useResolutionTypes";
import useResolutionsAcl from "@hooks/useResolutionsAcl";

export default function NewResolution() {
  const { types } = useResolutionTypes();
  const { acl } = useResolutionsAcl();
  const store = useRef(createResolutionFormStore({}, true)).current;
  const { onSubmit } = useResolutionCreate();
  const router = useRouter();
  const { isAwaitingConfirmation, isLoading } = useBlockchainTransactionStore();
  const { reset, ...formProps } = useStore(store, (s) => s);

  const disabledSubmit = !formProps.typeId || !acl?.canCreate || !formProps.title.trim() || !formProps.content.trim();
  const loadingSubmit = isAwaitingConfirmation || isLoading;

  const handleSave = async () => {
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

  return (
    <>
      <Typography variant="h3">
        {formProps.title.trim() ? `Pre draft: ${formProps.title}` : "Pre draft Resolution"}
      </Typography>
      <ResolutionForm {...formProps} />
      <LoadingButton
        size="large"
        loading={loadingSubmit}
        variant="outlined"
        onClick={handleSave}
        disabled={disabledSubmit}
      >
        Create pre draft
      </LoadingButton>
    </>
  );
}
