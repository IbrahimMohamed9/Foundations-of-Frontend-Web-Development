<?php
require_once __DIR__ . '/../rest/services/CartService.class.php';

$ids = array(
  'cart_id' => $_REQUEST['cart_id'],
  'item_id' => $_REQUEST['item_id']
);

$cart_service = new CartService();
$cart = $cart_service->update_item_cart($ids);

echo json_encode($cart);
