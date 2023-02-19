import { useEffect, useState } from "react";

const DEFAULT_INTERVAL_MS = 5000;

export default function useTimestamp(intervalMs = DEFAULT_INTERVAL_MS) {
  const [currentTimestamp, setCurrentTimestamp] = useState(new Date());

  useEffect(() => {
    const intervalCallback = () => {
      setCurrentTimestamp(new Date());
    };
    const interval = setInterval(intervalCallback, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return {
    currentTimestamp,
  };
}
