import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { Stats } from "../types";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  email: text("email").unique(),
  avatarUrl: text("avatar_url"),
  authProvider: text("auth_provider", { enum: ["google", "github"] }).notNull(),
  authProviderID: text("auth_provider_id").notNull(),
  createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const games = sqliteTable("games", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stats: text("status", { mode: "json" }).$type<Stats>().notNull(),
  createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
