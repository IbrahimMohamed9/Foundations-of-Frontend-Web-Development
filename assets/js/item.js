document.addEventListener("DOMContentLoaded", () => {
  Utils.setupModalActions();
  const item_id = new URL(window.location.href).searchParams.get("item_id");
  ItemService.loadItemPage(item_id);
  ItemService.loadMoreItems(item_id);
});
