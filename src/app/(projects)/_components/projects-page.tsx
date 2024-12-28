"use client";

import { listProjects } from "@/app/actions/queries/project";
import { projectsTable } from "@/db/schema";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { columns, Payment } from "./_table/columns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export default function ProjectsPage({ session }: { session: Session }) {
  const [projects, setProjects] = useState<
    (typeof projectsTable.$inferSelect)[] | []
  >([]);

  const [data, setData] = useState<Payment[] | []>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await listProjects(session.user?.id!);
        console.log(session.user?.id);
        console.log(projectsData);
        setProjects(projectsData);

        const fetchedData = await getData();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-full h-full py-10 flex flex-col gap-3 justify-center items-center">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
