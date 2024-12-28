CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL,
  "sessionToken" VARCHAR(255) NOT NULL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS verification_token (
  identifier TEXT,
  token TEXT,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);


/* App Tables */

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  creator INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS experiments (
  id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS prompts (
  id SERIAL PRIMARY KEY,
  "modelName" TEXT,
  messages TEXT[]
);

CREATE TABLE IF NOT EXISTS experiments_prompts (
  experiment INTEGER REFERENCES experiments(id),
  "testCase" INTEGER REFERENCES prompts(id),
  PRIMARY KEY (experiment, "testCase")
);

CREATE TABLE IF NOT EXISTS graders (
  id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS test_case (
  id SERIAL PRIMARY KEY,
  "userMessage" TEXT,
  "expectedOutput" TEXT,
  grader INTEGER REFERENCES graders(id)
);

CREATE TABLE IF NOT EXISTS experiments_test_cases (
  experiment INTEGER REFERENCES experiments(id),
  "testCase" INTEGER REFERENCES test_case(id),
  PRIMARY KEY (experiment, "testCase")
);

CREATE TABLE IF NOT EXISTS experiment_runs (
  id SERIAL PRIMARY KEY,
  percentage INTEGER,
  "aggregateScore" INTEGER
);