CREATE UNIQUE INDEX "CompanyEmail_idx" ON "companies" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "UserEmail_idx" ON "users" USING btree ("email");