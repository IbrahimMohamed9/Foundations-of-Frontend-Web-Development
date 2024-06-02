<?php
require_once __DIR__ . '/../services/FeedbackService.class.php';

Flight::set('feedback_service', new FeedbackService());

Flight::group("/feedbacks", function () {

  /**
   * @OA\Post(
   *      path="/feedbacks/add",
   *      tags={"feedbacks"},
   *      summary="Add or edit feedback",
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(
   *              @OA\Items(ref="#/components/schemas/Feedback")
   *          )
   *      ),
   *      @OA\Response(
   *          response=200,
   *          description="Feedback added/edited successfully",
   *          @OA\JsonContent(
   *              type="object",
   *              @OA\Property(property="message", type="string", example="You have successfully added the feedback"),
   *          )
   *      )
   * )
   */
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

  /**
   * @OA\Get(
   *      path="/feedbacks",
   *      tags={"feedbacks"},
   *      summary="Get all feedbacks",
   *      security={
   *          {"ApiKey": {}}
   *      },
   *      @OA\Response(
   *           response=200,
   *           description="Array of all feedbacks",
   *           @OA\JsonContent(
   *               type="array",
   *               @OA\Items(ref="#/components/schemas/Feedback")
   *           )
   *      )
   * )
   */
  Flight::route('GET /', function () {
    $data = Flight::get('feedback_service')->get_feedbacks();
    Flight::json($data);
  });

  /**
   * @OA\Get(
   *      path="/feedbacks/get/{feedback_id}",
   *      tags={"feedbacks"},
   *      summary="Get feedback by ID",
   *      security={
   *          {"ApiKey": {}}
   *      },
   *      @OA\Parameter(
   *          name="feedback_id",
   *          in="path",
   *          required=true,
   *          description="ID of the feedback",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Feedback fetched successfully",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Feedback got successful"),
   *               @OA\Property(property="data", ref="#/components/schemas/Feedback")
   *           )
   *       ),
   * )
   */
  Flight::route('GET /get/@feedback_id', function ($feedback_id) {

    $feedback = Flight::get('feedback_service')->get_feedback_by_id($feedback_id);

    Flight::json(
      [
        'message' => "Feedback got successful",
        'data' => $feedback
      ]
    );
  });

  /**
   * @OA\Delete(
   *      path="/feedbacks/delete/{feedback_id}",
   *      tags={"feedbacks"},
   *      summary="Delete a feedback",
   *      security={
   *          {"ApiKey": {}}
   *      },
   *      @OA\Parameter(
   *          name="feedback_id",
   *          in="path",
   *          required=true,
   *          description="ID of the feedback to delete",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Feedback deleted successfully",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Feedback deleted successfully")
   *           )
   *       ),
   *      @OA\Response(
   *           response=500,
   *           description="Internal server error",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Try again later")
   *           )
   *       ),
   * )
   */
  Flight::route('DELETE /delete/@feedback_id', function ($feedback_id) {
    if (!$feedback_id) {
      Flight::halt(500, "Try again later");
    }
    Flight::get('feedback_service')->delete_feedback($feedback_id);
  });
});

/**
 * @OA\Schema(
 *     schema="Feedback",
 *     description="Feedback table",
 *     required={"name", "email", "phone", "message"},
 *     @OA\Property(property="feedback_id", type="integer", example=1, description="Feedback ID"),
 *     @OA\Property(property="name", type="string", example="Problem in add to cart", description="Name of the person giving feedback"),
 *     @OA\Property(property="email", type="string", format="email", example="example@example.com", description="Email address of the person giving feedback"),
 *     @OA\Property(property="phone", type="string", example="1234567890", description="Phone number of the person giving feedback"),
 *     @OA\Property(property="added_time", type="string", format="date-time", example="2024-12-06 12:43:00", description="Timestamp when the feedback was added"),
 *     @OA\Property(property="message", type="string", example="i can not add to cart fix it", description="Feedback message")
 * )
 */
