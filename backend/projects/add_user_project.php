<?php
require_once __DIR__ . '/../rest/services/projectService.class.php';

$payload = $_REQUEST;

$projects_service = new ProjectsService();


$projects_service->add_user_project($payload);
