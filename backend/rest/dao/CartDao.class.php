<?php

require_once __DIR__ . '/BaseDao.class.php';

class CartDao extends BaseDao
{
  public function __construct()
  {
    parent::__construct('carts');
  }
  public function add_new_cart_for_user($user_id)
  {
    $table = $this->getTable();
    return $this->insert($table, $user_id);
  }
  public function get_cart_items_by_id($user_id)
  {
    $query = "SELECT cart_id FROM carts WHERE user_id = :user_id";
    $cart_id = $this->query_unique_last($query, ['user_id' => $user_id])['cart_id'];

    $query = "SELECT ite.name,
                      ite.category,
                      ite.imgs_srcs,
                      ite.person_price,
                      ite.day_price,
                      ite.min_days,
                      ite.max_days,
                      ite.min_persons,
                      ite.max_persons,
                      car_ite.days_selected,
                      car_ite.cart_item_id, 
                      car_ite.persons_selected,
                      car_ite.item_id,
                      car_ite.cart_id
                FROM carts AS cart
                      JOIN cart_items AS car_ite ON car_ite.cart_id = cart.cart_id
                      JOIN items AS ite ON ite.item_id = car_ite.item_id
                WHERE cart.cart_id = :cart_id";
    return $this->query($query, ['cart_id' => $cart_id]);
  }
  public function get_cart_item_by_id($cart_item_id)
  {
    $query = "SELECT ite.name, 
                ite.imgs_srcs,
                ite.person_price,
                ite.day_price,
                car_ite.cart_item_id, 
                car_ite.days_selected, 
                car_ite.persons_selected 
                FROM carts AS cart
                JOIN cart_items AS car_ite ON car_ite.cart_id = cart.cart_id
                JOIN items AS ite ON ite.item_id = car_ite.item_id
                WHERE cart.cart_item_id = :cart_item_id";
    return $this->query_unique_first($query, ['cart_item_id' => $cart_item_id]);
  }
  public function get_cart_items_number_by_id($user_id)
  {
    $query = "SELECT cart_id FROM carts WHERE user_id = :user_id";
    $cart_id = $this->query_unique_last($query, ['user_id' => $user_id])['cart_id'];

    $query = "SELECT COUNT(car_ite.item_id) AS `counter`
                FROM carts AS cart
                JOIN cart_items AS car_ite ON car_ite.cart_id = cart.cart_id
                WHERE cart.cart_id = :cart_id";
    return $this->query_unique_first($query, ['cart_id' => $cart_id]);
  }
  public function delete_item_cart($cart_item_id)
  {
    $query = "DELETE FROM cart_items WHERE cart_item_id = :cart_item_id";
    return $this->execute($query, ['cart_item_id' => $cart_item_id]);
  }
  public function add_item_cart($payload)
  {
    $query = "SELECT cart_id FROM carts WHERE user_id = :user_id";
    $cart_id = $this->query_unique_last($query, ['user_id' => $payload['user_id']])['cart_id'];

    $item = [
      'cart_id' => $cart_id,
      'item_id' => $payload['item_id'],
      'days_selected' => $payload['days_selected'],
      'persons_selected' => $payload['persons_selected']
    ];
    $query = "INSERT INTO cart_items (cart_id, item_id, days_selected, persons_selected) VALUES 
      (:cart_id, :item_id, :days_selected, :persons_selected)";
    $this->execute($query, $item);
  }
  public function update_item_cart($cart)
  {
    $query = "UPDATE cart_items 
      SET days_selected = :days_selected,
      persons_selected = :persons_selected 
      WHERE cart_item_id = :cart_item_id";
    $this->execute($query, $cart);
  }
  public function check_coupon($code)
  {
    $query = "SELECT amount, percentage 
                FROM coupon
                WHERE code = :code";
    return $this->query_unique_first($query, $code);
  }
}
