import { differenceInSeconds, format } from "date-fns";

import { useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

type Props = {
  targetDate: Date;
  startCounterThresholdSeconds?: number;
  prefixLabel: string;
  inline?: boolean;
  disableCountdown?: boolean;
};

export default function Countdown({
  prefixLabel,
  startCounterThresholdSeconds = 600,
  targetDate,
  inline = true,
  disableCountdown = false,
}: Props) {
  const [display, setDisplay] = useState<string | null>(null);
  console.log("display: ", display);
  const [afterPrefix, setAfterPrefix] = useState<string>("");

  useEffect(() => {
    let timeout: null | any = null;

    const setToDisplay = () => {
      const now = Date.now();
      const difference = differenceInSeconds(targetDate, now);
      if (difference <= startCounterThresholdSeconds && !disableCountdown) {
        const minutes = Math.floor(difference / 60);
        const seconds = difference % 60;
        if (seconds <= 0 && minutes <= 0) {
          setDisplay(format(targetDate, "dd LLL yyyy, H:mm:ss"));
        } else {
          setDisplay(
            minutes > 0
              ? `${("0" + minutes).slice(-2)}m:${("0" + seconds).slice(-2)}s`
              : `${("0" + seconds).slice(-2)}s`,
          );
          timeout = setTimeout(setToDisplay, 1000);
          setAfterPrefix("in");
        }
        return;
      }
      setDisplay(format(targetDate, "dd LLL yyyy, H:mm:ss"));
      setAfterPrefix("on");
      timeout = !disableCountdown ? setTimeout(setToDisplay, (difference - startCounterThresholdSeconds) * 1000) : null;
    };

    setToDisplay();

    return () => {
      clearInterval(timeout);
    };
  }, [targetDate, startCounterThresholdSeconds, disableCountdown]);

  if (!display) {
    return <CircularProgress size={18} />;
  }

  if (display && inline) {
    return (
      <span>
        {prefixLabel}&nbsp;
        {afterPrefix}&nbsp;
        {display}
      </span>
    );
  }

  return (
    <Box>
      <div>
        {prefixLabel} {afterPrefix}
      </div>
      <div>{display}</div>
    </Box>
  );
}
