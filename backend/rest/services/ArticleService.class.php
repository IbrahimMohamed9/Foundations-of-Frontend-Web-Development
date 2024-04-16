<?php

require_once __DIR__ . '/../dao/ArticleDao.class.php';

class ArticleService {
    private $article_dao;
    public function __construct() {
        $this->article_dao = new ArticleDao();
    }
    public function add_article($article){
        return $this->article_dao->add_article($article);
    }
    public function get_articles(){
        return $this->article_dao->get_articles();
    }
    public function get_articles_by_category($category){
        return $this->article_dao->get_articles_by_category($category);
    }
    public function get_article_by_id($article_id) {
        return $this->article_dao->get_article_by_id($article_id);
    }
    public function delete_article($article_id) {
        return $this->article_dao->delete_article($article_id);
    }
    public function edit_article($article) {
        $article_id = $article['article_id'];
        unset($article['article_id']);

        $this->article_dao->edit_article($article_id, $article);
    }
}
