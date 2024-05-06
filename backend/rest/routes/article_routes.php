<?php
require_once __DIR__ . '/../services/ArticleService.class.php';

Flight::set('article_service', new ArticleService());

Flight::group("/articles", function () {
  Flight::route('POST /add', function () {
    $payload = Flight::request()->data;
    if (isset($payload['article_id']) && !empty($payload['article_id'])) {
      $article = Flight::get('article_service')->edit_article($payload);
    } else {
      unset($payload['article_id']);
      if (empty($payload['added_time'])) {
        unset($payload['added_time']);
      }
      $article = Flight::get('article_service')->add_article([
        'title' => $payload['title'],
        'img_src' => $payload['img_src'],
        'country' => $payload['country'],
        'category' => $payload['category'],
        'status' => $payload['status'],
        'content' => $payload['content'],
        'description' => $payload['description'],
        'img_desc' => $payload['img_desc']
      ]);
    }

    Flight::json(
      [
        'message' => "Article operation successful",
        'data' => $article
      ]
    );
  });

  Flight::route('GET /', function () {
    $category = Flight::request()->query['category'] ?? null;

    if (isset($category) && !empty($category)) {
      $data = Flight::get('article_service')->get_articles_by_category($category);
    } else {
      $data = Flight::get('article_service')->get_articles();
    }
    Flight::json($data);
  });

  Flight::route('GET /get', function () {
    $payload = Flight::request()->query;

    if (isset($payload['article_id'])) {
      $article_id = $payload['article_id'];
      $article = Flight::get('article_service')->get_article_by_id($article_id);
      Flight::json($article);
    } else {
      Flight::json(['error' => 'Article ID not provided'], 400);
    }
  });

  Flight::route('DELETE /delete/@article_id', function ($article_id) {
    if (!$article_id) {
      Flight::halt(500, "You have to provide valid article id!");
    }

    Flight::get('article_service')->delete_article($article_id);
  });
});
