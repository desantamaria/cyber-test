"use server";
import * as schema from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export async function listTestCases() {
  const result = await db.query.testCaseTable.findMany({
    orderBy: [desc(schema.testCaseTable.updated)],
  });
  return result;
}

export async function createTestCase(
  testCaseInfo: typeof schema.testCaseTable.$inferInsert
) {
  const result = await db
    .insert(schema.testCaseTable)
    .values(testCaseInfo)
    .returning();
  return result[0].id;
}
