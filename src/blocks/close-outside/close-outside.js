/* close-outside ***********************/
function closeOutside(el, activeClass) {
  $('html').on('click', function(e) {
    var target = $(e.target);

    if ($(el).hasClass(activeClass)) {
      if (target.is(el) || target.parents(el).length) {
        return;
      } else {
        $(el).removeClass(activeClass);
      }
    }
  });
}