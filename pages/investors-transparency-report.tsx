import { Box } from "@mui/material";

import InvestorsReport from "@components/dashboard/InvestorsReport";

InvestorsTransparencyReport.noLayout = true;
InvestorsTransparencyReport.customCss = `
  body {
    background-color: transparent !important;
  }
`;

export default function InvestorsTransparencyReport() {
  return (
    <Box component="main" sx={{ p: 3 }}>
      <InvestorsReport />
    </Box>
  );
}
