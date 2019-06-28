/* products-slider ***********************/
var productsSlider;

function initProductSlider($slider) {
  var id = $slider.attr('id');

  id = '#' + id;

  productsSlider = new Swiper(id + ' .products-slider__inner', {
    navigation: {
      nextEl: id + ' .products-slider__next',
      prevEl: id + ' .products-slider__prev',
    },
  });
}

$(function () {
  var $slider = $('.products-slider');

  $(window).on('resize', function () {
    if (!$slider.length) return;

    $slider.each(function () {
      var windowWidth = $(window).width();

      initProductSlider($(this));

      if (windowWidth <= 767) {
        productsSlider.params.slidesPerView = 1.3;
      } else if (windowWidth <= 1230) {
        productsSlider.params.slidesPerView = 3.3;
      } else {
        productsSlider.params.slidesPerView = 5;
      }
    });
  }).trigger('resize');
});
