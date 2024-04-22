<?php
require_once __DIR__ . '/../rest/services/CartService.class.php';

$cart = array(
  'cart_id' => $_REQUEST['cart_id'],
  'item_id' => $_REQUEST['item_id'],
  'persons_selected' => $_REQUEST['persons_selected'],
  'days_selected' => $_REQUEST['days_selected']
);

$cart_service = new CartService();

$cart_service->update_item_cart($cart);
