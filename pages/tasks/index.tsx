import Link from "next/link";
import useSWR from "swr";

import { useEffect, useMemo } from "react";

import { Add } from "@mui/icons-material";
import { Button, Grid, Skeleton } from "@mui/material";

import { fetcher } from "@lib/net";
import { findActiveProjectTask } from "@lib/utils";

import useProjectTaskStore, { Project, useProjectTaskActions } from "@store/projectTaskStore";

import HeroSection from "@components/HeroSection";
import ProjectCard from "@components/tasks/ProjectCard";
import TaskDialog from "@components/tasks/TaskDialog";

import useUser from "@hooks/useUser";

Tasks.title = "Tasks List";
Tasks.requireLogin = true;
Tasks.fullWidth = true;

export default function Tasks() {
  const { mutateUser } = useUser();
  const { data: projects, error, mutate, isLoading } = useSWR<Project[]>("/api/tasks", fetcher);
  const projectKey = useProjectTaskStore((state) => state.projectKey);
  const { setActiveTask } = useProjectTaskActions();
  const projectsWithTasks = useMemo(() => projects?.filter((project) => project.tasks.length) || [], [projects]);

  useEffect(() => {
    mutate(); // force revalidate
  }, [projectKey, mutate]);

  useEffect(() => {
    if (error) {
      mutateUser();
    }
  }, [error, mutateUser]);

  useEffect(() => {
    if (projectsWithTasks) {
      const activeTask = findActiveProjectTask(projectsWithTasks);
      setActiveTask(activeTask);
    }
  }, [projectsWithTasks, setActiveTask]);

  return (
    <>
      <Grid sx={{ pl: 0, pr: 0 }} container spacing={2} justifyContent="center">
        {isLoading ? (
          <Grid item xs={12} md={9}>
            <Skeleton sx={{ minHeight: "500px", transform: "none" }} />
          </Grid>
        ) : !error && projectsWithTasks.length ? (
          projectsWithTasks.map((project) => (
            <Grid item xs={12} md={9} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))
        ) : (
          <HeroSection
            decorative="You have no tasks!"
            subtitle={
              <Button color="success" href="/tasks/new" variant="outlined" startIcon={<Add />} component={Link}>
                Create a new task
              </Button>
            }
          />
        )}
      </Grid>
      <TaskDialog />
    </>
  );
}
