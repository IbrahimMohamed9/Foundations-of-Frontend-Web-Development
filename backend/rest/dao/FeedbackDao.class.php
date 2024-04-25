<?php

require_once __DIR__ . '/BaseDao.class.php';

class FeedbackDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('feedbacks');
    }

    public function add_feedback($feedback)
    {
        $table = $this->getTable();
        return $this->insert($table, $feedback);
    }

    public function get_feedbacks()
    {
        $query = "SELECT * FROM feedbacks";
        return $this->query($query, []);
    }

    public function get_feedback_by_id($feedback_id)
    {
        $query = "SELECT * FROM feedbacks WHERE feedback_id = :feedback_id";
        return $this->query_unique_first($query, ['feedback_id' => $feedback_id]);
    }

    public function delete_feedback($feedback_id)
    {
        $query = "DELETE FROM feedbacks WHERE feedback_id = :feedback_id";
        return $this->execute($query, ['feedback_id' => $feedback_id]);
    }

    public function edit_feedback($feedback)
    {
        $query = "UPDATE feedbacks SET 
            name = :name, 
            phone = :phone, 
            email = :email,
            added_time = :added_time, 
            message = :message
            WHERE feedback_id = :feedback_id";
        $this->execute($query, $feedback);
    }
}
