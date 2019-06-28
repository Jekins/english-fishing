/* product-description ***********************/
$(function () {
  var block = '.product-description',
      inner = block + '__inner',
      showMore = block + '__show-more';

  $(document).on('click', showMore, function (e) {
    e.preventDefault();
    $(inner).css('height', '100%');
    $(this).hide();
  });
});