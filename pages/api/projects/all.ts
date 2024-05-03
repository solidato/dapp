// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getProjectsQuery } from "@lib/graphql/queries/get-projects.query";
import { getUserTasksQuery } from "@lib/graphql/queries/get-user-tasks.query";
import { sessionOptions } from "@lib/session";

import { ProjectTask } from "@store/projectTaskStore";

const getAllProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }

  const getUserProjectIds = async (userId: number) => {
    // const userTasks = await odooGraphQLClient.query(cookie, getUserTasksQuery, { user_id: userId });
    return [...new Set([].map((t: ProjectTask) => t.project_id.id))];
  };

  const userId = user.id;
  try {
    const userProjectIds = await getUserProjectIds(userId);
    // const data = await odooGraphQLClient.query(cookie, getProjectsQuery, { userId: user.id });
    const projects = [].reduce(
      (acc: any, project: any) => {
        userProjectIds.includes(project.id) ? acc.user.push(project) : acc.other.push(project);
        return acc;
      },
      { user: [], other: [] },
    );
    res.status(200).json(projects);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default withIronSessionApiRoute(getAllProjects, sessionOptions);
