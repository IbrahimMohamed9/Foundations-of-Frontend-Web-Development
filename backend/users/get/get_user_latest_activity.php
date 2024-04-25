<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$user_id = $_REQUEST['user_id'];
$limit = $_REQUEST['limit'];

$user_service = new UserService();
$activity = $user_service->get_user_latest_activity($user_id, $limit);

header('Content-Type: application/json');
echo json_encode($activity);
