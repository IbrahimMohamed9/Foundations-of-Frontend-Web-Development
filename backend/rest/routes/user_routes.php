<?php
require_once __DIR__ . '/../services/UserService.class.php';

Flight::set('user_service', new UserService());

Flight::group("/users", function () {

  Flight::group("/get", function () {

    /**
     * @OA\Get(
     *     path="/users/get",
     *     summary="Get all users",
     *     tags={"Users"},
     *     @OA\Response(
     *         response=200,
     *         description="A list of users",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/User")
     *         )
     *     )
     * )
     */
    Flight::route('GET /', function () {
      $users = Flight::get('user_service')->get_users();

      Flight::json($users);
    });

    /**
     * @OA\Get(
     *     path="/users/get/requests/{user_id}",
     *     summary="Get friend requests for a user",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of friend requests, if there's no request, it will return empty array",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Requester")
     *         )
     *     )
     * )
     */
    Flight::route('GET /requests/@user_id', function ($user_id) {
      $requests = Flight::get('user_service')->get_friend_requests($user_id);

      Flight::json($requests);
    });

    /**
     * @OA\Get(
     *     path="/users/get/activity/{user_id}",
     *     summary="Get activity for a user",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User activity, if there is no activity for this user it will return empty array",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Activity")
     *         )
     *     )
     * )
     */
    Flight::route('GET /activity/@user_id', function ($user_id) {
      $activity = Flight::get('user_service')->get_user_activity($user_id);

      Flight::json($activity);
    });

    /**
     * @OA\Get(
     *     path="/users/get/user/{user_id}",
     *     summary="Get user by ID",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User data, if there is no user has this id it will return empty array",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     )
     * )
     */
    Flight::route('GET /user/@user_id', function ($user_id) {
      $user = Flight::get('user_service')->get_user_by_id($user_id);

      Flight::json($user);
    });

    /**
     * @OA\Get(
     *     path="/users/get/friends/{user_id}",
     *     summary="Get friends of a user",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of friends, it will return empty array if there is not friend for this user",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Friend")
     *         )
     *     )
     * )
     */
    Flight::route('GET /friends/@user_id', function ($user_id) {
      $friends = Flight::get('user_service')->get_friends($user_id);

      Flight::json($friends);
    });

    /**
     * @OA\Get(
     *     path="/users/get/draft/{draft_id}",
     *     summary="Get a draft by ID",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="draft_id",
     *         in="path",
     *         description="Draft ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Draft data. Returns false if no draft found for this user.",
     *         @OA\JsonContent(
     *             ref="#/components/schemas/Draft"
     *         )
     *     )
     * )
     */
    Flight::route('GET /draft/@draft_id', function ($draft_id) {
      $draft = Flight::get('user_service')->get_user_draft_by_id($draft_id);

      Flight::json($draft);
    });

    /**
     * @OA\Get(
     *     path="/users/get/drafts/{user_id}",
     *     summary="Get drafts of a user",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of drafts, if user does not have draft it will return empty array",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Draft")
     *         )
     *     )
     * )
     */
    Flight::route('GET /drafts/@user_id', function ($user_id) {
      $drafts = Flight::get('user_service')->get_user_drafts($user_id);

      Flight::json($drafts);
    });

    /**
     * @OA\Get(
     *     path="/users/get/latest_activity/{user_id}/{limit}",
     *     summary="Get latest activity of a user",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="limit",
     *         in="path",
     *         description="Number of activities",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of latest activities, if user have not activity it will return empty array",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Activity")
     *         )
     *     )
     * )
     */
    Flight::route(
      'GET /latest_activity/@user_id/@limit',
      function ($user_id, $limit) {

        $latest_activity =
          Flight::get('user_service')
          ->get_user_latest_activity($user_id, $limit);

        Flight::json($latest_activity);
      }
    );

    /**
     * @OA\Get(
     *     path="/users/get/targets/{user_id}",
     *     summary="Get targets of a user",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of targets, if there is no targets for this user it will return empty array",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Target")
     *         )
     *     )
     * )
     */
    Flight::route('GET /targets/@user_id', function ($user_id) {
      $targets = Flight::get('user_service')->get_user_targets($user_id);

      Flight::json($targets);
    });

    /**
     * @OA\Get(
     *     path="/users/get/tickets/{user_id}",
     *     summary="Get tickets of a user",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of tickets, if there is no tickets for this user it will return empty array",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Ticket")
     *         )
     *     )
     * )
     */
    Flight::route('GET /tickets/@user_id', function ($user_id) {
      $tickets = Flight::get('user_service')->get_user_tickets($user_id);

      Flight::json($tickets);
    });

    /**
     * @OA\Get(
     *     path="/users/get/widgets/{user_id}",
     *     summary="Get widgets of a user",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="path",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of widgets, if there is no widgets for this user it will return false",
     *         @OA\JsonContent(
     *             ref="#/components/schemas/Widget"
     *         )
     *     )
     * )
     */
    Flight::route('GET /widgets/@user_id', function ($user_id) {
      $widgets = Flight::get('user_service')->get_user_widgets_by_id($user_id);

      Flight::json($widgets);
    });
  });

  Flight::group("/edit", function () {

    /**
     * @OA\Put(
     *     path="/users/edit/widgets",
     *     summary="Edit user widgets",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="query",
     *         description="User id",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         ),
     *         example=1
     *     ),
     *     @OA\Parameter(
     *         name="quick_draft",
     *         in="query",
     *         description="widget name it value must be 1 for show 0 for hidden",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="drafts",
     *         in="query",
     *         description="widget name it value must be 1 for show 0 for hidden",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Widgets edited successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Widgets edited successfully")
     *         )
     *     )
     * )
     */
    Flight::route('PUT /widgets', function () {
      $payload = Flight::request()->query;

      Flight::get('user_service')->edit_user_widgets($payload);

      Flight::json(
        ['message' => "you have successfully edit the widgets"]
      );
    });

    /**
     * @OA\Post(
     *     path="/users/edit/user",
     *     summary="Edit user information",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="user_id",
     *         in="query",
     *         description="User ID",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Payload for editing user information",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="name", type="string", example="ibrahimMoheamed"),
     *             @OA\Property(property="phone", type="string", example="1234567"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User information edited successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="User information edited successfully"),
     *         )
     *     )
     * )
     */
    Flight::route('POST /user', function () {
      $payload = Flight::request()->data;

      $info = [
        'name' => $payload['name'],
        'phone' => $payload['phone'],
        'user_id' => Flight::request()->query['user_id']
      ];

      Flight::get('user_service')->edit_user_info($info);

      Flight::json(
        [
          'message' => "you have successfully edit the info"
        ]
      );
    });

    /**
     * @OA\Post(
     *     path="/users/edit/password",
     *     summary="Edit user password",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Payload for editing user password",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="password", type="string", example="123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Password edited successfully"
     *     )
     * )
     */
    //MAKE IT PUT
    Flight::route('POST /password', function () {
      $payload = Flight::request()->data;

      Flight::get('user_service')->edit_user_password($payload);
    });

    /**
     * @OA\Post(
     *     path="/users/edit/friend_request",
     *     summary="Edit friend request status",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="requester_id",
     *         in="query",
     *         description="Requester id",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="requested_id",
     *         in="query",
     *         description="Requested id",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Status of the relationship 1 for accept, 0 for decline",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Friend request status edited successfully"
     *     )
     * )
     */
    Flight::route('POST /friend_request', function () {
      $payload = Flight::request()->query;

      Flight::get('user_service')->editFriendRequestStatus($payload);
    });

    /**
     * @OA\Post(
     *     path="/users/edit/draft",
     *     summary="Edit user draft",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Payload for editing user draft",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="title", type="string", example="fix all bugs"),
     *             @OA\Property(property="content", type="string", example="i have some bugs in my page"),
     *             @OA\Property(property="draft_id", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Draft edited successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Draft edited successfully"),
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Draft")
     *         )
     *     )
     * )
     */
    //MAKE IT PUT
    Flight::route('POST /draft', function () {
      $payload = Flight::request()->data;

      $draft = [
        'title' => $payload['title'],
        'content' => $payload['content'],
        'draft_id' => $payload['draft_id']
      ];


      Flight::get('user_service')->edit_user_draft($draft);

      Flight::json(
        [
          'message' => "you have successfully added the draft",
          'data' => $payload
        ]
      );
    });
  });

  Flight::group("/delete", function () {
    //done
    Flight::route('DELETE /draft/@draft_id', function ($draft_id) {
      if (!$draft_id) {
        Flight::halt(500, "Try again later");
      }
      Flight::get('user_service')->delete_user_draft($draft_id);
    });

    Flight::route('DELETE /friend/@friendship_id', function ($friendship_id) {
      if (!$friendship_id) {
        Flight::halt(500, "Try again later");
      }
      Flight::get('user_service')->delete_friend($friendship_id);
    });

    Flight::route('DELETE /user/@user_id', function ($user_id) {
      if (!$user_id) {
        Flight::halt(500, "Try again later");
      }
      Flight::get('user_service')->delete_user($user_id);
    });
  });

  Flight::group("/add", function () {
    Flight::route('POST /draft', function () {
      $payload = Flight::request()->data;

      $draft = [
        'title' => $payload['title'],
        'content' => $payload['content'],
        'user_id' => Flight::request()->query['user_id']
      ];


      Flight::get('user_service')->add_user_draft($draft);

      Flight::json(
        ['message' => "you have successfully added the draft"]
      );
    });

    Flight::route('POST /friend_request', function () {
      $request = [
        'requester_id' => Flight::request()->query['requester_id'],
        'requested_id' => Flight::request()->data['requested_id']
      ];

      Flight::get('user_service')->add_friend_request($request);

      Flight::json(
        ['message' => "you have successfully added the request"]
      );
    });

    Flight::route('POST /user', function () {
      $payload = Flight::request()->data;

      $user = [
        'password' => $payload['password'],
        'email' => $payload['email'],
        'name' => $payload['name']
      ];

      Flight::get('user_service')->add_user($user);

      Flight::json(
        ['message' => "you have successfully added the request"]
      );
    });
  });

  Flight::route('GET /login', function () {
    $payload = Flight::request()->query;

    $email = $payload['sign_email'];
    $password = $payload['signin_password'];


    $counter = Flight::get('user_service')->user_login($email, $password);

    Flight::json($counter);
  });
});

/**
 * @OA\Schema(
 *     schema="Target",
 *     title="Target",
 *     description="Target model",
 *     @OA\Property(
 *         property="label",
 *         type="string",
 *         description="Target label",
 *         example="Sales Target"
 *     ),
 *     @OA\Property(
 *         property="icon",
 *         type="string",
 *         description="Target icon class",
 *         example="fa-dollar-sign"
 *     ),
 *     @OA\Property(
 *         property="achieved",
 *         type="float",
 *         description="Achieved goal from the target",
 *         example=2500.00
 *     ),
 *     @OA\Property(
 *         property="goal",
 *         type="float",
 *         description="Target goal",
 *         example=5000.00
 *     )
 * )
 */

/**
 * @OA\Schema(
 *     schema="Ticket",
 *     title="Ticket",
 *     description="Ticket model",
 *     @OA\Property(
 *         property="label",
 *         type="string",
 *         description="Ticket label",
 *         example="Tourist Group"
 *     ),
 *     @OA\Property(
 *         property="icon",
 *         type="string",
 *         description="Ticket icon class",
 *         example="fa-users-rays"
 *     ),
 *     @OA\Property(
 *         property="achieved",
 *         type="float",
 *         description="Achieved goal from the ticket",
 *         example=50.00
 *     )
 * )
 */
/**
 * @OA\Schema(
 *     schema="Friend",
 *     title="Friend",
 *     description="Friend info",
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Friend's name",
 *         example="John Doe"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         description="Friend's email",
 *         example="john@example.com"
 *     ),
 *     @OA\Property(
 *         property="user_id",
 *         type="integer",
 *         description="Friend's user ID",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="phone",
 *         type="string",
 *         description="Friend's phone number",
 *         example="123456789"
 *     ),
 *     @OA\Property(
 *         property="img",
 *         type="string",
 *         description="Friend's image",
 *         example="some url image"
 *     ),
 *     @OA\Property(
 *         property="joined_date",
 *         type="string",
 *         format="date-time",
 *         description="Friend's joined date",
 *         example="2024-05-07 12:33:42"
 *     ),
 *     @OA\Property(
 *         property="job_title",
 *         type="string",
 *         description="Friend's job title",
 *         example="Developer"
 *     ),
 *     @OA\Property(
 *         property="level",
 *         type="integer",
 *         description="Friend's level",
 *         example=12
 *     ),
 *     @OA\Property(
 *         property="ratings",
 *         type="string",
 *         description="Friend's ratings",
 *         example="2 4 5 1 4.3"
 *     ),
 *     @OA\Property(
 *         property="friendship_id",
 *         type="integer",
 *         description="Friendship ID",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="gender",
 *         type="string",
 *         description="Friend's gender",
 *         example="Male"
 *     ),
 *     @OA\Property(
 *         property="projects",
 *         type="integer",
 *         description="Number of projects",
 *         example=3
 *     ),
 *     @OA\Property(
 *         property="number_of_friends",
 *         type="integer",
 *         description="Number of friends",
 *         example=5
 *     )
 * )
 */

/**
 * @OA\Schema(
 *     schema="Draft",
 *     title="Draft",
 *     description="Draft table",
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         description="Draft title",
 *         example="Draft Title"
 *     ),
 *     @OA\Property(
 *         property="content",
 *         type="string",
 *         description="Draft content",
 *         example="Draft Content"
 *     ),
 *     @OA\Property(
 *         property="time",
 *         type="string",
 *         description="Draft time",
 *         example="2024-05-07 13:30:00"
 *     ),
 *     @OA\Property(
 *         property="draft_id",
 *         type="integer",
 *         description="Draft ID",
 *         example=1
 *     )
 * )
 */


/**
 * @OA\Schema(
 *     schema="Activity",
 *     title="Activity",
 *     description="Activity model",
 *     @OA\Property(
 *         property="activities_id",
 *         type="integer",
 *         description="Activity ID",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="user_id",
 *         type="integer",
 *         description="User ID",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="img_src",
 *         type="string",
 *         description="Image source",
 *         example="some image url"
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Activity name",
 *         example="Activity Name"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         description="Activity description",
 *         example="Activity Description"
 *     ),
 *     @OA\Property(
 *         property="date",
 *         type="string",
 *         format="date",
 *         description="Activity date",
 *         example="2024-05-07"
 *     ),
 *     @OA\Property(
 *         property="time",
 *         type="string",
 *         description="Activity time (HH:MM:SS)",
 *         example="13:30:32"
 *     )
 * )
 */


/**
 * @OA\Schema(
 *     schema="Requester",
 *     title="Friend requester",
 *     description="Friend requester info",
 *     @OA\Property(
 *         property="user_id",
 *         type="integer",
 *         description="User ID",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="User's name",
 *         example="John Doe"
 *     ),
 *     @OA\Property(
 *         property="img",
 *         type="string",
 *         description="User's image",
 *         example="user.jpg"
 *     ),
 *     @OA\Property(
 *         property="job_title",
 *         type="string",
 *         description="User's job title",
 *         example="Developer"
 *     )
 * )
 */

/**
 * @OA\Schema(
 *     schema="User",
 *     title="User",
 *     description="User info",
 *     @OA\Property(
 *         property="user_id",
 *         type="integer",
 *         description="User ID",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="joined_date",
 *         type="string",
 *         format="date-time",
 *         description="Date when the user joined",
 *         example="2024-05-07 12:00:00"
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="User's name",
 *         example="John Doe"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         format="email",
 *         description="User's email",
 *         example="john@example.com"
 *     ),
 *     @OA\Property(
 *         property="img",
 *         type="string",
 *         description="User's image",
 *         example="user.jpg"
 *     ),
 *     @OA\Property(
 *         property="DOB",
 *         type="string",
 *         format="date",
 *         description="User's date of birth",
 *         example="1990-01-01"
 *     ),
 *     @OA\Property(
 *         property="phone",
 *         type="string",
 *         description="User's phone number",
 *         example="123456789"
 *     ),
 *     @OA\Property(
 *         property="country",
 *         type="string",
 *         description="User's country",
 *         example="United States"
 *     ),
 *     @OA\Property(
 *         property="job_title",
 *         type="string",
 *         description="User's job title",
 *         example="Developer"
 *     ),
 *     @OA\Property(
 *         property="YOE",
 *         type="integer",
 *         description="User's years of experience",
 *         example=5
 *     ),
 *     @OA\Property(
 *         property="level",
 *         type="integer",
 *         description="User's level",
 *         example=12
 *     ),
 *     @OA\Property(
 *         property="number_of_friends",
 *         type="integer",
 *         description="Number of user's friends",
 *         example=10
 *     ),
 *     @OA\Property(
 *         property="gender",
 *         type="string",
 *         description="User's gender",
 *         example="Male"
 *     ),
 *     @OA\Property(
 *         property="nationality",
 *         type="string",
 *         description="User's nationality",
 *         example="American"
 *     ),
 *     @OA\Property(
 *         property="skills",
 *         type="string",
 *         description="User's skills",
 *         example="PHP, JavaScript, HTML"
 *     ),
 *     @OA\Property(
 *         property="ratings",
 *         type="string",
 *         description="User's ratings",
 *         example="2 4 5 1 4.3"
 *     )
 * )
 */

/**
 * @OA\Schema(
 *     schema="SeeUser",
 *     title="User in modal",
 *     description="User model for viewing a user's info",
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         example="John Doe"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         format="email",
 *         example="john@example.com"
 *     ),
 *     @OA\Property(
 *         property="user_id",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="phone",
 *         type="string",
 *         example="123456789"
 *     ),
 *     @OA\Property(
 *         property="img",
 *         type="string",
 *         example="user.jpg"
 *     ),
 *     @OA\Property(
 *         property="joined_date",
 *         type="string",
 *         format="date",
 *         example="2024-05-07"
 *     ),
 *     @OA\Property(
 *         property="job_title",
 *         type="string",
 *         example="Developer"
 *     ),
 *     @OA\Property(
 *         property="level",
 *         type="integer",
 *         example=12
 *     ),
 *     @OA\Property(
 *         property="ratings",
 *         type="string",
 *         example="2 4 5 1 4.3"
 *     ),
 *     @OA\Property(
 *         property="gender",
 *         type="string",
 *         example="Male"
 *     ),
 *     @OA\Property(
 *         property="projects",
 *         type="integer",
 *         example=3
 *     )
 * )
 */
