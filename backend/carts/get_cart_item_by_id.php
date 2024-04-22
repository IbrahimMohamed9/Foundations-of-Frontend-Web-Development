<?php
require_once __DIR__ . '/../rest/services/CartService.class.php';

$ids = $_REQUEST;

$cart_service = new CartService();
$cart = $cart_service->get_cart_item_by_id($ids);

header('Content-Type: application/json');
echo json_encode($cart);