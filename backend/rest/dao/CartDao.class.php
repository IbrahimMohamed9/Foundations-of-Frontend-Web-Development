<?php

require_once __DIR__ . '/BaseDao.class.php';

class CartDao extends BaseDao {
  public function __construct() {
    parent::__construct('carts');
  }

  public function add_cart($cart) {
    $table = $this->getTable();
    return $this->insert($table, $cart);
  }

  public function get_cart_items_by_id($cart_id) {
    $query = "SELECT ite.name, ite.imgs_srcs, ite.price, car_ite.days, car_ite.persons 
                FROM carts AS car
                JOIN cart_items AS car_ite ON car_ite.cart_id = car.cart_id
                JOIN items AS ite ON ite.item_id = car_ite.item_id
                WHERE cart_id = :cart_id";
    return $this->query_unique($query, ['cart_id' => $cart_id]);
  }

  public function delete_item_cart($ids) {
    $query = "DELETE FROM cart_items WHERE cart_id = :cart_id AND item_id = :item_id";
    return $this->execute($query, $ids);
  }
  
  public function add_item_cart($cart) {
    $query = "INSERT INTO cart_items (cart_id, item_id, days, persons) VALUES 
    (:cart_id, :item_id, :days, :persons)";
    $this->execute($query, $cart);
  }
  public function update_item_cart($ids) {
    $query = "UPDATE cart_items 
      SET days = :days, persons = :persons 
      WHERE cart_id = :cart_id AND item_id = :item_id";
    $this->execute($query, $cart);
  }
}