<?php
require_once __DIR__ . '/../../rest/services/UserService.class.php';

$friendship_id = $_REQUEST['friendship_id'];
$user_service = new UserService();
$user_service->delete_friend($friendship_id);
