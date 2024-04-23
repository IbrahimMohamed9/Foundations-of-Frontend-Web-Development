USE `balqan`;

select *
from projects;

select *
from users;


SELECT act.activities_id
     , us.user_id
     , act.img_src
     , act.name
     , act.description
     , act.date
     , act.time
FROM users AS us
         JOIN activities AS act ON us.user_id = act.user_id
WHERE us.user_id = 1