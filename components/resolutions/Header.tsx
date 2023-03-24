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

  return (
    <>
      <Head>
        <title>{enhanceTitleWithPrefix(`Resolution #${resolution.id}: ${resolution.title}`, true)}</title>
      </Head>
      {[RESOLUTION_STATES.ENDED, RESOLUTION_STATES.REJECTED].includes(resolution.state) && (
        <Section>
          <>
            {resolution.state === RESOLUTION_STATES.ENDED &&
              (executionPayload || []).length > 0 &&
              resolution.hasQuorum && (
                <Alert
                  sx={{ mb: 4 }}
                  action={
                    !resolution.executionTimestamp ? (
                      <Button variant="outlined" onClick={handleExecute} disabled={isLoading}>
                        Execute
                      </Button>
                    ) : null
                  }
                  severity={resolution.executionTimestamp ? "success" : "info"}
                >
                  <AlertTitle>Heads up</AlertTitle>
                  {resolution.executionTimestamp && (
                    <span>Resolution has been executed on {resolution.executedAt}</span>
                  )}
                  {!resolution.executionTimestamp && (
                    <span>
                      This resolution can be executed. If you execute it, the tokens will automatically be minted
                    </span>
                  )}
                </Alert>
              )}
            {resolution.state === RESOLUTION_STATES.ENDED && (
              <Alert severity={resolution.hasQuorum ? "success" : "error"}>
                {resolution.hasQuorum ? (
                  <span>
                    THE RESOLUTION OF SHAREHOLDERS <b>HAS BEEN</b> ADOPTED on{" "}
                    {resolution.resolutionTypeInfo.votingEndsAt}
                  </span>
                ) : (
                  <span>
                    THE RESOLUTION OF SHAREHOLDERS <b>HAS NOT BEEN</b> ADOPTED. Voting ended on{" "}
                    {resolution.resolutionTypeInfo.votingEndsAt}
                  </span>
                )}
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
      )}
      {resolution.state === RESOLUTION_STATES.NOTICE && (
        <Section>
          <Alert severity="info" sx={{ mt: 2 }}>
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
