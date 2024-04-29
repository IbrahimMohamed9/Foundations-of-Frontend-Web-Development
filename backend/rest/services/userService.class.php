<?php

require_once __DIR__ . '/../dao/UserDao.class.php';

class UserService
{
    private $user_dao;
    public function __construct()
    {
        $this->user_dao = new UserDao();
    }
    public function add_user($user)
    {
        return $this->user_dao->add_user($user);
    }
    public function add_friend_request($ids)
    {
        return $this->user_dao->add_friend_request($ids);
    }
    public function get_users()
    {
        return $this->user_dao->get_users();
    }
    public function get_user_by_id($user_id)
    {
        return $this->user_dao->get_user_by_id($user_id);
    }
    public function get_friend_requests($user_id)
    {
        return $this->user_dao->get_friend_requests($user_id);
    }
    public function get_user_activity($user_id)
    {
        return $this->user_dao->get_user_activity($user_id);
    }
    public function get_user_latest_activity($user_id, $limit)
    {
        return $this->user_dao->get_user_latest_activity($user_id, $limit);
    }
    public function get_user_targets($user_id)
    {
        return $this->user_dao->get_user_targets($user_id);
    }
    public function get_user_tickets($user_id)
    {
        return $this->user_dao->get_user_tickets($user_id);
    }
    public function get_user_drafts($user_id)
    {
        return $this->user_dao->get_user_drafts($user_id);
    }
    public function get_user_draft_by_id($draft_id)
    {
        return $this->user_dao->get_user_draft_by_id($draft_id);
    }
    public function get_user_widgets_by_id($user_id)
    {
        return $this->user_dao->get_user_widgets_by_id($user_id);
    }
    public function get_friends($user_id)
    {
        return $this->user_dao->get_friends($user_id);
    }
    public function add_user_draft($draft)
    {
        $this->user_dao->add_user_draft($draft);
    }
    public function edit_user_draft($draft)
    {
        $this->user_dao->edit_user_draft($draft);
    }
    public function edit_user_info($user)
    {
        $this->user_dao->edit_user_info($user);
    }
    public function edit_user_password($user)
    {
        $this->user_dao->edit_user_password($user);
    }
    public function edit_user_widgets($user)
    {
        $this->user_dao->edit_user_widgets($user);
    }
    public function editFriendRequestStatus($request)
    {
        $this->user_dao->editFriendRequestStatus($request);
    }
    public function delete_user_draft($draft_id)
    {
        $this->user_dao->delete_user_draft($draft_id);
    }
    public function delete_user($user_id)
    {
        $this->user_dao->delete_user($user_id);
    }
    public function delete_friend($friendship_id)
    {
        $this->user_dao->delete_friend($friendship_id);
    }
    public function user_login($email, $password)
    {
        return $this->user_dao->user_login($email, $password);
    }
}
