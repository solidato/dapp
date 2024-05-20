import * as React from "react";

import { Button, Divider, Grid, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import { SHAREHOLDERS_ROLES } from "@lib/constants";

import UserCard from "@components/shareholders/UserCard";

import useShareholders from "@hooks/useShareholders";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const companyInfo = {
  "Company name": "Solidato OÜ",
  "Registry code": "16932823",
  Address: "Harju maakond, Tallinn, Põhja-Tallinna linnaosa, Sõle tn 14, 10611",
  "VAT number": "EE102713130",
  "Phone number": "+372 5532 1462",
  "E-mail": "ragnar@reindoff.ee",
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CompanyTabs() {
  const ref = React.useRef<HTMLElement>(null);
  const [value, setValue] = React.useState(0);
  const { daoUsers, isLoading, error } = useShareholders();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box ref={ref}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tasks tabs">
          <Tab label="Company data" {...a11yProps(0)} />
          <Tab label="Management board" {...a11yProps(1)} />
          <Tab label="Legal docs" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {Object.entries(companyInfo).map(([key, value]) => (
          <Typography key={key} variant="h6" sx={{ mb: 0.8 }}>
            <b>{key}</b>: {value}
          </Typography>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          {daoUsers
            ?.filter((user) => user.status.includes(SHAREHOLDERS_ROLES.BOARD_MEMBER))
            .map((user) => (
              <Grid item xs={12} md={6} lg={4} key={user.address}>
                <UserCard daoUser={user} />
              </Grid>
            ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Paper
          sx={{ mb: 1, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 2 }}
        >
          <div>
            <Typography variant="h6">Articles of association</Typography>
            <Divider />
            <Typography variant="caption">Enforce from: 01.01.2024, Last updated: 15.02.2024</Typography>
          </div>
          <Button variant="contained" color="primary">
            Download
          </Button>
        </Paper>
        <Paper
          sx={{ mb: 1, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 2 }}
        >
          <div>
            <Typography variant="h6">Shareholders&apos; Agreement</Typography>
            <Divider />
            <Typography variant="caption">Enforce from: 01.01.2024, Last updated: N/A</Typography>
          </div>
          <Button variant="contained" color="primary">
            Download
          </Button>
        </Paper>
        <Paper
          sx={{ mb: 1, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 2 }}
        >
          <div>
            <Typography variant="h6">Extract from Commercial Registry</Typography>
            <Divider />
            <Typography variant="caption">
              This contains real-time info about the company. Info fields can be chosen during the process
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            href="https://ariregister.rik.ee/eng/company/16932823/Solidato-O%C3%9C"
          >
            Generate from the register
          </Button>
        </Paper>
      </TabPanel>
    </Box>
  );
}
