<?php
require_once __DIR__ . '/../rest/services/projectService.class.php';

$projects_id = $_REQUEST['projects_id'];

$projects_service = new ProjectsService();
$projects = $projects_service->get_projects_by_id($projects_id);

// print_r($projects);

header('Content-Type: application/json');
echo json_encode($projects);