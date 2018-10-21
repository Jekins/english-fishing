/* list-filters ***********************/
$.fn.listFiltersToggle = function () {
  var listFiltersClass = '.list-filters',
      $listFilters = this.closest(listFiltersClass),
      active = (listFiltersClass + '_active').replace(/\./g, '');

  this.on('click', function (e) {
    e.preventDefault();

    if ($listFilters.hasClass(active)) {
      $listFilters.removeClass(active);
    } else {
      $listFilters.addClass(active);
    }
  });


  closeOutside(listFiltersClass, active);
};

$(function () {
  $('.list-filters__activator').listFiltersToggle();
});