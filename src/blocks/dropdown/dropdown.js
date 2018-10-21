/* dropdown ***********************/
$.fn.dropdown = function () {
  $(this).each(function () {
    var dropdownClass = '.dropdown',
        $link = $(this).find(dropdownClass + '__link'),
        active = (dropdownClass +'_active').replace(/^\./g,'');

    $link.click(function(e) {
      e.preventDefault();

      var $this = $(this),
        $thisDropdown = $this.parents(dropdownClass);

      if ($thisDropdown.hasClass(active)) {
        $thisDropdown.removeClass(active);
      } else {
        $thisDropdown.addClass(active);
      }

      return false;
    });

    closeOutside(dropdownClass, active);
  });
};

$(function() {
  $('.dropdown').dropdown();
});