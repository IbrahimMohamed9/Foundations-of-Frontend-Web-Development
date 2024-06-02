<?php

require_once __DIR__ . '/../dao/FeedbackDao.class.php';

class FeedbackService
{
    private $feedback_dao;
    public function __construct()
    {
        $this->feedback_dao = new FeedbackDao();
    }
    public function add_feedback($feedback)
    {
        return $this->feedback_dao->add_feedback($feedback);
    }
    public function get_feedbacks()
    {
        return $this->feedback_dao->get_feedbacks();
    }
    public function get_feedback_by_id($feedback_id)
    {
        return $this->feedback_dao->get_feedback_by_id($feedback_id);
    }
    public function delete_feedback($feedback_id)
    {
        return $this->feedback_dao->delete_feedback($feedback_id);
    }
    public function edit_feedback($feedback)
    {
        $this->feedback_dao->edit_feedback($feedback);
    }
}
