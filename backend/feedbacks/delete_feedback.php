<?php
require_once __DIR__ . '/../rest/services/FeedbackService.class.php';

$feedback_id = $_REQUEST['feedback_id'];

$feedback_service = new FeedbackService();
$feedback = $feedback_service->delete_feedback($feedback_id);

echo json_encode($feedback);
