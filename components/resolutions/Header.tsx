import Head from "next/head";

import { Alert, AlertTitle, Button } from "@mui/material";

import { RESOLUTION_STATES } from "@lib/resolutions/common";
import { enhanceTitleWithPrefix } from "@lib/utils";

import Countdown from "@components/Countdown";
import User from "@components/User";

import useExecute from "@hooks/useExecute";

import { ResolutionEntityEnhanced } from "../../types";
import Section from "../Section";

export default function Header({
  resolution,
  executionPayload,
}: {
  resolution: ResolutionEntityEnhanced;
  executionPayload: any;
}) {
  const { isLoading, onSubmit } = useExecute();

  const handleExecute = () => {
    onSubmit({ resolutionId: resolution.id });
  };

  const shouldBeExecuted =
    resolution.state === RESOLUTION_STATES.ENDED &&
    (executionPayload || []).length > 0 &&
    resolution.hasQuorum &&
    !resolution.executionTimestamp;

  return (
    <>
      <Head>
        <title>{enhanceTitleWithPrefix(`Resolution #${resolution.id}: ${resolution.title}`, true)}</title>
      </Head>
      {resolution.state === RESOLUTION_STATES.REJECTED ||
        (shouldBeExecuted && (
          <Section>
            <>
              {shouldBeExecuted && (
                <Alert
                  sx={{ mb: 4 }}
                  action={
                    <Button variant="outlined" onClick={handleExecute} disabled={isLoading}>
                      Execute
                    </Button>
                  }
                  severity="info"
                >
                  <AlertTitle>Heads up</AlertTitle>
                  <span>
                    This resolution can be executed. If you execute it, the tokens will automatically be minted
                  </span>
                </Alert>
              )}
              {resolution.state === RESOLUTION_STATES.REJECTED && (
                <Alert severity="error">
                  This resolution has been rejected by <User address={resolution.rejectBy} isInline /> on{" "}
                  {resolution.rejectedAt}{" "}
                </Alert>
              )}
            </>
          </Section>
        ))}
      {resolution.state === RESOLUTION_STATES.NOTICE && (
        <Section>
          <Alert severity="warning" sx={{ mt: 2, fontSize: "1.1rem" }}>
            <AlertTitle>Heads up</AlertTitle>
            <Countdown
              targetDate={resolution.resolutionTypeInfo.noticePeriodEnds as Date}
              prefixLabel="Voting starts"
              inline
            />
          </Alert>
        </Section>
      )}
    </>
  );
}
