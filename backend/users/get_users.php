<?php
require_once __DIR__ . '/../rest/services/UserService.class.php';

$payload = $_REQUEST;

$user_service = new UserService();


$data = $user_service->get_users();

echo json_encode($data);
