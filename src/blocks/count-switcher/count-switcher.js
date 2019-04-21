/* count-switcher ***********************/
$.fn.initCountSwitcher = function () {
  this.each(function () {
    var blockClassName = '.count-switcher',
        $btnMinus = $(this).find(blockClassName + '__minus'),
        $btnPlus = $(this).find(blockClassName + '__plus'),
        $count = $(this).find(blockClassName + '__count'),
        $input = $(this).find('input'),
        price = Number($('body').find('[data-count-switcher-price]').data('count-switcher-price')),
        max = Number($('body').find('[data-count-switcher-max]').data('count-switcher-max')) || 1e9,
        sum = price,
        $sum = $('body').find('[data-count-switcher-sum] > span'),
        count = $input.val() ? Number($input.val()) - 1 : 0;

    $btnMinus.click(function (e) {
      e.preventDefault();
      if (count > 1) {
        count--;
        sum -= price;
        $count.text(count);
        $sum.text(sum);
        $input.val(sum);
      }
    });
    $btnPlus.click(function (e) {
      e.preventDefault();
      if (count === max) return;
      count++;
      sum = price * count;
      $count.text(count);
      $sum.text(sum);
      $input.val(sum);
    });

    $btnPlus.click();
  });
};

$(function () {
  $('.count-switcher').initCountSwitcher();
});