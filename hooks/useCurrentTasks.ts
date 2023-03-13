import useSWR from "swr";

import { useMemo } from "react";

import { fetcher } from "@lib/net";

export default function useCurrentTasks() {
  const { data, isLoading } = useSWR("/api/tasks/current", fetcher);

  const totalHours = useMemo(() => {
    if (!data) {
      return 0;
    }

    return data.reduce(
      (total: number, task: { subtask_effective_hours: number; effective_hours: number }) =>
        task.subtask_effective_hours + task.effective_hours + total,
      0,
    );
  }, [data]);

  return {
    isLoading,
    currentTasks: data,
    totalHours,
  };
}
