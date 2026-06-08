CREATE TYPE "public"."job_type" AS ENUM('Full-time', 'Part-time', 'Contract', 'Internship');--> statement-breakpoint
CREATE TYPE "public"."location_type" AS ENUM('Remote', 'Hybrid', 'On-site');--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "location_type" "location_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "job_type" "job_type" NOT NULL;