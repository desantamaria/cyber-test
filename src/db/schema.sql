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
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  creator INTEGER REFERENCES users(id)
);

CREATE TABLE experiments (
  id SERIAL PRIMARY KEY
  name VARCHAR(255) NOT NULL
);

CREATE TABLE test_case (
  id SERIAL PRIMARY KEY,
  userMessage TEXT,
  expectedOutput TEXT,
  grader INTEGER REFERENCES graders(id)
);

CREATE TABLE experiments_test_cases (
  experiment INTEGER REFERENCES experiments(id),
  testCase INTEGER REFERENCES test_case(id),
  PRIMARY KEY (experiment, testCase)
);

CREATE TABLE prompts (
  id SERIAL PRIMARY KEY,
  modelName TEXT,
  prompt TEXT,
  message TEXT
);

CREATE TABLE experiments_prompts (
  experiment INTEGER REFERENCES experiments(id),
  prompt INTEGER REFERENCES prompts(id),
  PRIMARY KEY (experiment, prompt)
);

CREATE TABLE graders (
  id SERIAL PRIMARY KEY,
  name TEXT,
  "modelName" TEXT,
  prompt TEXT
);

CREATE TABLE experiment_runs (
  id SERIAL PRIMARY KEY,
  experimentFrom INTEGER REFERENCES experiments(id),
  percentage INTEGER,
  aggregateScore INTEGER
);