import useSWR from "swr";
import { ResolutionEntity } from "types";

import { clientLegacyGraph, fetcher, legacyFetcher } from "@graphql/client";
import { getLegacyResolutionsQuery } from "@graphql/queries/get-legacy-resolutions.query";
import { getResolutionsQuery } from "@graphql/queries/get-resolutions.query";

const REFRESH_EVERY_MS = 3000;

export default function useGetResolutions() {
  const { data, isLoading, error } = useSWR<any>(getResolutionsQuery, fetcher, { refreshInterval: REFRESH_EVERY_MS });
  const { data: legacyResolutionsData, isLoading: isLoadingLegacyFetcher } = useSWR<any>(
    !!clientLegacyGraph ? getLegacyResolutionsQuery : null,
    legacyFetcher,
    {
      refreshInterval: REFRESH_EVERY_MS,
    },
  );

  return {
    resolutions: [
      ...(data?.resolutions || []),
      ...(legacyResolutionsData?.resolutions || []).map((res: ResolutionEntity) => ({ ...res, isLegacy: true })),
    ],
    isLoading: isLoading || isLoadingLegacyFetcher,
    error,
  };
}
