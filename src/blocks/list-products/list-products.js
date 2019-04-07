/* list-products ***********************/
$.fn.initListProductsView = function (indexView) {
  var productCardCol = 'product-card_col',
      listProductsCols = 'list-products_cols',
      $listProducts = $(this),
      $item = $listProducts.find('.product-card');

  if (indexView === 1) {
    $item.addClass(productCardCol);
    $listProducts.addClass(listProductsCols);
  } else {
    $item.removeClass(productCardCol);
    $listProducts.removeClass(listProductsCols);
  }
};

$(function () {
  var $listProducts = $('#list-products'),
      nameView = $listProducts.data('products-view'),
      indexView = Number(nameView === 'cols');

  $('#toggle-view-products').buttonToggle(indexView, function (index) {
    $listProducts.initListProductsView(index);
  });
});