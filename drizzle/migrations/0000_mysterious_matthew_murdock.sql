CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text(255) NOT NULL,
	`last_name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);