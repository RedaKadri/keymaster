import type { InferSelectModel } from "drizzle-orm";

export type wpmType = {
  x: number;
  raw: number;
  net: number;
  errors: number;
};

export type User = InferSelectModel<typeof tables.users>;
export type Session = InferSelectModel<typeof tables.sessions>;
export type Game = InferSelectModel<typeof tables.games>;
