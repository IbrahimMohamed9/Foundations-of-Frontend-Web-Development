-- DROP DATABASE IF EXISTS `sql11699000`;
-- CREATE DATABASE `sql11699000` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `sql11699000`;

DROP DATABASE IF EXISTS `balqan`;
CREATE DATABASE `balqan` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `balqan`;
CREATE TABLE `users`
(
    `user_id`      INT AUTO_INCREMENT PRIMARY KEY,
    `name`    VARCHAR(255),
    `password`     VARCHAR(255),
    `email`        VARCHAR(255),
    `img`          VARCHAR(255),
    `DOF`          DATE,
    `phone`        VARCHAR(255),
    `country`      VARCHAR(255),
    `jobTitle`     VARCHAR(255),
    `YOE`          INT,
    `gender`       VARCHAR(15),
    `nationality`  VARCHAR(255),
    `skills`       TEXT,
    `ratingsStar`  TEXT,
    `activities`   TEXT
);
CREATE TABLE `items`
(
    `item_id`        INT AUTO_INCREMENT PRIMARY KEY,
    `name`           VARCHAR(255),
    `description`    TEXT,
    `day_price`          DECIMAL(10, 2),
    `person_price`          DECIMAL(10, 2),
    `stock_quantity` INT,
    `imgs_srcs`      TEXT,
    `min_days`       INT,
    `days`           INT,
    `max_days`       INT,
    `min_persons`    VARCHAR(255),
    `persons`        VARCHAR(255),
    `max_persons`    VARCHAR(255),
    `category`       VARCHAR(255),
    `title`          VARCHAR(255),
    `intro`          VARCHAR(255),
    `status`         VARCHAR(255),
    `added_time`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE `carts`
(
    `cart_id`    INT AUTO_INCREMENT PRIMARY KEY,
    `user_id`    INT,
    CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
CREATE TABLE `cart_items`
(
    `cart_id`  INT,
    `item_id`  INT,
    `days` INT,
    `persons` INT,
    CONSTRAINT `fk_cart_item_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
    CONSTRAINT `fk_cart_item_item_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`)
);
CREATE TABLE `articles`
(
    `article_id`  INT AUTO_INCREMENT PRIMARY KEY,
    `img_src`     VARCHAR(300),
    `img_desc`    VARCHAR(255),
    `category`    VARCHAR(255),
    `title`       VARCHAR(255),
    `country`     VARCHAR(255),
    `added_time`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `description` TEXT,
    `content`     TEXT,
    `status`      VARCHAR(255)
);
CREATE TABLE `projects`
(
    `project_id`      INT AUTO_INCREMENT PRIMARY KEY,
    `name`            VARCHAR(255),
    `start_date`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `end_date`        TIMESTAMP,
    `team`            TEXT,
    `tasks`           TEXT,
    `progressPersent` INT,
    `status`          VARCHAR(255),
    `client`          INT,
    `price`           DECIMAL(10, 2),
    `progress`        TEXT,
    CONSTRAINT `fk_project_client` FOREIGN KEY (`client`) REFERENCES `users` (`user_id`)
);
CREATE TABLE `targets`
(
    `target_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id`   INT,
    `label`     VARCHAR(255),
    `goal`      DECIMAL(10, 2),
    `icon`      VARCHAR(255),
    `achieved`  DECIMAL(10, 2),
    CONSTRAINT `fk_targets_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
CREATE TABLE `tickets`
(
    `ticket_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id`   INT,
    `label`     VARCHAR(255),
    `icon`      VARCHAR(255),
    `achieved`  DECIMAL(10, 2),
    CONSTRAINT `fk_tickets_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
CREATE TABLE `friends`
(
    `user_id` INT,
    `friends` TEXT,
    CONSTRAINT `fk_friends_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
CREATE TABLE `feedbacks`
(
    `feedback_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name`        VARCHAR(255),
    `email`       VARCHAR(255),
    `phone`       VARCHAR(255),
    `added_time`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `message`     TEXT
);