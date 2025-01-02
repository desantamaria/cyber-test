"use server";
import * as schema from "@/db/schema";
import { promptsTable } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export async function listPrompts() {
  const result = await db.query.promptsTable.findMany({
    orderBy: [desc(schema.projectsTable.updated)],
  });

  return result;
}

export async function createPrompt(
  promptInfo: typeof promptsTable.$inferInsert
) {
  const result = await db
    .insert(schema.promptsTable)
    .values(promptInfo)
    .returning();
  return result[0].id;
}
