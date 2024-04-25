<?php

require_once __DIR__ . '/BaseDao.class.php';

class ArticleDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct('articles');
    }
    public function add_article($article)
    {
        $table = $this->getTable();
        return $this->insert($table, $article);
    }
    public function get_articles()
    {
        $query = "SELECT * FROM articles";
        return $this->query($query, []);
    }
    public function get_articles_by_category($category)
    {
        $query = "SELECT * FROM articles WHERE category = :category";
        return $this->query($query, ['category' => $category]);
    }
    public function get_article_by_id($article_id)
    {
        $query = "SELECT * FROM articles WHERE article_id = :article_id";
        return $this->query_unique_first($query, ['article_id' => $article_id]);
    }
    public function delete_article($article_id)
    {
        $query = "DELETE FROM articles WHERE article_id = :article_id";
        return $this->execute($query, ['article_id' => $article_id]);
    }
    public function edit_article($article)
    {
        $query = "UPDATE articles SET 
            title = :title, 
            img_src = :img_src, 
            country = :country, 
            category = :category, 
            img_desc = :img_desc, 
            status = :status, 
            added_time = :added_time, 
            description = :description, 
            content = :content 
            WHERE article_id = :article_id";
        $this->execute($query, $article);
    }
}
