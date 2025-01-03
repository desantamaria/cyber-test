"use client";

import { listTestCases } from "@/app/actions/queries/test-case";
import { DataTable } from "@/components/data-table";
import { testCaseTable } from "@/db/schema";
import { use, useEffect, useState } from "react";
import { TestCasesColumns } from "./columns";
import CreateTestCase from "./create-testcase";

export default function PromptsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [testCases, setTestCases] = useState<
    (typeof testCaseTable.$inferSelect)[] | []
  >([]);

  const fetchTestCases = async () => {
    try {
      const testCasesData = await listTestCases();
      setTestCases(testCasesData!);
    } catch (error) {
      console.error("Error fetching Test Cases:", error);
    }
  };

  useEffect(() => {
    fetchTestCases();
  }, []);

  return (
    <div className="w-full h-full px-10 py-10 flex flex-col gap-3">
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Test Cases
        </h3>
        <CreateTestCase fetchTestCases={fetchTestCases} />
      </div>
      <DataTable columns={TestCasesColumns} data={testCases} />
    </div>
  );
}
