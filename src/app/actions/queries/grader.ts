"use server";
import * as schema from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export async function listGraders() {
  const result = await db.query.gradersTable.findMany({
    orderBy: [desc(schema.projectsTable.updated)],
  });
  return result;
}

export async function createGrader(
  graderInfo: typeof schema.gradersTable.$inferInsert
) {
  const result = await db
    .insert(schema.gradersTable)
    .values(graderInfo)
    .returning();
  return result[0].id;
}
