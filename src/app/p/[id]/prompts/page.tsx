"use client";

import { listPrompts } from "@/app/actions/queries/prompt";
import { promptsTable } from "@/db/schema";
import { use, useEffect, useState } from "react";
import CreatePrompt from "./create-prompt";

export default function PromptsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [prompts, setPrompts] = useState<
    (typeof promptsTable.$inferSelect)[] | []
  >([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const projectsData = await listPrompts();
        setPrompts(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchPrompts();
  }, []);

  return (
    <div className="w-full h-full px-10 py-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Prompts
        </h3>
        <CreatePrompt />
      </div>
      {/* <DataTable columns={columns} data={projects} /> */}
    </div>
  );
}
