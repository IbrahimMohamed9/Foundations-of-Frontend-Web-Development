<?php
require_once __DIR__ . '/rest/services/ItemService.class.php';

$payload = $_REQUEST;

$item_service = new ItemService();

$category = $payload['category'];

$data = $item_service->get_items_by_category($category);

echo json_encode($data);
