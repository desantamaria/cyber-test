"use server";

import * as schema from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export async function getUser(userId: string) {
  const result = await db.query.usersTable.findFirst({
    where: eq(schema.usersTable.id, parseInt(userId)),
  });
  return result;
}

export async function listUsers(userId: string) {
  const result = await db.query.usersTable.findMany({
    with: {
      id: userId,
    },
  });
  return result;
}
