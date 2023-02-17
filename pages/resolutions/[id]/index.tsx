import { useRouter } from "next/router";
import useSWR from "swr";

import { useEffect } from "react";

import { Alert, CircularProgress, Typography } from "@mui/material";

import { fetcherWithParams } from "@graphql/client";
import { getResolutionQuery } from "@graphql/queries/get-resolution.query";

export default function ResolutionView() {
  const router = useRouter();

  const { data: resolutionData, isLoading: isLoadingResolution } = useSWR(
    [getResolutionQuery, { id: router.query.id }],
    fetcherWithParams,
  );

  const notFound = resolutionData && !resolutionData.resolution;

  useEffect(() => {
    if (router.query?.viewMode === "print" && !isLoadingResolution && !notFound) {
      window.print();
    }
  }, [router.query, notFound, isLoadingResolution]);

  if (isLoadingResolution) {
    return <CircularProgress />;
  }

  if (notFound) {
    return <Alert severity="warning">Resolution not found</Alert>;
  }

  const resolution = resolutionData.resolution;

  return (
    <>
      <Typography variant="h3">{resolution.title}</Typography>
    </>
  );
}
