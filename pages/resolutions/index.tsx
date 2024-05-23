import Link from "next/link";
import { useRouter } from "next/router";
import { ResolutionEntity } from "types";
import { useAccount } from "wagmi";

import { useCallback, useEffect, useMemo, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  NativeSelect,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

import { getEnhancedResolutions } from "@lib/resolutions/common";
import { RESOLUTION_STATES } from "@lib/resolutions/common";
import { isSameAddress } from "@lib/utils";

import ResolutionCard from "@components/ResolutionCard";
import Section from "@components/Section";

import useGetResolutions from "@hooks/useGetResolutions";
import useResolutionsAcl from "@hooks/useResolutionsAcl";
import useTimestamp from "@hooks/useTimestamp";
import useUser from "@hooks/useUser";
import useUsers from "@hooks/useUsers";

import UsersAutocomplete from "../../components/UsersAutocomplete";
import { RESOLUTION_TYPES_TEXTS } from "../../i18n/resolution";

interface ChevronProps extends React.ComponentProps<typeof ExpandMoreIcon> {
  expand: boolean;
}

const Chevron = styled(({ expand, ...other }: ChevronProps) => <ExpandMoreIcon {...other} />)(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

Resolutions.title = "Resolutions";
Resolutions.checkMismatch = true;
Resolutions.fullWidth = true;

const FormGrid = styled(Grid)(() => ({
  display: "flex",
}));

export default function Resolutions() {
  const theme = useTheme();
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { acl, isLoading: isLoadingAcl } = useResolutionsAcl();
  const { isFilterSectionExpanded, includeRejected, authorFilter, resolutionType, excludeNonMonthlyReward } =
    router.query;
  const [textFilter, setTextFilter] = useState("");
  const { currentTimestamp } = useTimestamp();
  const { user } = useUser();
  const { resolutions, isLoading, error } = useGetResolutions();

  const updateFilterState = useCallback(
    (updatedFilter: { [key: string]: string }) => {
      router.replace(
        {
          query: { ...router.query, ...updatedFilter },
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  // for performance reason we use a separate state kept for this field
  // the internal state and the query parameter are kept in sync by these two use effect
  useEffect(() => {
    setTextFilter((router.query.resolutionTitle as string) || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (router.query.resolutionTitle !== textFilter) {
      timeoutId = setTimeout(() => {
        updateFilterState({ resolutionTitle: textFilter });
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [router.query.resolutionTitle, textFilter, updateFilterState]);

  const { getUser } = useUsers();
  const selectedUser = authorFilter ? getUser(authorFilter as string) : undefined;

  const enhancedResolutions = useMemo(() => {
    if ((isLoading || isLoadingAcl) && resolutions.length === 0) {
      return [];
    }
    return getEnhancedResolutions(resolutions as ResolutionEntity[], +currentTimestamp, acl);
  }, [resolutions, currentTimestamp, acl, isLoading, isLoadingAcl]);

  const resolutionTypes = useMemo(() => {
    return Array.from(new Set(enhancedResolutions.map((r) => r.resolutionType.name)));
  }, [enhancedResolutions]);

  const availableAuthors = useMemo(() => {
    return [...new Set(enhancedResolutions.map((r) => r.createBy))];
  }, [enhancedResolutions]);

  const filteredResolutions = useMemo(() => {
    let filteredResolutions = includeRejected
      ? enhancedResolutions
      : enhancedResolutions.filter((resolution) => resolution.state !== RESOLUTION_STATES.REJECTED);

    filteredResolutions = excludeNonMonthlyReward
      ? filteredResolutions.filter((r) => r.isRewards === true)
      : filteredResolutions;

    const lowerCaseTextFilter = textFilter.toLocaleLowerCase();
    filteredResolutions = textFilter
      ? filteredResolutions.filter((r) => r.title && r.title.toLocaleLowerCase().indexOf(lowerCaseTextFilter) >= 0)
      : filteredResolutions;

    filteredResolutions = resolutionType
      ? filteredResolutions.filter((r) => r.resolutionType.name === resolutionType)
      : filteredResolutions;

    filteredResolutions = authorFilter
      ? filteredResolutions.filter((r) => r.createBy === authorFilter)
      : filteredResolutions;
    return filteredResolutions;
  }, [enhancedResolutions, excludeNonMonthlyReward, resolutionType, includeRejected, textFilter, authorFilter]);

  const [activeResolutions, inactiveResolutions] = useMemo(() => {
    const active = filteredResolutions.filter((resolution) => {
      const votingUser = address
        ? resolution.votingStatus.votersHaveVoted.find((voter) => isSameAddress(voter.address, address))
        : null;
      return resolution.state === RESOLUTION_STATES.VOTING && !votingUser && user?.isLoggedIn;
    });
    const inactive = filteredResolutions.filter((resolution) => {
      const votingUser = address
        ? resolution.votingStatus.votersHaveVoted.find((voter) => isSameAddress(voter.address, address))
        : null;
      return resolution.state !== RESOLUTION_STATES.VOTING || !!votingUser || !user?.isLoggedIn;
    });
    return [active, inactive];
  }, [filteredResolutions, address, user?.isLoggedIn]);

  const hasRejected =
    enhancedResolutions.filter((resolution) => resolution.state === RESOLUTION_STATES.REJECTED).length > 0;

  if (error) {
    return null;
  }

  return (
    <>
      <Section sx={{ pb: 0 }}>
        <>
          <Typography variant="h3" gutterBottom>
            Shareholders&apos; Resolutions
          </Typography>
          <Alert severity="info" sx={{ mb: 4 }}>
            Shareholders have agreed to adopt shareholders resolution exclusively online without convening a physical or
            digital meeting of shareholders. <br />
            Only members of the management board has the right to initiate new votings, however, shareholders
            representing a certain threshold can force the management board to initiate a vote. <br />
            Only shareholders with voting right can participate in the adoption of shareholders resolutions. <br />
            Certain shareholders my be excluded from voting for a certain draft resolution based on the rules set in the
            Articles of Association of the company (e.g. if the resolution is deciding upon filing a complaint against a
            shareholder, then that shareholder will be excluded from that voting). <br />
            List of shareholders, their voting power and delegations between shareholders will be fixed automatically at
            the time of the initiation of the voting. No further changes during the notification period or voting period
            will be taken into account. <br />
            Notice periods, voting periods and thresholds are based on the Articles of Association of the company.{" "}
            <br />
          </Alert>
        </>
      </Section>
      {isConnected && acl.isContributor && (
        <Section sx={{ pt: 0 }}>
          <Box sx={{ display: { md: "flex" }, alignItems: "center" }}>
            <Button
              sx={{ width: { xs: "100%", md: "auto" }, mb: { xs: 1, md: 0 }, mr: { md: 2 } }}
              component={Link}
              href="/resolutions/new"
              variant="outlined"
            >
              <AddIcon sx={{ mr: 1 }} /> New Resolution
            </Button>
            <Button
              sx={{ width: { xs: "100%", md: "auto " } }}
              component={Link}
              href="/resolutions/new?template=monthlyRewards"
              variant="outlined"
            >
              <SwapVertIcon sx={{ mr: 1 }} /> Convert Contributed Time to Shareholding
            </Button>
          </Box>
        </Section>
      )}
      {user?.isLoggedIn && resolutions.length > 0 && (
        <Section inverse sx={{ pb: 0 }}>
          <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Button
                endIcon={<Chevron expand={!!isFilterSectionExpanded} />}
                onClick={() => updateFilterState({ isFilterSectionExpanded: isFilterSectionExpanded ? "" : "true" })}
                aria-expanded={!!isFilterSectionExpanded}
                aria-label="show filters"
              >
                Filters
              </Button>
            </Box>
            {!isFilterSectionExpanded && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  overflow: "scroll",
                }}
              >
                <List component={Stack} direction="row" dense>
                  {textFilter && (
                    <ListItem>
                      <Chip label={`Text: ${textFilter}`} onDelete={() => setTextFilter("")} />
                    </ListItem>
                  )}
                  {selectedUser && (
                    <ListItem>
                      <Chip
                        label={`Author: ${selectedUser.name}`}
                        onDelete={() => updateFilterState({ authorFilter: "" })}
                      />
                    </ListItem>
                  )}
                  {resolutionType && (
                    <ListItem>
                      <Chip
                        label={`Type: ${RESOLUTION_TYPES_TEXTS[resolutionType as string]?.title || resolutionType}`}
                        onDelete={() => updateFilterState({ resolutionType: "" })}
                      />
                    </ListItem>
                  )}
                  {excludeNonMonthlyReward && (
                    <ListItem>
                      <Chip
                        label={`Only monthly reward`}
                        onDelete={() => updateFilterState({ excludeNonMonthlyReward: "" })}
                      />
                    </ListItem>
                  )}
                  {includeRejected && (
                    <ListItem>
                      <Chip label={`Include rejected`} onDelete={() => updateFilterState({ includeRejected: "" })} />
                    </ListItem>
                  )}
                </List>
              </Box>
            )}
            <Collapse
              in={!!isFilterSectionExpanded}
              timeout={0}
              unmountOnExit
              sx={{
                pt: 2,
                pb: 4,
                px: 4,
                mt: 1,
                bgcolor: theme.palette.mode === "dark" ? "rgba(33, 33, 33, 0.9)" : "rgba(250, 250, 250, 1)",
              }}
            >
              <FormGrid container spacing={6}>
                <FormGrid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Search resolution"
                    variant="standard"
                    value={textFilter}
                    onChange={(e) => setTextFilter(e.target.value)}
                  />
                </FormGrid>
                <FormGrid item xs={12} md={4}>
                  <UsersAutocomplete
                    fullWidth
                    filterList={availableAuthors}
                    selectedAddress={authorFilter as string}
                    onChange={(v) => updateFilterState({ authorFilter: v })}
                    label="Author"
                  />
                </FormGrid>
                <FormGrid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="resolution-type-input">
                      Resolution type
                    </InputLabel>
                    <NativeSelect
                      inputProps={{
                        name: "resolution-type",
                        id: "resolution-type-input",
                      }}
                      value={resolutionType}
                      onChange={(e) => updateFilterState({ resolutionType: e.target.value })}
                    >
                      <option value={""}></option>
                      {resolutionTypes.map((t) => (
                        <option value={t} key={t}>
                          {RESOLUTION_TYPES_TEXTS[t]?.title || t}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </FormGrid>

                {hasRejected && (
                  <FormGrid item xs={12} md={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!!includeRejected}
                          onChange={() => updateFilterState({ includeRejected: includeRejected ? "" : "true" })}
                        />
                      }
                      label="Include rejected"
                    />
                  </FormGrid>
                )}

                <FormGrid item xs={12} md={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!excludeNonMonthlyReward}
                        onChange={() =>
                          updateFilterState({ excludeNonMonthlyReward: excludeNonMonthlyReward ? "" : "true" })
                        }
                      />
                    }
                    label="Only monthly rewards"
                  />
                </FormGrid>
              </FormGrid>
            </Collapse>
          </>
        </Section>
      )}
      {activeResolutions?.length > 0 && (
        <Section inverse>
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Resolutions you need to vote
            </Typography>
            <Grid container spacing={3}>
              {activeResolutions.map((resolution) => (
                <Grid item xs={12} md={6} lg={4} key={resolution.id}>
                  <ResolutionCard resolution={resolution} />
                </Grid>
              ))}
            </Grid>
          </>
        </Section>
      )}
      {resolutions?.length > 0 && (
        <Section inverse={activeResolutions?.length === 0}>
          <>
            {activeResolutions?.length > 0 && (
              <Typography variant="h5" sx={{ mb: 2 }}>
                Other resolutions
              </Typography>
            )}
            {(isLoading || isLoadingAcl) && resolutions?.length === 0 && <CircularProgress />}
            <Grid container spacing={3}>
              {inactiveResolutions.map((resolution) => (
                <Grid item xs={12} md={6} lg={4} key={resolution.id}>
                  <ResolutionCard resolution={resolution} />
                </Grid>
              ))}
            </Grid>
          </>
        </Section>
      )}
    </>
  );
}
