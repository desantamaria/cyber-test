"use server";
import * as schema from "@/db/schema";
import { projectsTable } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export async function listProjects(userId: number) {
  const result = await db.query.projectsTable.findMany({
    where: eq(schema.projectsTable.creator, userId),
    orderBy: [desc(schema.projectsTable.updated)],
  });
  return result;
}

export async function createProject(
  projectInfo: typeof projectsTable.$inferInsert
) {
  const result = await db
    .insert(schema.projectsTable)
    .values(projectInfo)
    .returning();
  return result[0].id;
}

export async function getProjectById(projectId: number) {
  const result = await db.query.projectsTable.findFirst({
    where: eq(schema.projectsTable.id, projectId),
  });
  return result;
}

export async function updateProject(
  projectId: number,
  data: Partial<{
    title: string;
    description: string;
    creator: number;
    updated: Date;
  }>
) {
  const result = await db
    .update(schema.projectsTable)
    .set(data)
    .where(eq(schema.projectsTable.id, projectId));
  return result;
}

export async function deleteProject(projectId: number) {
  const result = await db
    .delete(schema.projectsTable)
    .where(eq(schema.projectsTable.id, projectId));
  return result;
}
