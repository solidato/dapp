import useSWR from "swr";

import { useState } from "react";

import { InfoOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { fetcher } from "@lib/net";
import { TOKEN_SYMBOL, moneyFormatter } from "@lib/utils";

import Modal from "@components/Modal";

import useGetInvestorsReportData from "@hooks/investors-report/useGetInvestorsReportData";

import Chart from "./Chart";

type ChartVizType = "default" | "accumulated";

const TOKEN_CMC_PAGE = {
  solidato: "solidato",
}[process.env.NEXT_PUBLIC_PROJECT_KEY];

const TOKEN_API_ENDPOINT = `/api/token-price/${TOKEN_CMC_PAGE}`;

export default function InvestorsReport() {
  const {
    data: tokenPrice,
    isLoading: isLoadingGetTokenPrice,
    error: errorGettingTokenPrice,
  } = useSWR<{ priceEur: number; priceUsd: number }>(TOKEN_API_ENDPOINT, fetcher);
  const { data, dataAccumulated, isLoading, error } = useGetInvestorsReportData();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (error || errorGettingTokenPrice) {
    return (
      <Alert severity="warning">
        <AlertTitle>Error</AlertTitle>
        An error occurred while fetching the investors report data. Please try again later.
      </Alert>
    );
  }

  if (isLoading || isLoadingGetTokenPrice) {
    return <CircularProgress />;
  }

  const totalSupply = dataAccumulated.slice(dataAccumulated.length - 1)[0]?.minted || 0;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      divider={<Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />}
      spacing={4}
      alignItems="center"
      sx={{ textAlign: "center", mb: 2, mt: 2 }}
      justifyContent="center"
    >
      <Paper sx={{ p: 4, width: { xs: "100%", sm: "49%" }, position: "relative" }}>
        <Typography variant="h6">Your shareholding&apos;s value</Typography>
        <Typography variant="h4" sx={{ pt: 2 }}>
          TBD {/* {moneyFormatter.format(totalSupply)} */}
        </Typography>
      </Paper>
      <Paper sx={{ p: 4, width: { xs: "100%", sm: "49%" }, position: "relative" }}>
        <Typography variant="h6">Company total value</Typography>
        <Typography variant="h4" sx={{ pt: 2 }}>
          TBD {/* {moneyFormatter.format(totalSupply * (tokenPrice?.priceEur || 1))} */}
        </Typography>
      </Paper>
    </Stack>
  );
}
