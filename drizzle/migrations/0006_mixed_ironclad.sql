ALTER TABLE `users` RENAME COLUMN "location" TO "country";--> statement-breakpoint
ALTER TABLE `users` ADD `date_of_birth` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `gender` text(255) NOT NULL;