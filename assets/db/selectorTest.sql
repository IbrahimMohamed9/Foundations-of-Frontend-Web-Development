USE `balqan`;

select *
from projects;

select *
from users;

SELECT *
FROM activities;

SELECT act.activities_id
     , us.user_id
     , act.img_src
     , act.name
     , act.description
     , act.date
     , DATE_FORMAT(act.time, '%H:%i') AS time
FROM users AS us
         JOIN activities AS act ON us.user_id = act.user_id
WHERE us.user_id = 1
LIMIT 3;

SELECT u.*, COUNT(up.user_id) AS projects, COALESCE(AVG(up.cost), 0) AS earned
FROM users AS u
         LEFT JOIN user_projects up ON u.user_id = up.user_id AND up.position != 'customer'
WHERE u.user_id = :user_id
GROUP BY u.user_id;

SELECT * FROM items WHERE category = 'package' ORDER BY added_time LIMIT :limit

SELECT t.label, t.icon, t.achieved FROM
        users u
        JOIN tickets t ON t.user_id = u.user_id
        WHERE u.user_id = :user_id;

SELECT t.label, t.icon, t.achieved, t.goal FROM
        users u
        JOIN targets t ON t.user_id = u.user_id
        WHERE u.user_id = :user_id AND t.year = (YEAR(CURDATE()))