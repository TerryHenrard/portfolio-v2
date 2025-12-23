import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { newsletterDrafts } from "./newsletter-drafts";

export const sendStatusEnum = pgEnum("send_status", [
  "pending",
  "in_progress",
  "completed",
  "failed",
]);

export const newsletterSends = pgTable("newsletter_sends", {
  id: uuid("id").defaultRandom().primaryKey(),
  draftId: uuid("draft_id")
    .notNull()
    .references(() => newsletterDrafts.id, { onDelete: "cascade" }),
  status: sendStatusEnum("status").notNull().default("pending"),
  totalSent: integer("total_sent").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const newsletterSendsRelations = relations(newsletterSends, ({ one }) => ({
  draft: one(newsletterDrafts, {
    fields: [newsletterSends.draftId],
    references: [newsletterDrafts.id],
  }),
}));

export type InsertNewsletterSend = typeof newsletterSends.$inferInsert;
export type SelectNewsletterSend = typeof newsletterSends.$inferSelect;

// Validation schemas
export const selectNewsletterSendSchema = createSelectSchema(newsletterSends);
export const insertNewsletterSendSchema = createInsertSchema(newsletterSends);
export const updateNewsletterSendSchema = createUpdateSchema(newsletterSends);
export const sendStatusEnumSchema = createSelectSchema(sendStatusEnum);
export type SendStatus = z.infer<typeof sendStatusEnumSchema>;
