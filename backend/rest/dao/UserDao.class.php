<?php

require_once __DIR__ . '/BaseDao.class.php';

class UserDao extends BaseDao {
    public function __construct() {
        parent::__construct('users');
    }

    public function add_user($user) {
        $table = $this->getTable();
        return $this->insert($table, $user);
    }

    public function get_users() {
        $query = "SELECT * FROM users";
        return $this->query($query, []);
    }

    public function get_user_by_id($user_id) {
        $query = "SELECT *
                    FROM users
                    WHERE user_id = :user_id";
            
        return $this->query_unique_first($query, ['user_id' => $user_id]);
    }
    
    public function user_login($email, $password) {
        $query = "SELECT COUNT(user_id) AS counter
                    FROM users
                    WHERE email = :email AND password = :password";
        return $this->query_unique_first($query, ['email' => $email, 'password' => $password]);
    }

    public function get_user_activity($user_id) {
        $query = "SELECT act.activities_id
                            , us.user_id
                            , act.img_src
                            , act.name
                            , act.description
                            , act.date
                            , act.time
                    FROM users AS us
                            JOIN activities AS act ON us.user_id = act.user_id
                    WHERE us.user_id = :user_id";
            
        return $this->query($query, ['user_id' => $user_id]);
    }

    public function delete_user($user_id) {
        $query = "DELETE FROM users WHERE user_id = :user_id";
        return $this->execute($query, ['user_id' => $user_id]);
    }
    
    public function edit_user_name($user) {
        $query = "UPDATE users SET 
            name = :name, 
            WHERE user_id = :user_id";
        $this->execute($query, $user);
    }

    public function edit_user_phone($user) {
        $query = "UPDATE users SET 
            phone = :phone, 
            WHERE user_id = :user_id";
        $this->execute($query, $user);
    }
}