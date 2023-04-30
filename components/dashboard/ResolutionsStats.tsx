import { Box, Chip, Skeleton, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import CircularProgressWithLabel from "../CircularProgressWithLabel";

export default function ResolutionsStats({
  stats,
  isLoading,
  totalResolutions,
}: {
  stats: any;
  isLoading: boolean;
  totalResolutions: number;
}) {
  return (
    <>
      <Typography variant="h4">Resolutions stats</Typography>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={4}
        alignItems="center"
        sx={{ textAlign: "center", mb: 2, mt: 2 }}
        justifyContent="center"
      >
        <Box sx={{ p: { xs: 1, sm: 4 } }}>
          <Typography variant="h5">Total resolutions</Typography>
          <Typography variant="h3">{isLoading ? <Skeleton /> : totalResolutions}</Typography>
        </Box>
        {!isLoading && totalResolutions > 0 && (
          <Box sx={{ ml: "auto", p: { xs: 1, sm: 4, textAlign: "left" } }}>
            {stats.inProgressTot > 0 && (
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1.5,
                  pb: 1.5,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Box component="span" sx={{ mr: 2, width: 130 }}>
                  In progress ({stats.inProgressTot})
                </Box>
                <CircularProgressWithLabel isLoading={isLoading} value={stats.inProgress} color="primary" />
              </Typography>
            )}
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", mb: 1.5, pb: 1.5, borderBottom: 1, borderColor: "divider" }}
            >
              <Box component="span" sx={{ mr: 2, width: 130 }}>
                With quorum ({stats.withQuorumTot})
              </Box>
              <CircularProgressWithLabel isLoading={isLoading} value={stats.withQuorum} color="success" />
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", mb: 1.5, pb: 1.5, borderBottom: 1, borderColor: "divider" }}
            >
              <Box component="span" sx={{ mr: 2, width: 130 }}>
                Without quorum ({stats.withoutQuorumTot})
              </Box>
              <CircularProgressWithLabel isLoading={isLoading} value={stats.withoutQuorum} color="warning" />
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
              <Box component="span" sx={{ mr: 2, width: 130 }}>
                Rejected ({stats.rejectedTot})
              </Box>
              <CircularProgressWithLabel isLoading={isLoading} value={stats.rejected} color="error" />
            </Typography>
          </Box>
        )}
      </Stack>
      {stats?.typesTotals && (
        <Stack spacing={1} direction="row" justifyContent="center" flexWrap="wrap">
          {Object.entries(stats.typesTotals).map(([type, total]) => (
            <Chip sx={{ mb: 1 }} variant="outlined" label={`${type} (${total})`} key={type} />
          ))}
        </Stack>
      )}
    </>
  );
}
