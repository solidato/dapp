import Head from "next/head";
import { useRouter } from "next/router";
import { useStore } from "zustand";

import { useRef } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Typography } from "@mui/material";

import { useFeatureFlags } from "@lib/feature-flags/useFeatureFlags";
import { enhanceTitleWithPrefix } from "@lib/utils";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";
import { createResolutionFormStore } from "@store/resolutionFormStore";

import ResolutionForm from "@components/ResolutionForm";

import useResolutionCreate from "@hooks/useResolutionCreate";
import useResolutionsAcl from "@hooks/useResolutionsAcl";

import { CONFIRMATION_TYPE } from "../../lib/constants";

export default function NewConfirmation({}) {
  const { acl } = useResolutionsAcl();
  const { onSubmit } = useResolutionCreate();
  const router = useRouter();
  const store = useRef(createResolutionFormStore()).current;
  const { isAwaitingConfirmation, isLoading } = useBlockchainTransactionStore();
  const { reset, ...formProps } = useStore(store, (s) => s);

  const disabledSubmit = !acl?.canCreate || !formProps.title.trim() || !formProps.content.trim();
  const loadingSubmit = isAwaitingConfirmation || isLoading;

  const featureFlags = useFeatureFlags();
  const canCreateResolutions = featureFlags.canCreateResolutions().get(true);

  if (!canCreateResolutions) {
    return (
      <Alert severity="warning">
        Creating or updating resolutions is disabled at the moment. The functionality will be back shortly.
      </Alert>
    );
  }

  const handleSave = async () => {
    const submittedSuccessfully = await onSubmit({
      vetoTypeId: null,
      currentResolution: {
        typeId: CONFIRMATION_TYPE.id,
        title: formProps.title,
        content: formProps.content,
        exclusionAddress: formProps.exclusionAddress,
      },
    });

    if (submittedSuccessfully) {
      reset();
      router.push("/confirmations");
    }
  };

  return (
    <>
      <Head>
        <title>{enhanceTitleWithPrefix(`New Resolution Confirmation: ${formProps.title}`)}</title>
      </Head>
      <Typography variant="h3">
        {formProps.title.trim() ? `Preliminary draft: ${formProps.title}` : "Preliminary draft Resolution"}
      </Typography>
      <ResolutionForm {...formProps} typeId={CONFIRMATION_TYPE.id} isConfirmation={true} isMonthlyRewards={false} />
      <LoadingButton
        size="large"
        loading={loadingSubmit}
        variant="outlined"
        onClick={handleSave}
        disabled={disabledSubmit}
      >
        Create preliminary draft
      </LoadingButton>
    </>
  );
}
