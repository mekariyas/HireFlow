ALTER TYPE "public"."job_type" RENAME TO "jobType";--> statement-breakpoint
ALTER TYPE "public"."location_type" RENAME TO "locationType";--> statement-breakpoint
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "locationType" "locationType" NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "jobType" "jobType" NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "companyId" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_companyId_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "location_type";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "job_type";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "company_id";