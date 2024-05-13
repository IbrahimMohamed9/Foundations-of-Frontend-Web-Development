<?php

require_once __DIR__ . '/../services/AuthService.class.php';
require_once __DIR__ . '/AuthClass.class.php';

Flight::set('auth_service', new AuthService());
Flight::set('token', new AuthClass());
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

    $token = Flight::get('token')->generateToken($user);

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

    $token = Flight::get('token')->generateToken($user);

    Flight::json([
      'user' => array_merge($user, ['token' => $token])
    ]);
  });

  /**
   * @OA\Post(
   *      path="/auth/logout",
   *      tags={"auth"},
   *      summary="Logout from system",
   *      security={
   *          {"ApiKey": {}}
   *      },
   *      @OA\Response(
   *           response=200,
   *           description="Success response or 'Try again please' "
   *      ),
   * )
   */
  Flight::route('POST /logout', function () {
    $decoded_token = Flight::get('token')->decodeToken();

    Flight::json([
      'jwt_decoded' => $decoded_token
    ]);
  });
});
