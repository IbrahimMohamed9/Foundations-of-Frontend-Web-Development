<?php
require_once __DIR__ . '/../services/CartService.class.php';

require_once __DIR__ . '/AuthClass.class.php';
Flight::set('token', new AuthClass());
Flight::set('cart_service', new CartService());

$decoded_token = Flight::get('token')->decodeToken();
Flight::group("/carts", function () {

  /**
   * @OA\Post(
   *      path="/carts/add_item",
   *      tags={"carts"},
   *      summary="Add an item to the cart",
   *      @OA\Response(
   *           response=200,
   *           description="Item successfully added to cart",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="You have successfully added the cart")
   *           )
   *       ),
   *      @OA\RequestBody(
   *          description="Add item data payload",
   *          required={"item_id", "user_id","days_selected", "persons_selected"},
   *          @OA\JsonContent(
   *              @OA\Property(property="user_id", type="integer", example=1),
   *              @OA\Property(property="item_id", type="integer", example=1),
   *              @OA\Property(property="days_selected", type="integer", example=3),
   *              @OA\Property(property="persons_selected", type="integer", example=2)
   *          )
   *       )
   * )
   */
  Flight::route('POST /add_item', function () {
    $payload = Flight::request()->data;

    Flight::get('cart_service')->add_item_cart($payload);

    Flight::json(
      [
        'message' => "you have successfully added the cart",
      ]
    );
  });

  /**
   * @OA\Post(
   *      path="/carts/insert_cart/{user_id}",
   *      tags={"carts"},
   *      summary="Create a new cart for a user",
   *      @OA\Parameter(
   *          name="user_id",
   *          in="path",
   *          required=true,
   *          description="ID of the user",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Cart created successfully",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Cart created successfully")
   *           )
   *       ),
   * )
   */
  Flight::route('POST /insert_cart/@user_id', function ($user_id) {
    Flight::get('cart_service')->add_new_cart_for_user(['user_id' => $user_id]);
  });

  /**
   * @OA\Get(
   *      path="/carts/coupon",
   *      tags={"carts"},
   *      summary="Check coupon code",
   *      @OA\Parameter(
   *          name="code",
   *          in="query",
   *          required=true,
   *          description="Coupon code",
   *          @OA\Schema(type="string")
   *      ),
   *      @OA\Response(
   *         response=200,
   *         description="Coupon check result",
   *         @OA\JsonContent(
   *             type="object",
   *             @OA\Property(property="amount", type="number", format="integer", example="10"),
   *             @OA\Property(property="percentage", type="number", format="double", example=null)
   *         )
   *     ),
   * )
   */
  Flight::route('GET /coupon', function () {
    $code = Flight::request()->query['code'];

    $result = Flight::get('cart_service')->check_coupon($code);

    Flight::json($result);
  });

  /**
   * @OA\Get(
   *      path="/carts/get/{user_id}",
   *      tags={"carts"},
   *      summary="Get items in the cart for a user",
   *      @OA\Parameter(
   *          name="user_id",
   *          in="path",
   *          required=true,
   *          description="ID of the user",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Items fetched successfully",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Item got successful"),
   *               @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Item"))
   *           )
   *       ),
   * )
   */
  Flight::route('GET /get/@user_id', function ($user_id) {
    $cart =  Flight::get('cart_service')->get_cart_items_by_id($user_id);
    Flight::json(
      [
        'message' => "Item got successful",
        'data' => $cart
      ]
    );
  });

  /**
   * @OA\Get(
   *      path="/carts/counter/{user_id}",
   *      tags={"carts"},
   *      summary="Get number of items in the cart for a user",
   *      @OA\Parameter(
   *          name="user_id",
   *          in="path",
   *          required=true,
   *          description="ID of the user",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Count fetched successfully",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="counter", type="integer", example=2),
   *           )
   *       ),
   * )
   */
  Flight::route('GET /counter/@user_id', function ($user_id) {
    $counter =  Flight::get('cart_service')->get_cart_items_number_by_id($user_id);
    Flight::json($counter);
  });

  /**
   * @OA\Delete(
   *      path="/carts/delete/{cart_item_id}",
   *      tags={"carts"},
   *      summary="Delete an item from the cart",
   *      @OA\Parameter(
   *          name="cart_item_id",
   *          in="path",
   *          required=true,
   *          description="ID of the cart item to delete",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Item deleted successfully",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Item deleted successfully")
   *           )
   *       ),
   *      @OA\Response(
   *           response=500,
   *           description="Internal server error",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Try again later")
   *           )
   *       ),
   * )
   */
  Flight::route('DELETE /delete/@cart_item_id', function ($cart_item_id) {
    if (!$cart_item_id) {
      Flight::halt(500, "Try again later");
    }
    Flight::get('cart_service')->delete_item_cart($cart_item_id);
  });

  /**
   * @OA\Put(
   *      path="/carts/item",
   *      tags={"carts"},
   *      summary="Update an item in the cart",
   *      @OA\Parameter(
   *          name="cart_item_id",
   *          in="query",
   *          required=true,
   *          description="ID of the cart item to update",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Parameter(
   *          name="persons_selected",
   *          in="query",
   *          required=true,
   *          description="Number of persons selected",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Parameter(
   *          name="days_selected",
   *          in="query",
   *          required=true,
   *          description="Number of days selected",
   *          @OA\Schema(type="integer")
   *      ),
   *      @OA\Response(
   *           response=200,
   *           description="Cart item updated successfully",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Cart item updated successfully")
   *           )
   *       ),
   *      @OA\Response(
   *           response=500,
   *           description="Internal server error",
   *           @OA\JsonContent(
   *               type="object",
   *               @OA\Property(property="message", type="string", example="Update item cart again")
   *           )
   *       ),
   * )
   */
  Flight::route('PUT /item', function () {
    $cart_item_id = Flight::request()->query['cart_item_id'] ?? null;
    $persons_selected = Flight::request()->query['persons_selected'] ?? null;
    $days_selected = Flight::request()->query['days_selected'] ?? null;

    if (!$cart_item_id || !$persons_selected || !$days_selected) {
      Flight::halt(500, "Update item cart again");
    }

    $item = [
      'cart_item_id' => $cart_item_id,
      'persons_selected' => $persons_selected,
      'days_selected' => $days_selected
    ];

    Flight::get('cart_service')->update_item_cart($item);

    Flight::json(['message' => 'Cart item updated successfully']);
  });
});
