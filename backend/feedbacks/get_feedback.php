<?php
require_once '../rest/services/FeedbackService.class.php';

$feedback_id = $_REQUEST['feedback_id'];

$feedback_service = new FeedbackService();
$feedback = $feedback_service->get_feedback_by_id($feedback_id);

header('Content-Type: application/json');
echo json_encode($feedback);