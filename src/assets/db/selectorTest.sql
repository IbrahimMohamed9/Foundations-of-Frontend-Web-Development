USE `balqgivg_main`;

SELECT *
FROM widgets;

SELECT *
FROM drafts;

SELECT *
FROM targets;

SELECT user_id, password, phone, name,email
FROM users;

SELECT * FROM articles WHERE article_id = :article_id;
SELECT *
FROM projects;

SELECT *
FROM carts;

SELECT *
FROM cart_items;

SELECT *
FROM user_projects;

SELECT *
FROM user_friends;

SELECT *
FROM friend_requests;

SELECT * FROM items
WHERE category = 'package'
ORDER BY added_time
LIMIT 2;

SELECT * FROM activities;
