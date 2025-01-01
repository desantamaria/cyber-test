"use client";

import { listPrompts } from "@/app/actions/queries/prompt";
import { promptsTable } from "@/db/schema";
import { use, useEffect, useState } from "react";
import CreatePrompt from "./create-prompt";
import { promptColumns } from "./columns";
import { DataTable } from "@/components/data-table";

export default function PromptsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [prompts, setPrompts] = useState<
    (typeof promptsTable.$inferSelect)[] | []
  >([]);

  const fetchPrompts = async () => {
    try {
      const projectsData = await listPrompts();
      setPrompts(projectsData!);
      console.log(id);
      console.log(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div className="w-full h-full px-10 py-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Prompts
        </h3>
        <CreatePrompt fetchPrompts={fetchPrompts} />
      </div>
      <DataTable columns={promptColumns} data={prompts} />
    </div>
  );
}
