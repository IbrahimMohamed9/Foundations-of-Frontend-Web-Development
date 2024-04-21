<?php
require_once __DIR__ . '/../rest/services/FeedbackService.class.php';

$payload = $_REQUEST;

$feedback_service = new FeedbackService();


$data = $feedback_service->get_feedbacks();

echo json_encode($data);
