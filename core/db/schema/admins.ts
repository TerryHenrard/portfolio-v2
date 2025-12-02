import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { accounts } from "./accounts";
import { newsletterDrafts } from "./newsletter-drafts";
import { sessions } from "./sessions";

export const admins = pgTable("admins", {
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
});

export const adminsRelations = relations(admins, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  reviewedDrafts: many(newsletterDrafts),
}));

export type InsertAdmin = typeof admins.$inferInsert;
export type SelectAdmin = typeof admins.$inferSelect;

// Validation schemas
export const selectAdminSchema = createSelectSchema(admins);
export const insertAdminSchema = createInsertSchema(admins, {
  email: (schema) => schema.email(),
  name: (schema) => schema.min(1).max(255),
});
export const updateAdminSchema = createUpdateSchema(admins, {
  email: (schema) => schema.email(),
  name: (schema) => schema.min(1).max(255),
});
