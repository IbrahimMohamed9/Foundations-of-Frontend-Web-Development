<?php
require_once __DIR__ . '/../rest/services/ArticleService.class.php';

$payload = $_REQUEST;

$article_service = new ArticleService();

// print_r($payload);

if($payload['article_id'] != NULL && $payload['article_id'] != ''){
    $article = $article_service->edit_article($payload);
} else {
    unset($payload['article_id']);
    if(empty($payload['added_time'])){
        unset($payload['added_time']);
    }
    $article = $article_service->add_article($payload);
}
echo json_encode(['message'=> "you have successfully added the article", 'data'=> $article]);