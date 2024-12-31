"use client";

import { listProjects } from "@/app/actions/queries/project";
import { DataTable } from "@/components/ui/data-table";
import { projectsTable } from "@/db/schema";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { columns } from "./_table/columns";
import CreateProject from "./create-project";

export default function ProjectsPage({ session }: { session: Session }) {
  const [projects, setProjects] = useState<
    (typeof projectsTable.$inferSelect)[] | []
  >([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await listProjects(parseInt(session.user?.id!));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-full h-full px-10 py-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Projects
        </h3>
        <CreateProject session={session} />
      </div>
      <DataTable columns={columns} data={projects} />
    </div>
  );
}
