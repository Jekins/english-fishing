/* tabs ***********************/
$.fn.initTabs = function () {
  this.each(function () {
    var blockClassName = '.tabs',
        $block = $(this),
        $actions = $(this).find(blockClassName + '__actions'),
        $externalAction = $('[data-toggle="tab"]');
        $actionsItems = $actions.find(blockClassName + '__actions-item'),
        $content = $(this).find(blockClassName + '__content'),
        $contentItems = $content.find(blockClassName + '__content-item'),
        activeClassAction = (blockClassName + '__actions-item_active').replace(/^\./g,''),
        activeClassContent = (blockClassName + '__content-item_active').replace(/^\./g,'');


    $actions.on('click', 'a', function (e) {
      e.preventDefault();

      var id = $(this).attr('href');

      $contentItems.removeClass(activeClassContent);
      $content.find(id).addClass(activeClassContent);
      $actionsItems.removeClass(activeClassAction);
      $(this).closest(blockClassName + '__actions-item').addClass(activeClassAction);
    });

    $externalAction.on('click', function (e) {
      e.preventDefault();

      var $tabs = $('[href="' + $(this).attr('href') + '"]');

      $tabs.each(function () {
        if ($(this).closest(blockClassName).length) {
          $(this).click();
          $('html, body').animate({
            scrollTop: $(this).closest(blockClassName).offset().top
          }, 500);
        }
      });
    });

    $actionsItems.first().find('a').click();
  });
};

$(function () {
  $('.tabs').initTabs();
});