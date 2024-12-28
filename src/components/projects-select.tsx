"use client";

import { Session } from "next-auth";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { projectsTable } from "@/db/schema";
import { listProjects } from "@/app/actions/queries/project";

export default function ProjectsSelect({ session }: { session: Session }) {
  const [projects, setProjects] = useState<
    (typeof projectsTable.$inferSelect)[] | []
  >([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await listProjects(session.user?.id!);
        console.log(session.user?.id);
        console.log(projectsData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center"></div>
  );
}
