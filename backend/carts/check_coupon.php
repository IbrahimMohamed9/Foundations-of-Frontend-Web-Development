<?php
require_once __DIR__ . '/../rest/services/CartService.class.php';

$code = $_REQUEST;

$cart_service = new CartService();
$result = $cart_service->check_coupon($code);

header('Content-Type: application/json');
echo json_encode($result);
