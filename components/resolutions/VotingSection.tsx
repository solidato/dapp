import { Box, Paper, keyframes, useTheme } from "@mui/material";

import VotingWidget from "@components/VotingWidget";

import { ResolutionEntityEnhanced } from "../../types";

const gradient = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

export default function VotingSection({ resolution }: { resolution: ResolutionEntityEnhanced }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: theme.palette.mode !== "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(33, 33, 33, 0.8)",
        backdropFilter: "blur(4px)",
        isolation: "isolate",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        p: 4,
        borderTop: theme.palette.mode !== "dark" ? "1px solid #DDD" : "1px solid #000",
      }}
    >
      <Paper
        sx={{
          borderRadius: 4,
          p: 4,
          maxWidth: {
            xs: "100%",
            md: "450px",
          },
          width: {
            xs: "90%",
            md: "auto",
          },
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(-45deg, #020024, #090979, #00d4ff)"
              : "linear-gradient(-45deg, rgba(255,255,255,0.8), rgba(220,220,220,0.8))",
          backgroundSize: "400% 400%",
          backdropFilter: "blur(4px)",
          animation: `${gradient} 15s ease infinite`,
          boxShadow: 20,
          "@media print": {
            display: "none",
          },
        }}
      >
        <VotingWidget resolution={resolution} />
      </Paper>
    </Box>
  );
}
