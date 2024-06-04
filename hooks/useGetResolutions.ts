import useSWR from "swr";

import { useMemo } from "react";

import { getResolutionsQuery } from "@graphql/subgraph/queries/get-resolutions-query";
import { useSubgraphGraphQL } from "@graphql/subgraph/subgraph-client";

import { RESOLUTIONS_TO_SKIP } from "@lib/constants";
import { fetcher } from "@lib/net";

const REFRESH_EVERY_MS = 2000;

export default function useGetResolutions() {
  const { data: dbResolutions, isLoading: isLoadingDbResolutions } = useSWR<
    Array<{ title: string; hash: string; isRewards: boolean }>
  >("/api/resolutions", fetcher);

  const { data, isLoading, error } = useSubgraphGraphQL(getResolutionsQuery, {
    refreshInterval: REFRESH_EVERY_MS,
  });

  const filteredResolutions = useMemo(
    () => (data?.resolutions || []).filter((res) => Number(res.id) > RESOLUTIONS_TO_SKIP),
    [data],
  );

  const dbResolutionsObject = useMemo(() => {
    if (!dbResolutions) return null;
    return dbResolutions.reduce((resObject, res) => {
      resObject[res.hash] = res;
      return resObject;
    }, {} as Record<string, { title: string; hash: string; isRewards: boolean }>);
  }, [dbResolutions]);

  return {
    resolutions: !dbResolutionsObject
      ? [
          ...(filteredResolutions?.map((res) => ({
            ...res,
            title: "🔐 Log in to see title",
            isRewards: false,
          })) || []),
        ]
      : [
          ...(filteredResolutions?.map((res) => ({
            ...res,
            title: dbResolutionsObject[res.hash]?.title,
            isRewards: dbResolutionsObject[res.hash]?.isRewards,
          })) || []),
        ],
    isLoading: isLoading || isLoadingDbResolutions,
    error,
  };
}
