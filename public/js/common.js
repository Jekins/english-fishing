/*! Englishfishing 21-10-2018 | Front-end: Jekins */
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
/* product-tags ***********************/
$(function () {
  var block = '.product-tags',
      btn = block + '__btn',
      item = block + '__item',
      active = (item + '_active').replace(/^\./g, '');

  $(document).on('click', btn, function (e) {
    e.preventDefault();

    var $item = $(this).closest(item),
        $control = $item.find('input');

    $(this).closest(block).find(item).removeClass(active);
    $(this).closest(item).addClass(active);
    $control.prop('checked', true);
  });
});
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