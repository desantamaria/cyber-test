"use client";

import { listProjects } from "@/app/actions/queries/project";
import { projectsTable } from "@/db/schema";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { columns } from "./_table/columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

async function getData(): Promise<(typeof projectsTable.$inferSelect)[]> {
  // Placeholder Data
  return [
    {
      id: 123123,
      name: "Project1",
      updated: new Date("2023-02-20T14:30:00.000Z"),
      creator: 2,
    },
    {
      id: 12312321,
      name: "Project2",
      updated: new Date("2023-02-20T14:30:00.000Z"),
      creator: 2,
    },
    {
      id: 765432,
      name: "Project3",
      updated: new Date("2023-02-20T14:30:00.000Z"),
      creator: 2,
    },
  ];
}

export default function ProjectsPage({ session }: { session: Session }) {
  const [projects, setProjects] = useState<
    (typeof projectsTable.$inferSelect)[] | []
  >([]);

  const [data, setData] = useState<(typeof projectsTable.$inferSelect)[] | []>(
    []
  );
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await listProjects(session.user?.id!);
        setProjects(projectsData);

        const fetchedData = await getData();
        setData(fetchedData);
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
        <Button size="sm">
          <PlusIcon />
          Project
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
