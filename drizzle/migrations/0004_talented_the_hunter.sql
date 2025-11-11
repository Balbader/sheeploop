ALTER TABLE `shorts_plans` RENAME TO `form_output`;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` RENAME COLUMN "output" TO "output_id";--> statement-breakpoint
CREATE TABLE `ifc_profile` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`go_to_market_plan_id` text,
	`demographics` text NOT NULL,
	`psychographics` text NOT NULL,
	`pain_points` text NOT NULL,
	`triggers` text NOT NULL,
	`community_behaviors` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `personas` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`plan_id` text,
	`persona_name` text NOT NULL,
	`description` text NOT NULL,
	`key_motivation` text NOT NULL,
	`core_pain_point` text NOT NULL,
	`platform_behavior` text NOT NULL,
	`preferred_tone_style` text NOT NULL,
	`storyline` text NOT NULL,
	`growth_strategy` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shorts_scripts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`go_to_market_plan_id` text,
	`persona_id` text,
	`title` text NOT NULL,
	`duration` text NOT NULL,
	`script` text NOT NULL,
	`cta` text NOT NULL,
	`day_of_week` text NOT NULL,
	`preferred_time` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_form_output` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`form_output` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_form_output`("id", "user_id", "form_output", "created_at", "updated_at") SELECT "id", "user_id", "form_output", "created_at", "updated_at" FROM `form_output`;--> statement-breakpoint
DROP TABLE `form_output`;--> statement-breakpoint
ALTER TABLE `__new_form_output` RENAME TO `form_output`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX "users_username_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `go_to_market_plans` ALTER COLUMN "output_id" TO "output_id" text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);