import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { newsletterSends } from "./newsletter-sends";
import { users } from "./users";

export const draftStatusEnum = pgEnum("draft_status", [
  "needs_review",
  "approved",
  "rejected",
  "sent",
]);

export const newsletterDrafts = pgTable("newsletter_drafts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  status: draftStatusEnum("status").notNull().default("needs_review"),
  aiVersion: text("ai_version"),
  reviewerId: text("reviewer_id").references(() => users.id, {
    onDelete: "set null",
  }),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const newsletterDraftsRelations = relations(newsletterDrafts, ({ one, many }) => ({
  reviewer: one(users, {
    fields: [newsletterDrafts.reviewerId],
    references: [users.id],
  }),
  sends: many(newsletterSends),
}));

export type InsertNewsletterDraft = typeof newsletterDrafts.$inferInsert;
export type SelectNewsletterDraft = typeof newsletterDrafts.$inferSelect;
