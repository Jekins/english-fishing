/* text-field ***********************/
$.fn.initTextField = function () {
  this.each(function () {
    var blockName = '.text-field',
        $block = $(this),
        $control = $block.find(blockName + '__control'),
        focused = (blockName + '_focused').replace(/^\./g,'');

    $control.focus(function () {
      $block.addClass(focused);
    });

    $control.blur(function () {
      !$control.val() && $block.removeClass(focused);
    });

    if ($control.val()) {
      $block.addClass(focused);
    }
  });
};

$(function () {
  $('.text-field').initTextField();
});