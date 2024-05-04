import { format, isSameDay } from "date-fns";
import produce from "immer";
import { ResolutionEntityEnhanced } from "types";
import * as chains from "viem/chains";

import { Project, ProjectTask, Timesheet } from "@store/projectTaskStore";

import { META } from "../pages/_document";
import { STAGE_TO_COLOR_MAP } from "./constants";
import { getDateFromUnixTimestamp } from "./resolutions/common";

export const getLettersFromName = (name?: string) =>
  name
    ?.split(/\s/)
    .map((w) => Array.from(w)[0])
    .slice(0, 2)
    .join("");

export const enhanceTitleWithPrefix = (title: string, reversed?: boolean) =>
  reversed ? `${title} | ${META.title}` : `${META.title} | ${title}`;

export const isSameAddress = (addressLeft?: string, addressRight?: string) =>
  addressLeft?.toLowerCase() === addressRight?.toLowerCase();

// Truncates an ethereum address to the format 0x0000…0000
export const shortEthAddress = (address?: string) => {
  if (!address) return "";
  // Captures 0x + 4 characters, then the last 4 characters.
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

// PROJECTS TASKS UTILS
export function getTaskTotalHours(task: ProjectTask) {
  if (!task) {
    return 0;
  }

  if (!task.parent_id && task.child_ids?.length) {
    // it's a task with subtasks
    return (
      task.child_ids?.reduce((tot, child) => {
        tot += getTaskTotalHours(child);
        return tot;
      }, 0) || 0
    );
  } else {
    return task.timesheet_ids.reduce((tot, time) => (tot += time.unit_amount), 0);
  }
}

export function toDatetime(date: number) {
  return new Date(Math.trunc(date) * 1000);
}

export function toPrettyDuration(time: number) {
  if (!time) return "00h 00m";
  const hours = Math.trunc(time).toString().padStart(2, "0");
  const mins = Math.round((time - Number(hours)) * 60)
    .toString()
    .padStart(2, "0");
  return mins ? `${hours}h ${mins}m` : `${hours}h 00m`;
}

export function toPrettyRange(start: number, end?: number) {
  if (!start) return start;
  const startDate = format(new Date(start * 1000), "MMM d, HH:mm");
  if (!end) return startDate;
  const sameDay = isSameDay(new Date(start * 1000), new Date(end * 1000));
  const endDateFormat = sameDay ? "HH:mm" : "MMM d, HH:mm";
  const endDate = format(new Date(end * 1000), endDateFormat);
  return `${startDate} - ${endDate}`;
}

export function getTaskName(task: ProjectTask) {
  if (task.parent_id) {
    return `${task.name} (${task.parent_id.name})`;
  }
  return task.name;
}

export const findActiveTimesheet = (task: ProjectTask): Timesheet | undefined => {
  return task.timesheet_ids.find((te) => !te.end);
};

export const findActiveTimeEntry = (task: ProjectTask): [Timesheet | null, ProjectTask | null] => {
  const timeEntry = findActiveTimesheet(task);
  if (timeEntry) return [timeEntry, task];
  let childTimeEntry;
  const childTask = task.child_ids?.find((child) => {
    const timesheet = child.timesheet_ids.find((te) => !te.end);
    if (timesheet) {
      childTimeEntry = timesheet;
      return true;
    }
  });
  if (childTimeEntry && childTask) return [childTimeEntry, childTask];
  return [null, null];
};

export const findActiveProjectTask = (projects: Project[]): ProjectTask | null => {
  let activeProjectTask = null;
  projects.find((project) => {
    return project.tasks
      .filter((task) => task !== null)
      .find((task: ProjectTask) => {
        const [activeTimeEntry, activeTask] = findActiveTimeEntry(task);
        if (activeTimeEntry) {
          activeProjectTask = activeTask;
          return true;
        }
      });
  });
  return activeProjectTask;
};

export const replaceTaskTimeEntry = (
  task: ProjectTask,
  timeEntry: Timesheet,
  options: { delete?: boolean; add?: boolean } = {},
) => {
  return produce(task, (draft) => {
    if (!draft.parent_id && draft.child_ids?.length) {
      // it's a task with subtasks
      draft.child_ids?.some((child, childIdx) => {
        const timeIdx = child.timesheet_ids.findIndex((timesheet) => timesheet.id === timeEntry.id);
        if (timeIdx > -1) {
          if (options.delete) {
            draft.child_ids[childIdx].timesheet_ids.splice(timeIdx, 1);
          } else {
            draft.child_ids[childIdx].timesheet_ids[timeIdx] = timeEntry;
          }
          return true;
        }
      });
    } else {
      // it's a task or subtask
      const timesheetIdx = draft.timesheet_ids.findIndex((timesheet) => timesheet.id === timeEntry.id);
      if (timesheetIdx > -1) {
        if (options.delete) {
          draft.timesheet_ids.splice(timesheetIdx, 1);
        } else {
          draft.timesheet_ids[timesheetIdx] = timeEntry;
        }
      }
    }
  });
};

export const stageToColor = (stage: string): any => {
  if (!stage) return "default";
  const stageName = stage.toLowerCase().split(" ").join("");
  return STAGE_TO_COLOR_MAP[stageName] || "default";
};

export const hoursToTime = (initialHours: number) => {
  const hours = Math.floor(initialHours);
  const minutes = Math.ceil((initialHours * 60) % 60);

  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};

export const getDateFromOdooTimestamp = (timestamp: number) => {
  return new Date(timestamp * 1000);
};

export const formatTimestampToDate = (timestamp: string) => {
  return format(getDateFromUnixTimestamp(timestamp), "dd LLL yyyy");
};

export const formatTimestampToDateTime = (timestamp: string) => {
  return format(getDateFromUnixTimestamp(timestamp), "dd LLL yyyy HH:mm");
};

export const TOKEN_SYMBOL = {
  solidato: "SOLID",
}[process.env.NEXT_PUBLIC_PROJECT_KEY];

export const PDF_SIGNER = {
  solidato: [
    {
      name: "Alberto Ceschi Miotto",
      from: new Date("1/1/2020").getTime(),
    },
  ],
}[process.env.NEXT_PUBLIC_PROJECT_KEY];

export const getPdfSigner = (resolution: ResolutionEntityEnhanced) => {
  const resolutionCreatedTs = getDateFromUnixTimestamp(resolution.createTimestamp).getTime();
  return (
    PDF_SIGNER.sort((a, b) => b.from - a.from).find((signer) => signer.from <= resolutionCreatedTs)?.name ||
    "Alberto Ceschi Miotto"
  );
};

export const calculateSteps = (value: number) => {
  if (value >= 10000) return 100;
  if (value >= 100) return 10;
  return 1;
};

export const moneyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const hexToRgba = (hex: string, opacity: number): string => {
  const finalHex = hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(finalHex);
  const rgb = result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
  return `rgba(${rgb}, ${opacity})`;
};

/**
 * Gets the chain object for the given chain id.
 * @param chainId - Chain id of the target EVM chain.
 * @returns Viem's chain object.
 */
export function getChain(chainId: number) {
  for (const chain of Object.values(chains)) {
    if (chain.id === chainId) {
      return chain;
    }
  }

  throw new Error(`Chain with id ${chainId} not found`);
}
