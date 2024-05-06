<?php
require_once __DIR__ . '/../services/CartService.class.php';

Flight::set('cart_service', new CartService());

Flight::group("/carts", function () {
  Flight::route('POST /add_item', function () {
    $payload = Flight::request()->data;

    Flight::get('cart_service')->add_item_cart($payload);

    Flight::json(
      [
        'message' => "you have successfully added the cart",
      ]
    );
  });

  Flight::route('POST /insert_cart/@user_id', function ($user_id) {
    Flight::get('cart_service')->add_new_cart_for_user(['user_id' => $user_id]);
  });

  Flight::route('GET /coupon', function () {
    $code = Flight::request()->query['code'];

    $result = Flight::get('cart_service')->check_coupon(
      $code
    );

    Flight::json($result);
  });

  Flight::route('GET /get/@user_id', function ($user_id) {
    $cart =  Flight::get('cart_service')->get_cart_items_by_id($user_id);
    Flight::json(
      [
        'message' => "Item got successful",
        'data' => $cart
      ]
    );
  });

  Flight::route('GET /counter/@user_id', function ($user_id) {
    $counter =  Flight::get('cart_service')->get_cart_items_number_by_id($user_id);
    Flight::json($counter);
  });

  Flight::route('DELETE /delete/@cart_item_id', function ($cart_item_id) {
    if (!$cart_item_id) {
      Flight::halt(500, "Try again later");
    }
    Flight::get('cart_service')->delete_item_cart($cart_item_id);
  });

  Flight::route('PUT /item', function () {
    $cart_item_id = Flight::request()->query['cart_item_id'] ?? null;
    $persons_selected = Flight::request()->query['persons_selected'] ?? null;
    $days_selected = Flight::request()->query['days_selected'] ?? null;

    if (!$cart_item_id || !$persons_selected || !$days_selected) {
      Flight::halt(500, "Update item cart again");
    }

    $item = [
      'cart_item_id' => $cart_item_id,
      'persons_selected' => $persons_selected,
      'days_selected' => $days_selected
    ];

    Flight::get('cart_service')->update_item_cart($item);

    Flight::json(['message' => 'Cart item updated successfully']);
  });
});
