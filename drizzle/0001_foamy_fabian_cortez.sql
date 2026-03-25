CREATE TABLE `logic_puzzles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`puzzle` text NOT NULL,
	`options` text NOT NULL,
	`correctAnswer` int NOT NULL,
	`difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'medium',
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `logic_puzzles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `math_problems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`problem` text NOT NULL,
	`options` text NOT NULL,
	`correctAnswer` int NOT NULL,
	`difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'medium',
	`timeLimit` int NOT NULL DEFAULT 30,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `math_problems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questions_sync_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('quiz','math','logic') NOT NULL,
	`lastSyncTimestamp` timestamp NOT NULL DEFAULT (now()),
	`totalCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `questions_sync_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` text NOT NULL,
	`options` text NOT NULL,
	`correctAnswer` int NOT NULL,
	`category` varchar(100) NOT NULL,
	`difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'medium',
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quiz_questions_id` PRIMARY KEY(`id`)
);
