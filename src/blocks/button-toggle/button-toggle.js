/* button-toggle ***********************/
$.fn.buttonToggle = function (selectedIndex, cb) {
  var $block = $(this),
      $btn = $block.find('.button-toggle__btn'),
      active = 'button-toggle__btn_active';

  function selectBtn ($this) {
    $btn.removeClass(active);
    $this.addClass(active);
    cb && cb($btn.index($this));
  }

  $btn.each(function (index) {
    if (index === selectedIndex) {
      selectBtn($(this));
    }
  });

  $btn.on('click', function () {
    selectBtn($(this));
  });
};