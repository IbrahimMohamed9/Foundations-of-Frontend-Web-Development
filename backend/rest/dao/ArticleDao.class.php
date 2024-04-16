<?php

require_once __DIR__ . '/BaseDao.class.php';

class ArticleDao extends BaseDao {
    public function __construct() {
        parent::__construct('articles');
    }

    public function add_article($article) {
        $table = $this->getTable();

        return $this->insert($table, $article);
    }

    public function get_articles() {
        $query = "SELECT * FROM articles";
        return $this->query($query, []);
    }

    public function get_articles_by_category($category) {
        $query = "SELECT * FROM articles WHERE category = :category";
        return $this->query($query, ['category' => $category]);
    }

    public function get_article_by_id($article_id) {
        $query = "SELECT * FROM articles WHERE article_id = :article_id";
        return $this->query_unique($query, ['article_id' => $article_id]);
    }

    public function delete_article($article_id) {
        $query = "DELETE FROM articles WHERE article_id = :article_id";
        return $this->execute($query, ['article_id' => $article_id]);
    }
    
    public function edit_article($article_id, $article) {
        
        $query = "UPDATE articles SET 
            img_src = :img_src, 
            img_desc = :img_desc, 
            category = :category, 
            title = :title, 
            country = :country, 
            added_time = :added_time, 
            description = :description, 
            content = :content 
            status = :status 
            WHERE article_id = :article_id";
    
        $this->execute($query, $article);
    }
}
