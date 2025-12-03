import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { sessions } from "./sessions";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  // Admin plugin fields
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
