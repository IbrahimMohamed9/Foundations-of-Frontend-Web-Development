<?php
require_once __DIR__ . '/../rest/services/projectService.class.php';

$payload = $_REQUEST;

$projects_service = new ProjectsService();


$user = $projects_service->get_user_project($payload);

header('Content-Type: application/json');
echo json_encode($user);
