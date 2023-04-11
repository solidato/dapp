import { useState } from "react";
import SwipeableViews from "react-swipeable-views";

import { Badge, Box, Tab, Tabs } from "@mui/material";

import OffersList from "@components/tokens/OffersList";
import UserBalance from "@components/tokens/UserBalance";

Tokens.title = "Tokens";
Tokens.requireLogin = true;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

export default function Tokens() {
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tasks tabs">
          <Tab label="My balance" {...a11yProps(0)} />
          <Tab
            label={
              <Badge badgeContent={2} color="primary">
                Active offers
              </Badge>
            }
            {...a11yProps(1)}
            disabled
          />
          <Tab label="Expired offers" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <UserBalance />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OffersList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <OffersList onlyExpired />
        </TabPanel>
      </SwipeableViews>
    </>
  );
}
