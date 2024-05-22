<?php

require_once __DIR__ . '/BaseDao.class.php';

class UserDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('users');
    }
    public function add_user($user)
    {
        try {
            $this->beginTransaction();
            $this->insert("users", $user);

            $query = "SELECT LAST_INSERT_ID() AS user_id FROM users";
            $lastInserted = $this->query_unique_last($query, []);

            if ($lastInserted && isset($lastInserted['user_id'])) {
                $this->insert("carts", ['user_id' => $lastInserted['user_id']]);
                $this->insert("widgets", ['user_id' => $lastInserted['user_id']]);
                $this->commit();
                return $this->get_user_by_id($lastInserted['user_id']);
            } else {
                $this->rollBack();
            }
        } catch (PDOException $e) {
            $this->rollBack();
        }
    }
    public function add_friend_request($ids)
    {
        $this->insert("friend_requests", $ids);
    }
    public function get_users()
    {
        $query = "SELECT * FROM users";
        return $this->query($query, []);
    }
    public function get_user_by_id($user_id)
    {
        $query = "SELECT u.*, COUNT(up.user_id) AS projects, COALESCE(AVG(up.price), 0) AS `earned`, MAX(DATE(ph.change_date)) as `last_change`
                    FROM users AS u
                            LEFT JOIN user_projects up ON u.user_id = up.user_id AND up.position != 'customer'
                            LEFT JOIN password_history ph ON u.user_id = ph.user_id
                    WHERE u.user_id = :user_id
                    GROUP BY u.user_id";
        return $this->query_unique_first($query, ['user_id' => $user_id]);
    }
    public function get_friend_requests($user_id)
    {
        $query = "SELECT 
        u.user_id, 
        u.name, 
        u.img, 
        u.job_title
        FROM 
            users AS u
        RIGHT JOIN 
            friend_requests fr ON u.user_id = fr.requester_id
        WHERE 
            fr.status IS NULL 
            AND fr.requested_id = :user_id
        GROUP BY 
            u.user_id, 
            u.name, 
            u.img, 
            u.job_title";
        return $this->query($query, ['user_id' => $user_id]);
    }
    public function get_friends($user_id)
    {
        // TODO retrieve just card and retrieve friend by other function
        $query = "SELECT u.name,
        u.email,
        u.user_id,
        u.phone,
        u.img,
        u.joined_date,
        u.job_title,
        u.level,
        u.ratings,
        uf.friendship_id,
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
            u.phone,
            u.joined_date,
            u.job_title,
            u.level,
            u.ratings,
            uf.friendship_id,
            u.gender,
            u.user_id,
            u.number_of_friends";
        return $this->query($query, ['user_id' => $user_id]);
    }
    public function user_login($email, $password)
    {
        $query = "SELECT COUNT(user_id) AS counter
                    FROM users
                    WHERE email = :email AND password = :password";
        return $this->query_unique_first($query, ['email' => $email, 'password' => $password]);
    }
    public function get_user_activity($user_id)
    {
        $query = "SELECT act.activities_id
                            , us.user_id
                            , act.img_src
                            , act.name
                            , act.description
                            , act.date
                            , DATE_FORMAT(act.time, '%H:%i') AS time
                    FROM users AS us
                            JOIN activities AS act ON us.user_id = act.user_id
                    WHERE us.user_id = :user_id";

        return $this->query($query, ['user_id' => $user_id]);
    }
    public function get_user_latest_activity($user_id, $limit)
    {
        $query = "SELECT act.activities_id
                        , us.user_id
                        , act.img_src
                        , act.name
                        , act.description
                        , act.date
                        , DATE_FORMAT(act.time, '%H:%i') AS time
                FROM users AS us
                            JOIN activities AS act ON us.user_id = act.user_id
                WHERE us.user_id = :user_id
                LIMIT $limit";

        return $this->query($query, ['user_id' => $user_id]);
    }
    public function get_user_tickets($user_id)
    {
        $query = "SELECT t.label, t.icon, t.achieved FROM 
        users u 
        JOIN tickets t ON t.user_id = u.user_id
        WHERE u.user_id = :user_id";
        return $this->query($query, ['user_id' => $user_id]);
    }
    public function get_user_targets($user_id)
    {
        $query = "SELECT t.label, t.icon, t.achieved, t.goal FROM 
        users u 
        JOIN targets t ON t.user_id = u.user_id
        WHERE u.user_id = :user_id AND t.year = (YEAR(CURDATE()))";
        return $this->query($query, ['user_id' => $user_id]);
    }
    public function get_user_drafts($user_id)
    {
        $query = "SELECT d.title, d.content, d.time, d.draft_id FROM 
        users u 
        JOIN drafts d ON d.user_id = u.user_id
        WHERE u.user_id = :user_id";
        return $this->query($query, ['user_id' => $user_id]);
    }
    public function get_user_draft_by_id($draft_id)
    {
        $query = "SELECT d.title, d.content, d.time, d.draft_id FROM 
        users u 
        JOIN drafts d ON d.user_id = u.user_id
        WHERE d.draft_id = :draft_id";
        return $this->query_unique_first($query, ['draft_id' => $draft_id]);
    }
    public function get_user_widgets_by_id($user_id)
    {
        $query = "SELECT w.drafts, w.tickets, w.targets, w.quick_draft FROM 
        widgets w
        WHERE w.user_id = :user_id";
        return $this->query_unique_first($query, ['user_id' => $user_id]);
    }
    public function add_user_draft($draft)
    {
        $this->insert('drafts', $draft);
    }
    public function delete_user_draft($draft_id)
    {
        $query = "DELETE FROM drafts WHERE draft_id = :draft_id";
        $this->execute($query, ['draft_id' => $draft_id]);
    }
    public function delete_user($user_id)
    {
        $query = "DELETE FROM users WHERE user_id = :user_id";
        $this->execute($query, ['user_id' => $user_id]);
    }
    public function delete_friend($friendship_id)
    {
        // TODO send the requester_id and requested_id from js
        $get_ids = "SELECT uf.friend_id, uf.user_id FROM 
        user_friends uf
        WHERE uf.friendship_id = :friendship_id";

        $ids =  $this->query_unique_last($get_ids, ['friendship_id' => $friendship_id]);

        $change_number_of_freinds = "UPDATE users SET 
        number_of_friends = number_of_friends - 1
        WHERE user_id = :requester_id OR user_id = :requested_id";

        $this->execute($change_number_of_freinds, [
            'requester_id' => $ids['user_id'],
            'requested_id' => $ids['friend_id']
        ]);

        $delete_friend = "DELETE FROM user_friends WHERE friendship_id = :friendship_id";
        $this->execute($delete_friend, ['friendship_id' => $friendship_id]);
    }
    public function edit_user_draft($draft)
    {
        $query = "UPDATE drafts SET 
            title = :title, 
            content = :content
            WHERE draft_id = :draft_id";
        $this->execute($query, ['title' => $draft['title'], 'content' => $draft['content'], 'draft_id' => $draft['draft_id']]);
    }
    public function edit_user_info($user)
    {
        $query = "UPDATE users SET 
            name = :name, 
            phone = :phone
            WHERE user_id = :user_id";
        $this->execute($query, $user);
    }
    public function edit_user_password($user)
    {
        $query = "UPDATE users SET 
            password = :password
            WHERE user_id = :user_id";

        $this->execute($query, [
            'user_id' => $user['user_id'],
            'password' => $user['password']
        ]);
        $this->insert(
            'password_history',
            ['user_id' => $user['user_id']]
        );
    }
    public function edit_user_widgets($user)
    {
        $query = "UPDATE widgets SET";
        $data = ['user_id' => $user['user_id']];
        $setClauses = [];

        $parameters = ['drafts', 'targets', 'tickets', 'quick_draft'];
        foreach ($parameters as $param) {
            if (isset($user[$param])) {
                $setClauses[] = "$param = :$param";
                $data[$param] = $user[$param];
            }
        }
        $query .= " " . implode(",", $setClauses);
        $query .= " WHERE user_id = :user_id";

        $this->execute($query, $data);
    }
    public function editFriendRequestStatus($request)
    {
        $query = "UPDATE friend_requests SET 
            status = :status
            WHERE requester_id = :requester_id AND requested_id = :requested_id";

        $this->execute($query, [
            'requester_id' => $request['requester_id'],
            'requested_id' => $request['requested_id'],
            'status' => $request['status']
        ]);

        if ($request['status']) {
            $this->insert(
                'user_friends',
                [
                    'user_id' => $request['requester_id'],
                    'friend_id' => $request['requested_id']
                ]
            );

            $query = "UPDATE users SET 
            number_of_friends = number_of_friends + 1
            WHERE user_id = :requester_id OR user_id = :requested_id";

            $this->execute($query, [
                'requester_id' => $request['requester_id'],
                'requested_id' => $request['requested_id']
            ]);
        }
    }
}
