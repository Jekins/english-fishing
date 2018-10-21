/* product-tags ***********************/
$(function () {
  var block = '.product-tags',
      btn = block + '__btn',
      item = block + '__item',
      active = (item + '_active').replace(/^\./g, '');

  $(document).on('click', btn, function (e) {
    e.preventDefault();

    var $item = $(this).closest(item),
        $control = $item.find('input');

    $(this).closest(block).find(item).removeClass(active);
    $(this).closest(item).addClass(active);
    $control.prop('checked', true);
  });
});