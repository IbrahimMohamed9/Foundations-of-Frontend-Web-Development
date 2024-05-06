<?php
require_once __DIR__ . '/../services/FeedbackService.class.php';

Flight::set('feedback_service', new FeedbackService());

Flight::group("/feedbacks", function () {
  Flight::route('POST /add', function () {

    $payload = Flight::request()->data;

    $feedbake = [
      'name' => $payload['name'],
      'phone' => $payload['phone'],
      'email' => $payload['email'],
      'message' => $payload['message'],
      'feedback_id' => $payload['feedback_id'],
      'added_time' => $payload['added_time'],
    ];

    if ($feedbake['feedback_id'] != NULL && $feedbake['feedback_id'] != '') {
      Flight::get('feedback_service')->edit_feedback($feedbake);
    } else {
      unset($feedbake['feedback_id']);
      unset($feedbake['added_time']);
      Flight::get('feedback_service')->add_feedback($feedbake);
    }

    Flight::json(
      ['message' => "you have successfully added the feedback"]
    );
  });

  Flight::route('GET /', function () {
    $data = Flight::get('feedback_service')->get_feedbacks();
    Flight::json($data);
  });

  Flight::route('GET /get/@feedback_id', function ($feedback_id) {

    $feedback = Flight::get('feedback_service')->get_feedback_by_id($feedback_id);

    Flight::json(
      [
        'message' => "Feedback got successful",
        'data' => $feedback
      ]
    );
  });

  Flight::route('DELETE /delete/@feedback_id', function ($feedback_id) {
    if (!$feedback_id) {
      Flight::halt(500, "Try again later");
    }
    Flight::get('feedback_service')->delete_feedback($feedback_id);
  });
});
