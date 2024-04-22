USE `balqan`;

select *
from items;

SELECT ite.name,
       ite.category,
       ite.imgs_srcs,
       ite.person_price,
       ite.day_price,
       ite.min_days,
       ite.max_days,
       ite.min_persons,
       ite.max_persons,
       car_ite.days_selected,
       car_ite.persons_selected,
       car_ite.item_id,
       car_ite.cart_id
FROM carts AS cart
         JOIN cart_items AS car_ite ON car_ite.cart_id = cart.cart_id
         JOIN items AS ite ON ite.item_id = car_ite.item_id
WHERE cart.cart_id = 1