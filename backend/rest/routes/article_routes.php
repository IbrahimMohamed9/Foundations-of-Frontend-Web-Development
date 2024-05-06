<?php
require_once __DIR__ . '/../services/ArticleService.class.php';

Flight::set('article_service', new ArticleService());

Flight::group("/articles", function () {

  /**
   * @OA\Get(
   *      path="/articles/all",
   *      tags={"articles"},
   *      summary="Get all articles",
   *      @OA\Response(
   *           response=200,
   *           description="Array of all articles in the databases"
   *      )
   * )
   */
  Flight::route('GET /all', function () {
    $data = Flight::get('article_service')->get_articles();
    Flight::json($data);
  });

  /**
   * @OA\Post(
   *      path="/articles/add",
   *      tags={"articles"},
   *      summary="Add or edit an article",
   *      @OA\Response(
   *           response=200,
   *           description="Article data, if ID does not exist, edit if ID exists",
   *      ),
   *      @OA\RequestBody(
   *          description="Article data payload",
   *          @OA\JsonContent(
   *              @OA\Items(ref="#/components/schemas/Article")
   *          )
   *      )
   * )
   */
  Flight::route('POST /add', function () {
    $payload = Flight::request()->data;
    if (isset($payload['article_id']) && !empty($payload['article_id'])) {
      $article = Flight::get('article_service')->edit_article($payload);
    } else {
      $article_data = [
        'title' => $payload['title'],
        'img_src' => $payload['img_src'],
        'country' => $payload['country'],
        'category' => $payload['category'],
        'status' => $payload['status'],
        'content' => $payload['content'],
        'description' => $payload['description'],
        'img_desc' => $payload['img_desc']
      ];
      if (!empty($payload['added_time'])) {
        $article_data['added_time'] = ($payload['added_time']);
      }
      $article = Flight::get('article_service')->add_article($article_data);
    }

    Flight::json(
      [
        'message' => "Article operation successful",
        'data' => $article
      ]
    );
  });

  /**
   * @OA\Get(
   *      path="/articles/{category}",
   *      tags={"articles"},
   *      summary="Get articles by category",
   *      @OA\Parameter(
   *          name="category",
   *          in="path",
   *          required=true,
   *          description="Category of the articles",
   *          @OA\Schema(type="string")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Array of articles by category",
   *           @OA\JsonContent(
   *               type="array",
   *               @OA\Items(ref="#/components/schemas/Article")
   *           )
   *      )
   * )
   */
  Flight::route('GET /@category', function ($category) {
    $data = Flight::get('article_service')->get_articles_by_category($category);
    Flight::json($data);
  });

  /**
   * @OA\Get(
   *      path="/articles/get/{article_id}",
   *      tags={"articles"},
   *      summary="Get an article by ID",
   *      @OA\Parameter(
   *          name="article_id",
   *          in="path",
   *          required=true,
   *          description="ID of the article",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *          response=200,
   *          description="Article found if ID exists, else it will return false",
   *          @OA\JsonContent(ref="#/components/schemas/Article")
   *      ),
   *      @OA\Response(
   *          response=400,
   *          description="Article ID not provided"
   *      )
   * )
   */
  Flight::route('GET /get/@article_id', function ($article_id) {
    if (!$article_id) {
      Flight::halt(400, "You have to provide valid article id!");
    }
    $article = Flight::get('article_service')->get_article_by_id($article_id);
    Flight::json($article);
  });

  /**
   * @OA\Delete(
   *      path="/articles/delete/{article_id}",
   *      tags={"articles"},
   *      summary="Delete an article",
   *      @OA\Parameter(
   *          name="article_id",
   *          in="path",
   *          required=true,
   *          description="ID of the article",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *          response=200,
   *          description="Article deleted"
   *      ),
   *      @OA\Response(
   *          response=400,
   *          description="Invalid article ID provided"
   *      )
   * )
   */
  Flight::route('DELETE /delete/@article_id', function ($article_id) {
    if (!$article_id) {
      Flight::halt(400, "You have to provide valid article id!");
    }

    Flight::get('article_service')->delete_article($article_id);
  });
});

/**
 * @OA\Schema(
 *     schema="Article",
 *     title="Article",
 *     required={"article_id", "title", "img_src", "country", "category", "status", "content", "description", "img_desc"},
 *     @OA\Property(property="article_id", type="string", example="1", description="Article ID"),
 *     @OA\Property(property="title", type="string", example="Some title", description="Article title"),
 *     @OA\Property(property="img_src", type="string", example="Some image url", description="Article image source"),
 *     @OA\Property(property="img_desc", type="string", example="Some description", description="Image Description"),
 *     @OA\Property(property="country", type="string", example="Some country name", description="Country name"),
 *     @OA\Property(property="content", type="string", example="Some content", description="Article content"),
 *     @OA\Property(property="description", type="string", example="Some description", description="Article description"),
 *     @OA\Property(property="category", type="string", example="hotels", description="Article category"),
 *     @OA\Property(property="added_time", type="string", format="date-time", example="2024-05-06 19:46:38"),
 *     @OA\Property(property="status", type="string", example="available", description="Article status")
 * )
 */
