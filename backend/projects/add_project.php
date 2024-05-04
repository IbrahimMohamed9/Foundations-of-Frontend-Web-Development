<?php
require_once __DIR__ . '/../rest/services/projectService.class.php';

$payload = $_REQUEST;

$projects_service = new ProjectsService();

if ($payload['projects_id'] != NULL && $payload['projects_id'] != '') {
    $projects = $projects_service->edit_projects($payload);
} else {
    $projects = $projects_service->add_project($payload);
}
