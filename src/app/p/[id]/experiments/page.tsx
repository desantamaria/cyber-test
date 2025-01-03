"use client";

import { listExperiments } from "@/app/actions/queries/experiments";
import { experimentsTable } from "@/db/schema";
import { use, useEffect, useState } from "react";
import CreateExperiment from "./create-experiment";
import { ExperimentColumns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useRouter } from "next/navigation";

export default function ExperimentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [experiments, setExperiments] = useState<
    (typeof experimentsTable.$inferSelect)[] | []
  >([]);

  const fetchExperiments = async () => {
    try {
      const experimentsData = await listExperiments();
      console.log(experimentsData);
      setExperiments(experimentsData);
    } catch (error) {
      console.error("Error fetching experiments:", error);
    }
  };

  useEffect(() => {
    fetchExperiments();
  }, []);

  const handleRowClick = (rowData: typeof experimentsTable.$inferSelect) => {
    if (rowData && rowData.id) {
      router.push(`/p/${id}/experiments/${rowData.id}`);
    }
  };

  return (
    <div className="w-full h-full px-10 py-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Experiments
        </h3>
        <CreateExperiment fetchExperiments={fetchExperiments} />
      </div>
      <DataTable
        columns={ExperimentColumns}
        data={experiments}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
