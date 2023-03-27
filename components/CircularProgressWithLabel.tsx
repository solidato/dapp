import Box from "@mui/material/Box";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number; isLoading?: boolean },
) {
  const { isLoading, ...otherProps } = props;
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant={isLoading ? "indeterminate" : "determinate"}
        value={100}
        sx={isLoading ? {} : { position: "absolute", top: 0, left: 0, color: "divider" }}
      />
      {!isLoading && (
        <>
          <CircularProgress variant="determinate" {...otherProps} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
              otherProps.value,
            )}%`}</Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
