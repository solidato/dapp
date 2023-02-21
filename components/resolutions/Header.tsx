import Head from "next/head";

import { Alert } from "@mui/material";

import { RESOLUTION_STATES } from "@lib/resolutions/common";
import { enhanceTitleWithPrefix } from "@lib/utils";

import User from "@components/User";

import { ResolutionEntityEnhanced } from "../../types";
import Section from "./Section";

export default function Header({ resolution }: { resolution: ResolutionEntityEnhanced }) {
  return (
    <>
      <Head>
        <title>{enhanceTitleWithPrefix(`Resolution: ${resolution.title}`, true)}</title>
      </Head>
      {[RESOLUTION_STATES.ENDED, RESOLUTION_STATES.REJECTED].includes(resolution.state) && (
        <Section>
          <>
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
    </>
  );
}
