/* products-set ***********************/
$.fn.initProductsSet = function () {
  this.each(function () {
    var $input = $(this).find('input'),
        $sum = $(this).find('[data-sum]'),
        $saving = $(this).find('[data-saving]'),
        $total = $(this).find('[data-total]'),
        sum = 0;

    $($input).each(function () {
      if ($(this).is(':checked')) {
        sum += Number($(this).val());
      }
    });

    $input.on('change', function () {
      if ($(this).is(':checked')) {
        sum += Number($(this).val());
      } else {
        sum -= Number($(this).val());
      }

      $total.text(sum);
    });

    $total.text(sum);
  });
};

$(function () {
  $('.products-set').initProductsSet();
});