import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";

import * as schema from "../db/schema";

export const tables = schema;

export const db: LibSQLDatabase<typeof schema> = drizzle(
  process.env.DB_FILE_NAME!
);
