<?php
require_once __DIR__ . '/../rest/services/ItemService.class.php';

$item_id = $_REQUEST['item_id'];

$item_service = new ItemService();
$item = $item_service->delete_item($item_id);
