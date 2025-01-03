"use client";

import { listGraders } from "@/app/actions/queries/grader";
import { DataTable } from "@/components/data-table";
import { gradersTable } from "@/db/schema";
import { use, useEffect, useState } from "react";
import { graderColumns } from "./columns";
import CreateGrader from "./create-grader";

export default function GradersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [graders, setGraders] = useState<
    (typeof gradersTable.$inferSelect)[] | []
  >([]);

  const fetchGraders = async () => {
    try {
      const gradersData = await listGraders();
      console.log(gradersData);
      setGraders(gradersData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchGraders();
  }, []);

  return (
    <div className="w-full h-full px-10 py-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Graders
        </h3>
        <CreateGrader fetchPrompts={fetchGraders} />
      </div>
      <DataTable columns={graderColumns} data={graders} />
    </div>
  );
}
