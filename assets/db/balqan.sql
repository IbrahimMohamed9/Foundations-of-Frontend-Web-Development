DROP DATABASE IF EXISTS `balqan`;
CREATE DATABASE IF NOT EXISTS `balqan`;

USE `balqan`;

CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_name` VARCHAR(255),
    `user_surname` VARCHAR(255),
    `password` VARCHAR(255),
    `email` VARCHAR(255),
    `img` VARCHAR(255),
    `DOF` DATE,
    `phone` VARCHAR(255),
    `country` VARCHAR(255),
    `jobTitle` VARCHAR(255),
    `YOE` INT,
    `gender` VARCHAR(15),
    `nationality` VARCHAR(255),
    `skills` JSON,
    `ratingsStar` JSON,
    `activities` JSON
    );

CREATE TABLE IF NOT EXISTS `items` (
    `item_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `description` TEXT,
    `price` DECIMAL(10, 2),
    `stock_quantity` INT,
    `imgs` JSON,
    `max` INT,
    `min` INT,
    `category` VARCHAR(255),
    `title` VARCHAR(255),
    `intro` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `carts` (
    `cart_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `cart_items` TEXT,
	CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `cart_items` (
    `cart_id` INT,
    `item_id` INT,
    `quantity` INT,
	CONSTRAINT `fk_cart_item_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`),
	CONSTRAINT `fk_cart_item_item_id` FOREIGN KEY (`item_id`) REFERENCES `items`(`item_id`)
);

CREATE TABLE IF NOT EXISTS `articles` (
    `article_id` INT AUTO_INCREMENT PRIMARY KEY,
    `img` VARCHAR(300),
    `imgDesc` VARCHAR(255),
    `category` VARCHAR(255),
    `title` VARCHAR(255),
    `country` VARCHAR(255),
    `date` DATE,
    `description` TEXT,
    `content` TEXT
);

CREATE TABLE IF NOT EXISTS `projects` (
    `project_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `start_date` DATE,
    `end_date` DATE,
    `team` JSON,
    `tasks` JSON,
    `progress` DECIMAL(5, 2),
    `status` VARCHAR(255),
    `client` INT,
    `price` DECIMAL(10, 2),
    `progress` JSON,
    CONSTRAINT `fk_project_client` FOREIGN KEY (`client`) REFERENCES `users`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `targets`(
	`target_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `label` VARCHAR(255),
    `goal` DECIMAL(10, 2),
    `icon` VARCHAR(255),
    `achieved` DECIMAL(10, 2),
	CONSTRAINT `fk_targets_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `tickets`(
	`ticket_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `label` VARCHAR(255),
    `icon` VARCHAR(255),
    `achieved` DECIMAL(10, 2),
	CONSTRAINT `fk_tickets_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);
