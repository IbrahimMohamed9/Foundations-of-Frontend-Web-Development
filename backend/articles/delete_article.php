<?php
require_once '../rest/services/ArticleService.class.php';

$article_id = $_REQUEST['article_id'];

$article_service = new ArticleService();
$article = $article_service->delete_article($article_id);

echo json_encode($article);
