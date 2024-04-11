<?php

require_once __DIR__ . '/BaseDao.class.php';

class ItemDao extends BaseDao {
    public function __construct() {
        parent::__construct('items');
    }
}