<?php
require_once __DIR__ . '/rest/services/ItemService.class.php';

$item_id = $_REQUEST['item_id'];

$item_service = new ItemService();
$item = $item_service->get_item_by_id($item_id);

header('Content-Type: application/json');
echo json_encode($item);