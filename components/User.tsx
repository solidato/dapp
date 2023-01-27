import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function User({ address, image, name }) {
  const { data, isLoading } = useSWR("/api/users", fetcher);
  console.log("data: ", data);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar>H</Avatar>
      <div>
        {name && <Typography>{address}</Typography>}
        <Typography>{address}</Typography>
      </div>
    </Box>
  );
}
