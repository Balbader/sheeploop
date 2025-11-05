CREATE TABLE `go_to_market_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`idea` text NOT NULL,
	`description` text NOT NULL,
	`audience` text NOT NULL,
	`platforms` text NOT NULL,
	`content_strategy` text NOT NULL,
	`content_format` text NOT NULL,
	`content_length` integer NOT NULL,
	`content_frequency` integer NOT NULL,
	`content_type` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shorts_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`script` text NOT NULL,
	`script_length` integer NOT NULL,
	`script_format` text NOT NULL,
	`script_strategy` text NOT NULL,
	`script_topics` text NOT NULL,
	`script_created_at` integer NOT NULL,
	`script_updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `users` ADD `username` text(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `location` text(255) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);