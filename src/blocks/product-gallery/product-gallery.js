/* product-gallery ***********************/
$.fn.initFancyboxGallery = function (selected) {
  var blockClassName = '.product-gallery',
    $preview = $(this).find(blockClassName + '__preview'),
    $items = $(this).find(blockClassName + '__item');

  $preview.on('click', 'a', function (e) {
    e.preventDefault();

    var images = [];

    $items.each(function () {
      var $img = $(this).find('a'),
          data = {
            src: $img.attr('href'),
            opts: {
              thumb: $img.find('img').attr('src')
            }
          };

      if ($(selected).attr('href') === data.src){
        images.unshift(data);
      } else {
        images.push(data);
      }
    });

    $.fancybox.destroy();
    $.fancybox.open(images, {
      loop : true
    });
  });
};

$.fn.initProductGallery = function () {
  this.each(function () {
    var blockClassName = '.product-gallery',
      $block = $(this),
      $preview = $(this).find(blockClassName + '__preview'),
      $images = $(this).find(blockClassName + '__images'),
      $items = $(this).find(blockClassName + '__item'),
      selected;

    $images.on('click', 'a', function (e) {
      e.preventDefault();

      var $img = $(this),
        $item = $(this).closest(blockClassName + '__item'),
        active = (blockClassName + '__item_active').replace(/^\./g, '');

      $preview.empty();
      $img.clone().appendTo($preview);
      $items.removeClass(active);
      $item.addClass(active);

      selected = this;

      $block.initFancyboxGallery(selected);
    });

    $images.find('a').first().click();
  });
};

$(function () {
  $('.product-gallery').initProductGallery();
});