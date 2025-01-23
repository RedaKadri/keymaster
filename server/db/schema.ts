import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  email: text("email").unique(),
  authProvider: text("auth_provider", { enum: ["google", "github"] }).notNull(),
  avatarUrl: text("avatar_url"),
});

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const games = sqliteTable("games", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  status: text("status", { mode: "json" }).$type<Status>(),
  createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

type Status = {
  language: "english" | "french";
  time: number;
  wpm: wpmType[];
};
