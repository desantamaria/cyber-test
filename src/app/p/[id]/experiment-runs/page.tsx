"use client";

import { use, useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { experimentRunsTable } from "@/db/schema";
import { listExperimentRuns } from "@/app/actions/queries/experiment-runs";
import { ExperimentRunColumns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ExperimentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [experimentRuns, setExperimentRuns] = useState<
    (typeof experimentRunsTable.$inferSelect)[] | []
  >([]);

  const fetchExperimentRuns = async () => {
    try {
      const experimentRunsData = await listExperimentRuns();
      setExperimentRuns(experimentRunsData);
    } catch (error) {
      console.error("Error fetching experiment runs:", error);
    }
  };

  useEffect(() => {
    fetchExperimentRuns();
  }, []);

  return (
    <div className="w-full h-full px-10 py-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Experiment Runs
        </h3>
        <Button variant="outline" asChild>
          <Link href={`/p/${id}/experiments`}>Create New Experiment Here</Link>
        </Button>
      </div>
      <DataTable columns={ExperimentRunColumns} data={experimentRuns} />
    </div>
  );
}
