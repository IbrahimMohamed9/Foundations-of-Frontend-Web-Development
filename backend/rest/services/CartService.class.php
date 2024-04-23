<?php

require_once __DIR__ . '/../dao/CartDao.class.php';

class CartService {
    private $cart_dao;
    public function __construct() {
        $this->cart_dao = new CartDao();
    }
    public function add_cart($cart){
        return $this->cart_dao->add_cart($cart);
    }
    public function get_cart_item_by_id($ids) {
        return $this->cart_dao->get_cart_item_by_id($ids);
    }
    public function get_cart_items_by_id($cart_id) {
        return $this->cart_dao->get_cart_items_by_id($cart_id);
    }
    public function get_cart_items_number_by_id($cart_id) {
        return $this->cart_dao->get_cart_items_number_by_id($cart_id);
    }
    public function delete_item_cart($ids) {
        return $this->cart_dao->delete_item_cart($ids);
    }
    public function add_item_cart($cart) {
        return $this->cart_dao->add_item_cart($cart);
    }
    public function update_item_cart($cart){
        $this->cart_dao->update_item_cart($cart);
    }
    public function check_coupon($code) {
        return $this->cart_dao->check_coupon($code);
    }
}
