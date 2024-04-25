<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$payload = [
  'user_id' => $_REQUEST['user_id'],
  'password' => $_REQUEST['sign_up_password'],
  'email' => $_REQUEST['sign_up_email'],
  'name' => $_REQUEST['fullname']
];

$user_service = new UserService();

if ($payload['user_id'] != NULL && $payload['user_id'] != '') {
  $user = $user_service->edit_user($payload);
} else {
  unset($payload['user_id']);
  $user = $user_service->add_user($payload);
}
