import Link from "next/link";

import * as React from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ResolutionInfo from "@components/ResolutionInfo";
import User from "@components/User";

import { ResolutionEntityEnhanced } from "../types";

export default function ResolutionCard({ resolution }: { resolution: ResolutionEntityEnhanced }) {
  return (
    <Card variant="outlined">
      <CardHeader
        title={resolution.title}
        titleTypographyProps={{
          variant: "h6",
          lineHeight: "1.5rem",
        }}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" sx={{ pt: 1, pb: 0.5 }}>
          Created on {resolution.createdAt} by
        </Typography>
        <User address={resolution.createBy} />
      </CardContent>
      <CardActions disableSpacing>
        <ResolutionInfo resolution={resolution} />
        <IconButton
          aria-label="share"
          sx={{ marginLeft: "auto" }}
          href={`/resolutions/${resolution.id}/edit`}
          LinkComponent={Link}
        >
          <VisibilityIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
