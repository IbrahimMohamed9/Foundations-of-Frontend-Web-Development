<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$user_id = $_REQUEST['user_id'];

$user_service = new UserService();
$friends = $user_service->get_friends($user_id);

header('Content-Type: application/json');
echo json_encode($friends);
