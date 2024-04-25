<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$user_id = $_REQUEST['user_id'];

$user_service = new UserService();
$activity = $user_service->get_user_drafts($user_id);

header('Content-Type: application/json');
echo json_encode($activity);
