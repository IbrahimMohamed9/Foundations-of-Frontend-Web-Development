<?php
require_once __DIR__ . '/../rest/services/ItemService.class.php';

$payload = $_REQUEST;

$item_service = new ItemService();

$data = $item_service->get_new_packages($payload['limit']);

header('Content-Type: application/json');
echo json_encode($data);
