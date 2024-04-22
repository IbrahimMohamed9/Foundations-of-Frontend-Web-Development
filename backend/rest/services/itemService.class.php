<?php

require_once __DIR__ . '/../dao/ItemDao.class.php';

class ItemService {
  private $item_dao;
  public function __construct() {
      $this->item_dao = new ItemDao();
  }
  public function add_item($item){
    return $this->item_dao->add_item($item);
  }
  public function get_items_by_category($category){
    return $this->item_dao->get_items_by_category($category);
  }
  public function get_items(){
    return $this->item_dao->get_items();
  }
  public function get_item_by_id($item_id) {
    return $this->item_dao->get_item_by_id($item_id);
  }
  public function delete_item($item_id) {
    return $this->item_dao->delete_item($item_id);
  }
  public function edit_item($item) {
    $item_id = $item['item_id'];
    unset($item['item_id']);
    $this->item_dao->edit_item($item_id, $item);
  }
}
