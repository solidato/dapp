import { differenceInMinutes } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@lib/session";
import { findActiveTimeEntry, replaceTaskTimeEntry } from "@lib/utils";

async function tasksRoute(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }

  const { body: task } = req;
  if (req.method === "POST") {
    // STOP TASK
    try {
      const [activeTimeEntry, activeTask] = findActiveTimeEntry(JSON.parse(task));
      if (!activeTimeEntry || !activeTask) {
        // Task is already stopped
        return res.status(200).json(JSON.parse(task));
      }

      const isSameMin = differenceInMinutes(new Date(activeTimeEntry.start * 1000), new Date()) === 0;
      if (isSameMin) {
        // Delete time entry
        // await session.remove("account.analytic.line", [Number(activeTimeEntry.id)]);
        const newTask = replaceTaskTimeEntry(activeTask, activeTimeEntry, { delete: true });
        res.status(200).json(newTask);
      } else {
        // Update time entry
        // const end = formatInTimeZone(new Date(), "UTC", ODOO_DATE_FORMAT);
        // await session.update("account.analytic.line", Number(activeTimeEntry.id), { end });
        // const [updatedTimeEntry] = await session.read("account.analytic.line", [Number(activeTimeEntry.id)]);
        // const newTask = replaceTaskTimeEntry(activeTask, updatedTimeEntry);
        res.status(200).json({});
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default withIronSessionApiRoute(tasksRoute, sessionOptions);
