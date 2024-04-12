DROP DATABASE IF EXISTS `balqan`;
<<<<<<< HEAD
CREATE DATABASE `balqan`;

USE `balqan`;

CREATE TABLE `users` (
=======
CREATE DATABASE IF NOT EXISTS `balqan`;

USE `balqan`;

CREATE TABLE IF NOT EXISTS `users` (
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
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

<<<<<<< HEAD
CREATE TABLE `items` (
=======
CREATE TABLE IF NOT EXISTS `items` (
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
    `item_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `description` TEXT,
    `price` DECIMAL(10, 2),
    `stock_quantity` INT,
    `imgs` JSON,
<<<<<<< HEAD
    `max_days` INT,
    `days` INT,
    `min_days` INT,
    `min_persons` VARCHAR(255),
    `persons` VARCHAR(255),
    `max_persons` VARCHAR(255),
    `category` VARCHAR(255),
    `title` VARCHAR(255),
    `intro` VARCHAR(255),
    `status` VARCHAR(255)
);

CREATE TABLE `carts` (
=======
    `max` INT,
    `min` INT,
    `category` VARCHAR(255),
    `title` VARCHAR(255),
    `intro` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `carts` (
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
    `cart_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `cart_items` TEXT,
	CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

<<<<<<< HEAD
CREATE TABLE `cart_items` (
=======
CREATE TABLE IF NOT EXISTS `cart_items` (
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
    `cart_id` INT,
    `item_id` INT,
    `quantity` INT,
	CONSTRAINT `fk_cart_item_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`),
	CONSTRAINT `fk_cart_item_item_id` FOREIGN KEY (`item_id`) REFERENCES `items`(`item_id`)
);

<<<<<<< HEAD
CREATE TABLE `articles` (
=======
CREATE TABLE IF NOT EXISTS `articles` (
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
    `article_id` INT AUTO_INCREMENT PRIMARY KEY,
    `img` VARCHAR(300),
    `imgDesc` VARCHAR(255),
    `category` VARCHAR(255),
    `title` VARCHAR(255),
    `country` VARCHAR(255),
<<<<<<< HEAD
    time DATETIME DEFAULT CURRENT_TIMESTAMP
,
=======
    `date` DATE,
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
    `description` TEXT,
    `content` TEXT
);

<<<<<<< HEAD
CREATE TABLE `projects` (
=======
CREATE TABLE IF NOT EXISTS `projects` (
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
    `project_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255),
    `start_date` DATE,
    `end_date` DATE,
    `team` JSON,
    `tasks` JSON,
<<<<<<< HEAD
    `progressPersent` INT,
=======
    `progress` DECIMAL(5, 2),
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
    `status` VARCHAR(255),
    `client` INT,
    `price` DECIMAL(10, 2),
    `progress` JSON,
    CONSTRAINT `fk_project_client` FOREIGN KEY (`client`) REFERENCES `users`(`user_id`)
);

<<<<<<< HEAD
CREATE TABLE `targets`(
=======
CREATE TABLE IF NOT EXISTS `targets`(
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
	`target_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `label` VARCHAR(255),
    `goal` DECIMAL(10, 2),
    `icon` VARCHAR(255),
    `achieved` DECIMAL(10, 2),
	CONSTRAINT `fk_targets_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

<<<<<<< HEAD
CREATE TABLE `tickets`(
=======
CREATE TABLE IF NOT EXISTS `tickets`(
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
	`ticket_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `label` VARCHAR(255),
    `icon` VARCHAR(255),
    `achieved` DECIMAL(10, 2),
	CONSTRAINT `fk_tickets_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);
<<<<<<< HEAD

CREATE TABLE `friends`(
	`user_id` INT,
    `friends` JSON,
	CONSTRAINT `fk_friends_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);
=======
>>>>>>> c92b7ef71b299e3beb46a6dec7e502efed9c6ac2
