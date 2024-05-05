<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$payload = [
  'password' => $_REQUEST['password'],
  'email' => $_REQUEST['email'],
  'name' => $_REQUEST['name']
];

$user_service = new UserService();


$user = $user_service->add_user($payload);
