USE `balqan`;


SELECT *
FROM widgets;

SELECT *
FROM items;

SELECT *
FROM targets;

SELECT user_id, password, phone, name
FROM balqan.users;

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
FROM friend_requests;

SELECT * FROM items
WHERE category = 'package'
ORDER BY added_time
LIMIT 2;

SELECT * FROM activities;
