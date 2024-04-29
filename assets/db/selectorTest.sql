USE `balqan`;

SELECT u.*,
       COUNT(up.user_id)          AS projects,
       COALESCE(AVG(up.price), 0) AS `earned`,
       MAX(DATE(ph.change_date))  as `last_change`
FROM users AS u
         LEFT JOIN user_projects up ON u.user_id = up.user_id AND up.position != 'customer'
         LEFT JOIN password_history ph ON u.user_id = ph.user_id
WHERE u.user_id = :user_id
GROUP BY u.user_id;

SELECT *
FROM widgets;

SELECT *
FROM friend_requests;

SELECT *
FROM user_friends;

SELECT user_id, number_of_friends
FROM users;


SELECT u.user_id,
       u.name,
       u.email,
       u.img,
       u.phone,
       u.country,
       u.job_title,
       u.level,
       u.gender,
       u.number_of_friends,
       COUNT(up.user_id) AS projects
FROM users AS u
         LEFT JOIN user_projects up ON u.user_id = up.user_id AND up.position != 'customer'
         LEFT JOIN user_friends uf ON u.user_id = uf.user_id OR u.user_id = uf.friend_id
WHERE (uf.user_id = :friend_id OR uf.friend_id = :friend_id)
  AND :friend_id != u.user_id
GROUP BY u.name,
         u.email,
         u.img,
         u.phone,
         u.country,
         u.user_id,
         u.job_title,
         u.level,
         u.gender;


SELECT u.name,
       u.img,
       u.job_title
FROM users AS u
         RIGHT JOIN
     friend_requests fr ON u.user_id = fr.requester_id
WHERE fr.status IS NULL
  AND fr.requested_id = :user_id
GROUP BY u.name,
         u.img,
         u.job_title;


SELECT u.name,
       u.email,
       u.img,
       u.joined_date,
       u.level,
       u.gender,
       COUNT(up.user_id) AS projects,
       u.number_of_friends
FROM user_friends AS uf
         JOIN users u ON u.user_id = uf.user_id OR u.user_id = uf.friend_id
         LEFT JOIN user_projects up ON u.user_id = up.user_id AND up.position != 'customer'
WHERE (uf.user_id = :user_id OR uf.friend_id = :user_id) AND u.user_id != :user_id
GROUP BY u.name,
       u.email,
       u.img,
       u.joined_date,
       u.level,
       u.gender,
       u.number_of_friends