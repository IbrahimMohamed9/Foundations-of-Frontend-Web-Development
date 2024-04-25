<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$email = $_REQUEST['sign_email'];
$password = $_REQUEST['signin_password'];

$user_service = new UserService();

$counter = $user_service->user_login($email, $password);

header('Content-Type: application/json');
echo json_encode($counter);
