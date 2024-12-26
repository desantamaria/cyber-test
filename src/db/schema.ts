import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: timestamp("emailVerified"),
  image: text(),
});

export const accountsTable = pgTable("accounts", {
  id: serial().primaryKey(),
  userId: integer().notNull(),
  type: varchar({ length: 255 }).notNull(),
  provider: varchar({ length: 255 }).notNull(),
  providerAccountId: varchar({ length: 255 }).notNull(),
  refreshToken: text(),
  accessToken: text(),
  expiresAt: integer(),
  tokenType: text(),
  scope: text(),
  idToken: text(),
  sessionState: text(),
});

export const sessionsTable = pgTable("sessions", {
  id: serial().primaryKey(),
  sessionToken: varchar({ length: 255 }).notNull(),
  userId: integer().notNull(),
  expires: timestamp().notNull(),
});

export const verificationTokensTable = pgTable("verification_tokens", {
  identifier: text(),
  token: text(),
  expires: timestamp().notNull(),
});
