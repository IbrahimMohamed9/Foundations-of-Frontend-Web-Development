<?php
require_once __DIR__ . '/rest/services/ItemService.class.php';

$payload = $_REQUEST;

$item_service = new ItemService();

if(isset($payload['category']) && $payload['category'] != ''){
    $data = $item_service->get_items_by_category($payload['category']);
} else {
    $data = $item_service->get_items();
}

echo json_encode($data);
