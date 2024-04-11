<?php

require_once __DIR__ . '/../dao/ItemDao.class.php';

class ItemService {
  private $patient_dao;
  public function __construct() {
      $this->patient_dao = new ItemService();
  }
}