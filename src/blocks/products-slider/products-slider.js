/* products-slider ***********************/
var productsSlider;

function initProductSlider() {
  productsSlider = new Swiper('.products-slider__inner', {
    navigation: {
      nextEl: '.products-slider__next',
      prevEl: '.products-slider__prev',
    },
  });
}

$(function () {
  $(window).on('resize', function () {
    var windowWidth = $(window).width();

    initProductSlider();

    if (windowWidth <= 768) {
      productsSlider.params.slidesPerView = 1.3;
    } else if (windowWidth <= 1230) {
      productsSlider.params.slidesPerView = 3.3;
    } else {
      productsSlider.params.slidesPerView = 5;
    }
  }).trigger('resize');
});
