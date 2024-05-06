<?php
require_once __DIR__ . '/../services/itemService.class.php';

Flight::set('item_service', new ItemService());

Flight::group("/items", function () {
  Flight::route('POST /add', function () {
    $payload = Flight::request()->data;

    if ($payload['item_id'] != NULL && $payload['item_id'] != '') {
      Flight::get('item_service')->edit_item($payload);
    } else {
      Flight::get('item_service')->add_item($payload);
    }

    Flight::json(
      [
        'message' => "you have successfully added the item"
      ]
    );
  });

  Flight::route('GET /@category', function ($category) {
    if (empty($category)) {
      Flight::halt(500, "Try again later");
    }

    $data = Flight::get('item_service')->get_items_by_category($category);
    Flight::json($data);
  });

  Flight::route('GET /', function () {
    $data = Flight::get('item_service')->get_items();
    Flight::json($data);
  });

  Flight::route('GET /get/@item_id', function ($item_id) {
    $item = Flight::get('item_service')->get_item_by_id($item_id);

    Flight::json(
      [
        'message' => "Item got successful",
        'data' => $item
      ]
    );
  });

  Flight::route('GET /new_packages/@limit', function ($limit) {
    //TODO fix this
    $data = Flight::get('item_service')->get_new_packages(
      [
        'category' => 'package',
        'limit' => 2
      ]
    );

    Flight::json($data);
  });

  Flight::route('DELETE /delete/@item_id', function ($item_id) {
    if (!$item_id) {
      Flight::halt(500, "Try again later");
    }
    Flight::get('item_service')->delete_item($item_id);
  });
});
