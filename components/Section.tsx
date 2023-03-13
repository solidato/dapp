import { ReactElement, Ref } from "react";

import { Box, Container, SxProps } from "@mui/material";

const Section = ({
  children,
  inverse = false,
  pageBreak,
  noPrint = false,
  sx = {},
  containerSx = {},
  innerRef,
}: {
  children: ReactElement;
  inverse?: boolean;
  pageBreak?: boolean;
  noPrint?: boolean;
  sx?: SxProps;
  containerSx?: SxProps;
  innerRef?: Ref<any>;
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
      ...sx,
    }}
    {...(innerRef && { ref: innerRef })}
  >
    <Container maxWidth="lg" sx={{ ...containerSx }}>
      {children}
    </Container>
  </Box>
);

export default Section;
