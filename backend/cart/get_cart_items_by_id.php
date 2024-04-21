<?php
require_once __DIR__ . '/../rest/services/CartService.class.php';

$cart_id = $_REQUEST['cart_id'];

$cart_service = new CartService();
$cart = $cart_service->get_cart_items_by_id($cart_id);

header('Content-Type: application/json');
echo json_encode($cart);