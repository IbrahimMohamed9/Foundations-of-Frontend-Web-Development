<?php

require_once __DIR__ . '/BaseDao.class.php';

class ItemDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('items');
    }

    public function add_item($item)
    {
        if (isset($item['category'])) {
            $category = $item['category'];

            $entity = [
                "name" => $item['name'],
                "description" => $item['description'],
                "stock_quantity" => $item['stock_quantity'],
                "imgs_srcs" => $item['imgs_srcs'],
                "category" => $item['category'],
                "title" => $item['title'],
                "intro" => $item['intro'],
                "status" => $item['status']
            ];

            switch ($category) {
                case 'package':
                    $entity["person_price"] = $item['person_price'];
                    $entity["days"] = $item['days'];
                    $entity["min_persons"] = $item['min_persons'];
                    $entity["max_persons"] = $item['max_persons'];
                    break;
                case 'car':
                    $entity["day_price"] = $item['day_price'];
                    $entity["min_days"] = $item['min_days'];
                    $entity["max_days"] = $item['max_days'];
                    $entity["persons"] = $item['persons'];
                    break;
                case 'hotel':
                    $entity["person_price"] = $item['person_price'];
                    $entity["day_price"] = $item['day_price'];
                    $entity["min_days"] = $item['min_days'];
                    $entity["max_days"] = $item['max_days'];
                    $entity["min_persons"] = $item['min_persons'];
                    $entity["max_persons"] = $item['max_persons'];
                    break;
                default:
                    return ['error' => 'Invalid category'];
            }
            if (!empty($item['added_time'])) {
                $entity["added_time"] = $item['added_time'];
            }
            return $this->insert($this->table, $entity);
        } else {
            return ['error' => 'Category is not set'];
        }
    }

    public function get_items_by_category($category)
    {
        $query = "SELECT * FROM items WHERE category = :category";
        return $this->query($query, ['category' => $category]);
    }

    public function get_new_packages($limit)
    {
        $query = "SELECT * FROM items
                    WHERE category = :category
                    ORDER BY added_time 
                    LIMIT :limit";
        return $this->query($query, $limit);
    }

    public function get_items()
    {
        $query = "SELECT * FROM items";
        return $this->query($query, []);
    }

    public function get_item_by_id($item_id)
    {
        $query = "SELECT * FROM items WHERE item_id = :item_id";
        return $this->query_unique_first($query, ['item_id' => $item_id]);
    }

    public function delete_item($item_id)
    {
        $query = "DELETE FROM items WHERE item_id = :item_id";
        return $this->execute($query, ['item_id' => $item_id]);
    }

    public function edit_item($item_id, $item)
    {
        $entity = [
            "name" => $item['name'],
            "description" => $item['description'],
            "stock_quantity" => $item['stock_quantity'],
            "imgs_srcs" => $item['imgs_srcs'],
            "category" => $item['category'],
            "title" => $item['title'],
            "intro" => $item['intro'],
            "status" => $item['status']
        ];

        switch ($item['category']) {
            case 'package':
                $entity["person_price"] = $item['person_price'];
                $entity["days"] = $item['days'];
                $entity["min_persons"] = $item['min_persons'];
                $entity["max_persons"] = $item['max_persons'];
                break;
            case 'car':
                $entity["day_price"] = $item['day_price'];
                $entity["min_days"] = $item['min_days'];
                $entity["max_days"] = $item['max_days'];
                $entity["persons"] = $item['persons'];
                break;
            case 'hotel':
                $entity["person_price"] = $item['person_price'];
                $entity["day_price"] = $item['day_price'];
                $entity["min_days"] = $item['min_days'];
                $entity["max_days"] = $item['max_days'];
                $entity["min_persons"] = $item['min_persons'];
                $entity["max_persons"] = $item['max_persons'];
                break;
            default:
                return ['error' => 'Invalid category'];
        }

        $query = "UPDATE items SET 
            name = :name, 
            description = :description, 
            stock_quantity = :stock_quantity, 
            imgs_srcs = :imgs_srcs, 
            category = :category, 
            title = :title, 
            intro = :intro, 
            status = :status";

        switch ($item['category']) {
            case 'package':
                $query .= ", days = :days, min_persons = :min_persons, max_persons = :max_persons, person_price = :person_price";
                break;
            case 'car':
                $query .= ", min_days = :min_days, max_days = :max_days, persons = :persons, day_price = :day_price";
                break;
            case 'hotel':
                $query .= ", min_days = :min_days, max_days = :max_days, min_persons = :min_persons, max_persons = :max_persons, person_price = :person_price, day_price = :day_price";
                break;
        }

        $query .= " WHERE item_id = :item_id";

        $this->execute($query, $entity + ['item_id' => $item_id]);
    }
}
