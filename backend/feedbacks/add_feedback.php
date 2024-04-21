<?php
require_once __DIR__ . '/../rest/services/FeedbackService.class.php';

$payload = $_REQUEST;

$feedback_service = new FeedbackService();

if($payload['feedback_id'] != NULL && $payload['feedback_id'] != ''){
  $feedback = $feedback_service->edit_feedback($payload);
} else {
  unset($payload['feedback_id']);
  if(empty($payload['added_time'])){
      unset($payload['added_time']);
  }
  $feedback = $feedback_service->add_feedback($payload);
}
echo json_encode(['message'=> "you have successfully added the feedback", 'data'=> $feedback]);