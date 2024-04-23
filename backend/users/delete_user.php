<?php
require_once __DIR__ . '/../rest/services/UserService.class.php';

$user_id = $_REQUEST['user_id'];

$user_service = new UserService();
$user = $user_service->delete_user($user_id);

echo json_encode($user);
