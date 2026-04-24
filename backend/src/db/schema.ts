import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const jobStatusEnum = pgEnum("job_status", ["open", "closed"]);
export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "accepted",
  "rejected",
]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 100000 }),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  niche: varchar({ length: 255 }).notNull(),
  skills: text().notNull(),
  CVurl: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const companyTable = pgTable("companies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 100000 }),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  niche: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const jobsTable = pgTable("jobs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 100000 }),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  status: jobStatusEnum().notNull().default("open"),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().defaultNow().notNull(),
  companyId: integer("company_id").references(() => companyTable.id, {
    onDelete: "cascade",
  }),
});

export const applicationTable = pgTable(
  "applications",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 100000 }),
    jobId: integer("job_id").references(() => jobsTable.id),
    applicantId: integer("applicants_id").references(() => usersTable.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp().defaultNow().notNull(),
    status: applicationStatusEnum().notNull().default("pending"),
  },
  (table) => [
    uniqueIndex("unique_application").on(table.jobId, table.applicantId),
  ],
);
