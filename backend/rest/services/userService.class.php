<?php

require_once __DIR__ . '/../dao/UserDao.class.php';

class UserService {
    private $user_dao;
    public function __construct() {
        $this->user_dao = new UserDao();
    }
    public function add_user($user){
        return $this->user_dao->add_user($user);
    }
    public function get_users(){
        return $this->user_dao->get_users();
    }
    public function get_user_by_id($user_id) {
        return $this->user_dao->get_user_by_id($user_id);
    }
    public function get_user_activity($user_id) {
        return $this->user_dao->get_user_activity($user_id);
    }
    public function delete_user($user_id) {
        return $this->user_dao->delete_user($user_id);
    }
    public function edit_user($user) {
        $this->user_dao->edit_user($user);
    }

    public function user_login($email, $password) {
        return $this->user_dao->user_login($email, $password);
    }
}
