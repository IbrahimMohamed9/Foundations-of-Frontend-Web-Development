<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require_once dirname(__FILE__) . "/../config.php";

Flight::route('/*', function () {
  $noTokenNeed = [
    '/auth/signUp', '/auth/logout',

    '/feedbacks/add',

    '/items',

    '/articles/all',
  ];

  $regixArray = [
    '#^/auth/login\?email=[^&]+&password=[^&]+$#',

    '#^/items/get/(\d{1,5})$#',
    '#^/items/new_packages/(\d{1,5})$#',
    '#^/items/(hotel|car|package)$#',

    '#^/articles/get/(\d{1,5})$#',
    '#^/articles/(cities|Hotels|Tourism)$#'
  ];
  $url = Flight::request()->url;

  if (in_array($url, $noTokenNeed)) {
    return TRUE;
  } else {

    foreach ($regixArray as $pattern) {
      if (preg_match($pattern, $url)) {
        return TRUE;
      }
    }

    try {
      $token = Flight::request()->getHeader("Authentication");
      if (!$token)
        Flight::halt(401, "Unauthorized access. This will be reported to administrator!");

      $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));
      Flight::set('user', $decoded_token->user);
      Flight::set('jwt_token', $token);
      return TRUE;
    } catch (\Exception $e) {
      Flight::halt(401, $e->getMessage());
    }
  }
});

Flight::map('error', function ($e) {
  file_put_contents('logs.txt', $e . PHP_EOL, FILE_APPEND | LOCK_EX);

  Flight::halt($e->getCode(), $e->getMessage());
  Flight::stop($e->getCode());
});
