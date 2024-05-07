<?php
require_once __DIR__ . '/../services/projectService.class.php';

Flight::set('project_service', new ProjectsService());

Flight::group("/projects", function () {

  /**
   * @OA\Post(
   *     path="/projects/add_user",
   *     tags={"projects"},
   *     summary="Add a user to a project",
   *     @OA\RequestBody(
   *         required=true,
   *         description="User project data",
   *         @OA\JsonContent(
   *             required={"user_id", "position"},
   *             @OA\Property(property="user_id", type="integer", example=1),
   *             @OA\Property(property="position", type="string", example="driver")
   *         )
   *     ),
   *     @OA\Parameter(
   *         name="project_id",
   *         in="query",
   *         required=true,
   *         description="ID of the project to which the user will be added",
   *         @OA\Schema(type="integer")
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="User added successfully",
   *         @OA\JsonContent(
   *             @OA\Property(property="message", type="string", example="You have successfully added the user")
   *         )
   *     )
   * )
   */
  Flight::route(
    'POST /add_user',
    function () {

      $payload = Flight::request()->data;

      $user_project =  [
        'user_id' => $payload['user_id'],
        'project_id' => Flight::request()->query['project_id'],
        'position' => $payload['position']
      ];

      Flight::get('project_service')->add_user_project($user_project);

      Flight::json(
        ['message' => "you have successfully added the user"]
      );
    }
  );

  /**
   * @OA\Post(
   *     path="/projects/add",
   *     tags={"projects"},
   *     summary="Add a new project",
   *     @OA\RequestBody(
   *         required=true,
   *         description="Project data",
   *         @OA\JsonContent(
   *             required={"user_id", "price", "position", "cart_item_id", "end_date"},
   *             @OA\Property(property="user_id", type="integer", example=1),
   *             @OA\Property(property="price", type="number", format="float", example=32.12),
   *             @OA\Property(property="position", type="string", example="customer"),
   *             @OA\Property(property="cart_item_id", type="integer", example="12"),
   *             @OA\Property(property="end_date", type="string", format="date-time", example="2021-10-09T21:42:39")
   *         )
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="Project added successfully",
   *         @OA\JsonContent(
   *             @OA\Property(property="message", type="string", example="You have successfully added the project")
   *         )
   *     )
   * )
   */
  Flight::route('POST /add', function () {
    $payload = Flight::request()->data;
    $project =  [
      'user_id' => $payload['user_id'],
      'price' => $payload['price'],
      'position' => $payload['position'],
      'cart_item_id' => $payload['cart_item_id'],
      'end_date' => $payload['end_date']
    ];

    Flight::get('project_service')->add_project($project);

    Flight::json(
      ['message' => "you have successfully added the project"]
    );
  });

  /**
   * @OA\Get(
   *     path="/projects",
   *     tags={"projects"},
   *     summary="Get all projects",
   *     @OA\Response(
   *         response=200,
   *         description="List of projects",
   *         @OA\JsonContent(type="array", @OA\Project())
   *     )
   * )
   */
  Flight::route('GET /', function () {
    $data = Flight::get('project_service')->get_projects();
    Flight::json($data);
  });

  /**
   * @OA\Get(
   *     path="/projects/get/{user_id}/{project_id}",
   *     tags={"projects"},
   *     summary="Get user project details",
   *     @OA\Parameter(
   *         name="user_id",
   *         in="path",
   *         required=true,
   *         description="ID of the user",
   *         @OA\Schema(type="integer")
   *     ),
   *     @OA\Parameter(
   *         name="project_id",
   *         in="path",
   *         required=true,
   *         description="ID of the project",
   *         @OA\Schema(type="integer")
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="User project details, if user or project does exist it will return false",
   *         @OA\JsonContent(ref="#/components/schemas/SeeUser")
   *     )
   * )
   */
  Flight::route('GET /get/@user_id/@project_id', function ($user_id, $project_id) {
    $ids = ['user_id' => $user_id, 'project_id' => $project_id];

    $user_info = Flight::get('project_service')->get_user_project($ids);

    Flight::json($user_info);
  });

  /**
   * @OA\Get(
   *     path="/projects/get/{project_id}",
   *     tags={"projects"},
   *     summary="Get project by ID",
   *     @OA\Parameter(
   *         name="project_id",
   *         in="path",
   *         required=true,
   *         description="ID of the project",
   *         @OA\Schema(type="integer")
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="Project details",
   *         @OA\JsonContent(ref="#/components/schemas/Project")
   *     )
   * )
   */
  Flight::route('GET /get/@project_id', function ($project_id) {
    $project = Flight::get('project_service')->get_project_by_id($project_id);

    Flight::json($project);
  });

  /**
   * @OA\Delete(
   *     path="/projects/delete/{project_id}",
   *     tags={"projects"},
   *     summary="Delete a project by ID",
   *     @OA\Parameter(
   *         name="project_id",
   *         in="path",
   *         required=true,
   *         description="ID of the project to delete",
   *         @OA\Schema(type="integer")
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="Project deleted successfully"
   *     )
   * )
   */
  Flight::route('DELETE /delete/@project_id', function ($project_id) {
    if (!$project_id) {
      Flight::halt(500, "Try again later");
    }
    Flight::get('project_service')->delete_projects($project_id);
  });
});

/**
 * @OA\Schema(
 *     schema="Project",
 *     description="Project sample",
 *     @OA\Property(
 *         property="project_id",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="start_date",
 *         type="string",
 *         format="date-time",
 *         example="2024-05-07 12:21:31"
 *     ),
 *     @OA\Property(
 *         property="status",
 *         type="string",
 *         example="Active"
 *     ),
 *     @OA\Property(
 *         property="project_price",
 *         type="number",
 *         format="float",
 *         example=1000.50
 *     ),
 *     @OA\Property(
 *         property="item_name",
 *         type="string",
 *         example="Item Name"
 *     ),
 *     @OA\Property(
 *         property="item_intro",
 *         type="string",
 *         example="Item Introduction"
 *     ),
 *     @OA\Property(
 *         property="project_team",
 *         type="string",
 *         example="1|Manager|John Doe|john.jpg,2|Developer|Jane Smith|jane.jpg"
 *     )
 * )
 */
