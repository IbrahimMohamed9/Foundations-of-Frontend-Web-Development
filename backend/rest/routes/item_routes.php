<?php
require_once __DIR__ . '/../services/itemService.class.php';

Flight::set('item_service', new ItemService());

Flight::group("/items", function () {

  /**
   * @OA\Post(
   *      path="/items/add",
   *      tags={"items"},
   *      summary="Add or edit an item",
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(
   *              ref="#/components/schemas/Item"
   *          )
   *      ),
   *      @OA\Response(
   *          response=200,
   *          description="Item added/edited successfully",
   *          @OA\JsonContent(
   *              type="object",
   *              @OA\Property(property="message", type="string", example="You have successfully added/edited the item")
   *          )
   *      )
   * )
   */
  Flight::route('POST /add', function () {
    $payload = Flight::request()->data;

    if ($payload['item_id'] != NULL && $payload['item_id'] != '') {
      Flight::get('item_service')->edit_item($payload);
    } else {
      Flight::get('item_service')->add_item($payload);
    }

    Flight::json(
      [
        'message' => "you have successfully added the item"
      ]
    );
  });

  /**
   * @OA\Get(
   *      path="/items/{category}",
   *      tags={"items"},
   *      summary="Get items by category",
   *      @OA\Parameter(
   *          name="category",
   *          in="path",
   *          required=true,
   *          description="Category of the items",
   *          @OA\Schema(type="string")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Array of items by category",
   *           @OA\JsonContent(
   *               type="array",
   *               @OA\Items(ref="#/components/schemas/Item")
   *           )
   *      )
   * )
   */
  Flight::route('GET /@category', function ($category) {
    if (empty($category)) {
      Flight::halt(500, "Try again later");
    }

    $data = Flight::get('item_service')->get_items_by_category($category);
    Flight::json($data);
  });

  /**
   * @OA\Get(
   *      path="/items",
   *      tags={"items"},
   *      summary="Get all items",
   *      @OA\Response(
   *           response=200,
   *           description="Array of all items",
   *           @OA\JsonContent(
   *               type="array",
   *               @OA\Items(ref="#/components/schemas/Item")
   *           )
   *      )
   * )
   */
  Flight::route('GET /', function () {
    $data = Flight::get('item_service')->get_items();
    Flight::json($data);
  });

  /**
   * @OA\Get(
   *      path="/items/get/{item_id}",
   *      tags={"items"},
   *      summary="Get an item by ID",
   *      @OA\Parameter(
   *          name="item_id",
   *          in="path",
   *          required=true,
   *          description="ID of the item to retrieve",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Item retrieved successfully",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Item got successful"),
   *               @OA\Property(property="data", ref="#/components/schemas/Item")
   *           )
   *      )
   * )
   */
  Flight::route('GET /get/@item_id', function ($item_id) {
    $item = Flight::get('item_service')->get_item_by_id($item_id);

    Flight::json(
      [
        'message' => "Item got successful",
        'data' => $item
      ]
    );
  });

  /**
   * @OA\Get(
   *      path="/items/new_packages/{limit}",
   *      tags={"items"},
   *      summary="Get new packages",
   *      @OA\Parameter(
   *          name="limit",
   *          in="path",
   *          required=true,
   *          description="Limit the number of packages to retrieve",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Array of packages ordered by added time. If the limit is more than the available packages, it returns the packages in the database only",
   *           @OA\JsonContent(
   *               type="array",
   *               @OA\Items(ref="#/components/schemas/Item")
   *           )
   *      )
   * )
   */
  Flight::route('GET /new_packages/@limit', function ($limit) {
    $limit = [
      'limit' => $limit,
      'category' => 'package'
    ];
    //TODO fix this
    $data = Flight::get('item_service')->get_new_packages(
      $limit
    );

    Flight::json($data);
  });

  /**
   * @OA\Delete(
   *      path="/items/delete/{item_id}",
   *      tags={"items"},
   *      summary="Delete an item by ID",
   *      @OA\Parameter(
   *          name="item_id",
   *          in="path",
   *          required=true,
   *          description="ID of the item to delete",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Item deleted successfully"
   *      )
   * )
   */
  Flight::route('DELETE /delete/@item_id', function ($item_id) {
    if (!$item_id) {
      Flight::halt(500, "Try again later");
    }
    Flight::get('item_service')->delete_item($item_id);
  });
});

/**
 * @OA\Schema(
 *     schema="Item",
 *     description="Item table",
 *     @OA\Property(property="name", type="string", example="14 day package"),
 *     @OA\Property(property="description", type="string", example="14 day in Bosina"),
 *     @OA\Property(property="day_price", type="number", example=null),
 *     @OA\Property(property="person_price", type="number", example="23"),
 *     @OA\Property(property="stock_quantity", type="integer", example="2"),
 *     @OA\Property(property="imgs_srcs", type="string", example="Some image url"),
 *     @OA\Property(property="min_days", type="integer", example=null),
 *     @OA\Property(property="days", type="integer", example="14"),
 *     @OA\Property(property="max_days", type="integer", example=null),
 *     @OA\Property(property="min_persons", type="string", example="5"),
 *     @OA\Property(property="persons", type="string", example=null),
 *     @OA\Property(property="max_persons", type="string", example="9"),
 *     @OA\Property(property="category", type="string", example="package"),
 *     @OA\Property(property="title", type="string", example="Some item title"),
 *     @OA\Property(property="intro", type="string", example="Some item intro"),
 *     @OA\Property(property="status", type="string", example="available")
 * )
 */
