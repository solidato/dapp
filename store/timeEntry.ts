import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimeEntry {
  startAt: number | null;
  stopAt: number | null;
  taskId: number | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
  resume: () => void;
  setTaskId: (taskId: number | null) => void;
  setStartAt: (startAt: number) => void;
  addNew: (props: Partial<TimeEntry>) => void;
  showStopModal: boolean;
}

const useTimeEntryStore = create(
  persist<TimeEntry>(
    (set) => ({
      startAt: null,
      stopAt: null,
      taskId: null,
      showStopModal: false,
      start: () => set({ startAt: +new Date() }),
      setStartAt: (startAt: number) => set({ startAt }),
      stop: () => set({ stopAt: +new Date(), showStopModal: true }),
      reset: () => set({ startAt: null, stopAt: null, showStopModal: false }),
      resume: () => set({ stopAt: null, showStopModal: false }),
      setTaskId: (taskId: number | null) => set({ taskId }),
      addNew: (props: Partial<TimeEntry>) => set(props),
    }),
    {
      name: "time-entry-storage",
    },
  ),
);

export default useTimeEntryStore;
