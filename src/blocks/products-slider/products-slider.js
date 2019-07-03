/* products-slider ***********************/
var productsSlider;

function initProductSlider($slider) {
  var id = $slider.attr('id');
  var windowWidth = $(window).width();
  var countSlides = 1;

  id = '#' + id;

  if (windowWidth <= 767) {
    countSlides = 1.3;
  } else if (windowWidth <= 1230) {
    countSlides = 3.3;
  } else {
    countSlides = 5;
  }

  productsSlider = new Swiper(id + ' .products-slider__inner', {
    navigation: {
      nextEl: id + ' .products-slider__next',
      prevEl: id + ' .products-slider__prev',
    },
    loop: false,
    slidesPerView: countSlides
  });
}

$(function () {
  function init () {
    var $slider = $('.products-slider');

    if (!$slider.length) return;

    $slider.each(function () {
      initProductSlider($(this));
    });
  }

  $(window).on('resize', function () {
    init();
  });

  init();
});
