"use server";
import * as schema from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { createExperimentRun } from "./experiment-runs";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export async function listExperiments() {
  const result = await db.query.experimentsTable.findMany({
    orderBy: [desc(schema.experimentsTable.updated)],
  });
  return result;
}

export async function createExperiment(
  experimentInfo: typeof schema.experimentsTable.$inferInsert
) {
  const result = await db
    .insert(schema.experimentsTable)
    .values(experimentInfo)
    .returning();

  const experimentId = result[0].id;
  createExperimentRun({
    experimentFrom: experimentId,
    updated: experimentInfo.updated,
  });
  return experimentId;
}

export async function promptToExperiment(
  experimentId: number,
  promptId: number
) {
  await db.insert(schema.experimentsPromptsTable).values({
    experiment: experimentId,
    prompt: promptId,
  });
}

export async function addTestCaseToExperiment(
  experimentId: number,
  testCaseId: number
) {
  await db.insert(schema.experimentsTestCasesTable).values({
    experiment: experimentId,
    testCase: testCaseId,
  });
}
