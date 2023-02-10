import { useRouter } from "next/router";

import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";
import useResolutionFormStore from "@store/resolutionFormStore";

import ResolutionForm from "@components/ResolutionForm";

import useResolutionCreate from "@hooks/useResolutionCreate";
import useResolutionTypes from "@hooks/useResolutionTypes";
import useResolutionsAcl from "@hooks/useResolutionsAcl";

NewResolution.title = "New resolution";
NewResolution.requireLogin = true;

const FORM_KEY = "resolution-form-state";

export default function NewResolution() {
  const { types } = useResolutionTypes();
  const { acl } = useResolutionsAcl();
  const { title, typeId, content, reset } = useResolutionFormStore(FORM_KEY)();
  const { onSubmit } = useResolutionCreate();
  const router = useRouter();
  const { isAwaitingConfirmation, isLoading } = useBlockchainTransactionStore();

  const disabledSubmit = !typeId || !acl?.canCreate || !title.trim() || !content.trim();
  const loadingSubmit = isAwaitingConfirmation || isLoading;

  const handleSave = async () => {
    const vetoTypeId = typeId === "routineVeto" ? types.find((type) => type.name === "routine")?.id || null : null;
    const submittedCorrectly = await onSubmit({
      vetoTypeId,
      currentResolution: {
        typeId,
        title,
        content,
      },
    });

    if (submittedCorrectly) {
      reset();
      router.push("/resolutions");
    }
  };

  return (
    <>
      <Typography variant="h3">{title.trim() ? `Pre draft: ${title}` : "Pre draft Resolution"}</Typography>
      <ResolutionForm formKey={FORM_KEY} />
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
