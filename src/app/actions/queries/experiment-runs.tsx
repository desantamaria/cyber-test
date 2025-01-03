"use server";
import * as schema from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export async function listExperimentRuns() {
  const result = await db.query.experimentRunsTable.findMany({
    orderBy: [desc(schema.experimentRunsTable.updated)],
  });
  return result;
}

export async function createExperimentRun(
  experimentRunInfo: typeof schema.experimentRunsTable.$inferInsert
) {
  const result = await db
    .insert(schema.experimentRunsTable)
    .values(experimentRunInfo)
    .returning();
  return result[0].id;
}
