import {
  AnyPgColumn,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Authentication Tables

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).unique(),
  emailVerified: timestamp(),
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

export const verificationTokenTable = pgTable("verification_token", {
  identifier: text(),
  token: text(),
  expires: timestamp().notNull(),
});

// App Tables
export const projectsTable = pgTable("projects", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  updated: timestamp().defaultNow().notNull(),
  creator: integer().references((): AnyPgColumn => usersTable.id),
});

// Many to many with testCases
export const experimentsTable = pgTable("experiments", {
  id: serial().primaryKey(),
});

export const promptsTable = pgTable("prompts", {
  id: serial().primaryKey(),
  modelName: text(),
  messages: text().array(),
});

export const experimentsPromptsTable = pgTable("experiments_prompts", {
  experiment: integer()
    .references((): AnyPgColumn => experimentsTable.id)
    .primaryKey(),
  testCase: integer()
    .references((): AnyPgColumn => testCaseTable.id)
    .primaryKey(),
});

export const testCaseTable = pgTable("test_case", {
  id: serial().primaryKey(),
  userMessage: text(),
  expectedOutput: text(),
  grader: integer().references((): AnyPgColumn => gradersTable.id),
});

export const experimentsTestCasesTable = pgTable("experiments_test_cases", {
  experiment: integer()
    .references((): AnyPgColumn => experimentsTable.id)
    .primaryKey(),
  testCase: integer()
    .references((): AnyPgColumn => testCaseTable.id)
    .primaryKey(),
});

export const gradersTable = pgTable("graders", {
  id: serial().primaryKey(),
});

export const experimentRunsTable = pgTable("experiment_runs", {
  id: serial().primaryKey(),
  percentage: integer(), // scores and results for each test case
  aggregateScore: integer(),
});
