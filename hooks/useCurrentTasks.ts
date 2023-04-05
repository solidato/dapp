import useSWR from "swr";

import { useMemo } from "react";

import { fetcher } from "@lib/net";
import { hoursToTime } from "@lib/utils";

export default function useCurrentTasks() {
  const { data, isLoading } = useSWR("/api/tasks/current", fetcher);

  const totalTime = useMemo(() => {
    if (!data) {
      return 0;
    }

    const time = data.reduce(
      (total: number, task: { subtask_effective_hours: number; effective_hours: number }) =>
        task.subtask_effective_hours + task.effective_hours + total,
      0,
    );

    return time;
  }, [data]);

  return {
    isLoading,
    currentTasks: data,
    totalTime,
  };
}
