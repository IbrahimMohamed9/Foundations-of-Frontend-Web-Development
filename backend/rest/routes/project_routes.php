<?php
require_once __DIR__ . '/../services/projectService.class.php';

Flight::set('project_service', new ProjectsService());

Flight::group("/projects", function () {

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

  Flight::route('GET /', function () {
    $data = Flight::get('project_service')->get_projects();
    Flight::json($data);
  });

  Flight::route('GET /get/@user_id/@project_id', function ($user_id, $project_id) {
    $ids = ['user_id' => $user_id, 'project_id' => $project_id];

    $user_info = Flight::get('project_service')->get_user_project($ids);

    Flight::json($user_info);
  });

  Flight::route('GET /get/@project_id', function ($project_id) {
    $project = Flight::get('project_service')->get_project_by_id($project_id);

    Flight::json(
      ['data' => $project]
    );
  });

  Flight::route('DELETE /delete/@project_id', function ($project_id) {
    if (!$project_id) {
      Flight::halt(500, "Try again later");
    }
    Flight::get('project_service')->delete_projects($project_id);
  });
});
