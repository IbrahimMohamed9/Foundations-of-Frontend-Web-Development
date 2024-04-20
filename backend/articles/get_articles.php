<?php
require_once '../rest/services/ArticleService.class.php';

$payload = $_REQUEST;

$article_service = new ArticleService();

if(isset($payload['category']) && $payload['category'] != ''){
    $data = $article_service->get_articles_by_category($payload['category']);
} else {
    $data = $article_service->get_articles();
}
echo json_encode($data);
