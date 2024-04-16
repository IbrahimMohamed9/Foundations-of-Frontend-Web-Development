<?php
require_once __DIR__ . '/rest/services/ArticleService.class.php';

$article_id = $_REQUEST['article_id'];

$article_service = new ArticleService();
$article = $article_service->get_article_by_id($article_id);

// print_r($article);

header('Content-Type: application/json');
echo json_encode($article);