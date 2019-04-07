/* promo-block-slider ***********************/
if (document.querySelector('.promo-block-slider')) {
  var promoBlockSlider = new Swiper('.promo-block-slider', {
    navigation: {
      nextEl: '.promo-block-slider__next',
      prevEl: '.promo-block-slider__prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true
  });
}