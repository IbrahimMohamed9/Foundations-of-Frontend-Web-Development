<?php
require_once __DIR__ . '/../rest/services/CartService.class.php';

$payload = $_REQUEST;

$cart_service = new CartService();

$cart = $cart_service->add_item_cart($payload);

echo json_encode(['message'=> "you have successfully added the cart", 'data'=> $cart]);