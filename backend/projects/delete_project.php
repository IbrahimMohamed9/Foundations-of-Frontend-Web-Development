<?php
require_once __DIR__ . '/../rest/services/projectService.class.php';

$projects_id = $_REQUEST['projects_id'];

$projects_service = new ProjectsService();
$projects = $projects_service->delete_projects($projects_id);

echo json_encode($projects);
