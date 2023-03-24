import { format } from "date-fns";

import { Box, Chip, Paper, Skeleton, Typography } from "@mui/material";

import { hoursToTime } from "@lib/utils";

import { Task } from "../../types";
import User from "../User";

export default function TasksList({
  tasks,
  isLoading,
  showUser = true,
}: {
  tasks: Task[];
  isLoading: boolean;
  showUser?: boolean;
}) {
  return (
    <>
      {isLoading
        ? [...Array(3)].map((index) => (
            <Paper key={index} sx={{ p: 2, mb: 1, display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2, width: "80%" }}>
                {showUser && <User isSkeleton />}
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
        : tasks?.map((task) => (
            <Paper key={task.id} sx={{ p: 2, mb: 1, display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2 }}>
                {showUser && task.user_id?.ethereum_address && (
                  <User address={task.user_id?.ethereum_address} shortAddress />
                )}
                <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                  {task.name}
                  {task.parent_id ? ` - ${task.parent_id.name}` : ""}
                </Typography>
                <Chip sx={{ mr: 2 }} label={task.project_id.name} size="small" />
                <Typography variant="caption">
                  Updated on: {format(new Date(task.write_date), "dd LLL yyyy, H:mm:ss")}
                </Typography>
              </Box>
              <Paper sx={{ ml: "auto", textAlign: "center", p: { xs: 1, sm: 2 }, width: 130 }} variant="outlined">
                <Typography variant="caption">Worked</Typography>
                <Typography variant="body2">
                  <b>{hoursToTime(task.subtask_effective_hours + task.effective_hours)}</b>
                </Typography>
              </Paper>
            </Paper>
          ))}
    </>
  );
}
