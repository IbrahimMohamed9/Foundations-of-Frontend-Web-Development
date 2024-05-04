<?php
require_once __DIR__ . '/../rest/services/projectService.class.php';

$payload = $_REQUEST;

$projects_service = new ProjectsService();

if (isset($payload['category']) && $payload['category'] != '') {
    $data = $projects_service->get_projects_by_category($payload['category']);
} else {
    $data = $projects_service->get_projects();
}

header('Content-Type: application/json');
echo json_encode($data);
