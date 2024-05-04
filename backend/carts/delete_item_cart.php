<?php
require_once __DIR__ . '/../rest/services/CartService.class.php';

$cart_item_id = $_REQUEST['cart_item_id'];
$cart_service = new CartService();
$cart_service->delete_item_cart($cart_item_id);
