import { ReactElement } from "react";

import { Box, Container } from "@mui/material";

const Section = ({
  children,
  inverse = false,
  pageBreak,
  noPrint = false,
}: {
  children: ReactElement;
  inverse?: boolean;
  pageBreak?: boolean;
  noPrint?: boolean;
}) => (
  <Box
    sx={{
      pt: 4,
      pb: 4,
      ...(inverse && { bgcolor: "background.paper" }),
      ...(pageBreak && {
        "@media print": {
          pageBreakBefore: "always",
        },
      }),
      ...(noPrint && {
        "@media print": {
          display: "none",
        },
      }),
    }}
  >
    <Container maxWidth="lg">{children}</Container>
  </Box>
);

export default Section;
