<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$draft_id = $_REQUEST['draft_id'];

$user_service = new UserService();

$user = $user_service->get_user_draft_by_id($draft_id);

header('Content-Type: application/json');
echo json_encode($user);
