/* select ***********************/
$.fn.select = function () {
  $(this).each(function () {
    var placeholder = $(this).attr('placeholder');

    $(this).select2({
      placeholder: placeholder,
      minimumResultsForSearch: Infinity
    });
  });
};

$(function () {
  $('.select-single-basic').select();
});