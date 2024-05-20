<?php

require_once __DIR__ . '/../services/AuthService.class.php';

use Firebase\JWT\JWT;

Flight::set('auth_service', new AuthService());
Flight::set('user_service', new UserService());

Flight::group('/auth', function () {

  /**
   * @OA\Post(
   *      path="/auth/login",
   *      tags={"auth"},
   *      summary="Login to system",
   *      @OA\Response(
   *           response=200,
   *           description="User data and JWT token"
   *      ),
   *     @OA\Parameter(
   *         name="email",
   *         in="query",
   *         description="email of the user",
   *         required=true,
   *         @OA\Schema(
   *             type="string"
   *         ),
   *         example="i@b.n"
   *     ),
   *     @OA\Parameter(
   *         name="password",
   *         in="query",
   *         description="password of the user",
   *         required=true,
   *         @OA\Schema(
   *             type="string"
   *         ),
   *         example="1234"
   *     )
   * )
   */
  Flight::route('POST /login', function () {
    $payload = Flight::request()->query;
    $user = Flight::get('auth_service')->get_user_by_email($payload['email']);

    if (!$user || $payload['password'] !== $user['password'])
      Flight::halt(500, "Invalid username or password");

    $token = generateToken($user);

    Flight::json([
      'user' => array_merge($user, ['token' => $token])
    ]);
  });

  /**
   * @OA\Post(
   *     path="/auth/signUp",
   *     tags={"auth"},
   *     summary="Add a user",
   *     description="Adds a new user",
   *     @OA\RequestBody(
   *         required=true,
   *         description="User object",
   *         @OA\JsonContent(
   *             required={"password", "email", "name"},
   *             @OA\Property(property="email", type="string", example="example@example.com"),
   *             @OA\Property(property="password", type="string", example="3123112"),
   *             @OA\Property(property="name", type="string", example="ibrahim Mohamed")
   *         )
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="User added successfully"
   *     )
   * )
   */
  Flight::route('POST /signUp', function () {
    $payload = Flight::request()->data;

    $data = [
      'password' => $payload['password'],
      'email' => $payload['email'],
      'name' => $payload['name']
    ];

    $user = Flight::get('user_service')->add_user($data);

    $token = generateToken($user);

    Flight::json([
      'user' => array_merge($user, ['token' => $token])
    ]);
  });
});

function generateToken($user)
{
  unset($user['password']);
  $payload = [
    'user' => $user,
    'iat' => time(),
    'exp' => time() + 1296000
  ];

  $token = JWT::encode(
    $payload,
    JWT_SECRET,
    'HS256'
  );

  return $token;
}
