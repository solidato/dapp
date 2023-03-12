import { format } from "date-fns";
import useSWR from "swr";

import { useMemo, useRef } from "react";

import { Box, CircularProgress, Paper, Skeleton, Typography } from "@mui/material";

import { fetcher } from "@lib/net";

import useIsInView from "../../hooks/useIsInView";
import { getCurrentMonth } from "../../lib/resolutions/common";
import { Task } from "../../types";
import User from "../User";

const REFRESH_EVERY_MS = 5000;

export default function TasksAuditLog() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useIsInView(ref);
  const { data, isLoading } = useSWR(isInView ? "/api/tasks/audit" : null, fetcher, {
    refreshInterval: REFRESH_EVERY_MS,
  });

  const totalWorkedTime = useMemo(() => {
    if (!data) {
      return "";
    }

    return `${data.reduce(
      (total: number, task: Task) => Number((total + task.subtask_effective_hours + task.effective_hours).toFixed(2)),
      0,
    )} hr`;
  }, [data]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box sx={{ mr: 2, width: "calc(100% - 150px)" }}>
          <Typography variant="h4">Tasks audit log</Typography>
          <Typography variant="h6" sx={{ mb: 2 }} ref={ref}>
            This list is in real time and it shows the last 20 activities from the collaborators
          </Typography>
        </Box>
        <Paper sx={{ ml: "auto", textAlign: "center", p: 2, width: 130 }} variant="outlined">
          <Typography variant="caption">Worked in total</Typography>
          <Typography variant="h6">{isLoading ? <CircularProgress size={16} /> : totalWorkedTime}</Typography>
          <Typography variant="caption">in {getCurrentMonth()} so far</Typography>
        </Paper>
      </Box>
      {isLoading
        ? [...Array(3)].map((index) => (
            <Paper key={index} sx={{ p: 2, mb: 1, display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2, width: "80%" }}>
                <User isSkeleton />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  <Skeleton />
                </Typography>
                <Typography variant="caption">
                  <Skeleton />
                </Typography>
              </Box>
              <Paper sx={{ ml: "auto", textAlign: "center", p: 2, width: 130 }} variant="outlined">
                <Typography variant="caption">
                  <Skeleton />
                </Typography>
                <Typography variant="h6">
                  <Skeleton />
                </Typography>
                <Typography variant="caption">
                  <Skeleton />
                </Typography>
              </Paper>
            </Paper>
          ))
        : data?.map((task: Task) => (
            <Paper key={task.id} sx={{ p: 2, mb: 1, display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2 }}>
                <User address={task.user_id.ethereum_address} shortAddress />
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {task.name}
                </Typography>
                <Typography variant="caption">
                  Project: {task.project_id.name}, Updated on:{" "}
                  {format(new Date(task.write_date), "dd LLL yyyy, H:mm:ss")}
                </Typography>
              </Box>
              <Paper sx={{ ml: "auto", textAlign: "center", p: { xs: 1, sm: 2 }, width: 130 }} variant="outlined">
                <Typography variant="caption">Worked</Typography>
                <Typography variant="h6">
                  <b>{Number((task.subtask_effective_hours + task.effective_hours).toFixed(2))}</b> hr
                </Typography>
                <Typography variant="caption">in {getCurrentMonth()}</Typography>
              </Paper>
            </Paper>
          ))}
    </>
  );
}
