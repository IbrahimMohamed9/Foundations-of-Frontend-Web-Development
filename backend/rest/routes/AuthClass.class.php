<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthClass
{
  function decodeToken()
  {
    try {
      $token = Flight::request()->getHeader('Authentication');
      if ($token) {
        $decoded_token = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
        return $decoded_token;
      }
    } catch (\Exception $e) {
      Flight::halt(401, 'Try again please');
    }
  }

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
}
