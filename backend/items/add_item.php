<?php
require_once '../rest/services/ItemService.class.php';

$payload = $_REQUEST;

$item_service = new ItemService();

if($payload['item_id'] != NULL && $payload['item_id'] != ''){
  $item = $item_service->edit_item($payload);
} else {
  $item = $item_service->add_item($payload);
}
echo json_encode(['message'=> "you have successfully added the item", 'data'=> $item]);