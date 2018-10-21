/* scroll-to ***********************/
$(function() {
  function scrollTo(el) {
    var scrollLink = el.attr('href');
    $.scrollTo(scrollLink, 500, {
      offset: -30
    });
  }

  $('.scroll-to').click(function() {
    scrollTo($(this));
    return false;
  });

  $('.scroll-to_return').click(function() {
    scrollTo($(this));
  });
});