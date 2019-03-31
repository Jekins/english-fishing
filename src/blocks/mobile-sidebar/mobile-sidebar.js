/* mobile-sidebar ***********************/
$.fn.mobileSidebarClose = function (e, blockName) {
  e.preventDefault();

  var active = blockName + '_active',
      $block = $('.' + blockName);

  $block.removeClass(active);
  $block.hide();
  $('body').removeClass('body-fixed');
};

$.fn.mobileSidebarOpen = function (e, blockName) {
  e.preventDefault();

  var active = blockName + '_active',
      $block = $('.' + blockName);

  $block.addClass(active);
  $block.show();
  $('body').addClass('body-fixed');
};

$(function () {
  var blockName = 'mobile-sidebar',
      closer = '[data-close="' + blockName + '"]',
      opener = '[data-open="' + blockName + '"]';

  $(document).on('click', closer, function (e) {
    $(this).mobileSidebarClose(e, blockName);
  });

  $(document).on('click', opener, function (e) {
    $(this).mobileSidebarOpen(e, blockName);
  });
});