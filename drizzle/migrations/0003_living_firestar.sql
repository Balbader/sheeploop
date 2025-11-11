ALTER TABLE `go_to_market_plans` RENAME COLUMN "name" TO "target_platforms";--> statement-breakpoint
ALTER TABLE `go_to_market_plans` RENAME COLUMN "description" TO "duration";--> statement-breakpoint
ALTER TABLE `go_to_market_plans` RENAME COLUMN "audience" TO "tone";--> statement-breakpoint
ALTER TABLE `go_to_market_plans` ADD `vision` text NOT NULL;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` ADD `posting_frequency` text NOT NULL;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` ADD `number_of_personas` text NOT NULL;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` ADD `device` text;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` ADD `device_name` text;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` ADD `output` text NOT NULL;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` DROP COLUMN `platforms`;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` DROP COLUMN `content_strategy`;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` DROP COLUMN `content_format`;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` DROP COLUMN `content_length`;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` DROP COLUMN `content_frequency`;--> statement-breakpoint
ALTER TABLE `go_to_market_plans` DROP COLUMN `content_type`;