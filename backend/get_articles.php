<?php
require_once __DIR__ . '/rest/services/ArticleService.class.php';

$payload = $_REQUEST;

$article_service = new ArticleService();

$data = $article_service->get_articles();

echo json_encode($data);
