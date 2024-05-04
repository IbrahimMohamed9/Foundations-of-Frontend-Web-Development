<?php
require_once __DIR__ . '/../rest/services/CartService.class.php';

$id = $_REQUEST;

$cart_service = new CartService();
$cart_service->add_new_cart_for_user($id);
