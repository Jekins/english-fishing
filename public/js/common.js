/*! Englishfishing 22-06-2019 | Front-end: Jekins */
/* button-toggle ***********************/
$.fn.buttonToggle = function (selectedIndex, cb) {
  var $block = $(this),
      $btn = $block.find('.button-toggle__btn'),
      active = 'button-toggle__btn_active';

  function selectBtn ($this) {
    $btn.removeClass(active);
    $this.addClass(active);
    cb && cb($btn.index($this));
  }

  $btn.each(function (index) {
    if (index === selectedIndex) {
      selectBtn($(this));
    }
  });

  $btn.on('click', function () {
    selectBtn($(this));
  });
};
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
/* count-switcher ***********************/
$.fn.initCountSwitcher = function () {
  this.each(function () {
    var blockClassName = '.count-switcher',
        $btnMinus = $(this).find(blockClassName + '__minus'),
        $btnPlus = $(this).find(blockClassName + '__plus'),
        $count = $(this).find(blockClassName + '__count'),
        $input = $(this).find('input'),
        price = Number($('body').find('[data-count-switcher-price]').data('count-switcher-price')),
        max = Number($('body').find('[data-count-switcher-max]').data('count-switcher-max')) || 1e9,
        sum = price,
        $sum = $('body').find('[data-count-switcher-sum] > span'),
        count = $input.val() ? Number($input.val()) - 1 : 0;

    $btnMinus.click(function (e) {
      e.preventDefault();
      if (count > 1) {
        count--;
        sum -= price;
        $count.text(count);
        $sum.text(sum);
        $input.val(sum);
      }
    });
    $btnPlus.click(function (e) {
      e.preventDefault();
      if (count === max) return;
      count++;
      sum = price * count;
      $count.text(count);
      $sum.text(sum);
      $input.val(sum);
    });

    $btnPlus.click();
  });
};

$(function () {
  $('.count-switcher').initCountSwitcher();
});
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
/* form ***********************/
$.fn.formGo = function () {
  $(this).on('click', function (e) {
    e.preventDefault();

    var blockName = '.form',
        id = '#' + $(this).data('form-go'),
        $form = $(this).closest(blockName),
        $section = $form.find(blockName + '__section');

    $section.hide();
    $form.find(id).show();
  });
};

$(function () {
  $('[data-form-go]').formGo();
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
/* list-products ***********************/
$.fn.initListProductsView = function (indexView) {
  var productCardCol = 'product-card_col',
      listProductsCols = 'list-products_cols',
      $listProducts = $(this),
      $item = $listProducts.find('.product-card');

  if (indexView === 1) {
    $item.addClass(productCardCol);
    $listProducts.addClass(listProductsCols);
  } else {
    $item.removeClass(productCardCol);
    $listProducts.removeClass(listProductsCols);
  }
};

$(function () {
  var $listProducts = $('#list-products'),
      nameView = $listProducts.data('products-view'),
      indexView = Number(nameView === 'cols');

  $('#toggle-view-products').buttonToggle(indexView, function (index) {
    $listProducts.initListProductsView(index);
  });
});
/* mobile-sidebar ***********************/
$.fn.mobileSidebarClose = function (e, blockName) {
  e.preventDefault();

  var active = blockName + '_active',
      $block = $('.' + blockName);

  $block.removeClass(active);
  $block.hide();
  $('body').removeClass('body-fixed');
};

$.fn.mobileSidebarOpen = function (e, blockName) {
  e.preventDefault();

  var active = blockName + '_active',
      $block = $('.' + blockName);

  $block.addClass(active);
  $block.show();
  $('body').addClass('body-fixed');
};

$(function () {
  var blockName = 'mobile-sidebar',
      closer = '[data-close="' + blockName + '"]',
      opener = '[data-open="' + blockName + '"]';

  $(document).on('click', closer, function (e) {
    $(this).mobileSidebarClose(e, blockName);
  });

  $(document).on('click', opener, function (e) {
    $(this).mobileSidebarOpen(e, blockName);
  });
});
/* product-gallery ***********************/
$.fn.initFancyboxGallery = function (selected) {
  var blockClassName = '.product-gallery',
    $preview = $(this).find(blockClassName + '__preview'),
    $items = $(this).find(blockClassName + '__item');

  $preview.on('click', 'a', function (e) {
    e.preventDefault();

    var images = [];

    $items.each(function () {
      var $img = $(this).find('a'),
          data = {
            src: $img.attr('href'),
            opts: {
              thumb: $img.find('img').attr('src')
            }
          };

      if ($(selected).attr('href') === data.src){
        images.unshift(data);
      } else {
        images.push(data);
      }
    });

    $.fancybox.destroy();
    $.fancybox.open(images, {
      loop : true
    });
  });
};

$.fn.initProductGallery = function () {
  this.each(function () {
    var blockClassName = '.product-gallery',
      $block = $(this),
      $preview = $(this).find(blockClassName + '__preview'),
      $images = $(this).find(blockClassName + '__images'),
      $items = $(this).find(blockClassName + '__item'),
      selected;

    $images.on('click', 'a', function (e) {
      e.preventDefault();

      var $img = $(this),
        $item = $(this).closest(blockClassName + '__item'),
        active = (blockClassName + '__item_active').replace(/^\./g, '');

      $preview.empty();
      $img.clone().appendTo($preview);
      $items.removeClass(active);
      $item.addClass(active);

      selected = this;

      $block.initFancyboxGallery(selected);
    });

    $images.find('a').first().click();
  });
};

$(function () {
  $('.product-gallery').initProductGallery();
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
/* products-set ***********************/
$.fn.initProductsSet = function () {
  this.each(function () {
    var $input = $(this).find('input'),
        $sum = $(this).find('[data-sum]'),
        $saving = $(this).find('[data-saving]'),
        $total = $(this).find('[data-total]'),
        sum = 0;

    $($input).each(function () {
      if ($(this).is(':checked')) {
        sum += Number($(this).val());
      }
    });

    $input.on('change', function () {
      if ($(this).is(':checked')) {
        sum += Number($(this).val());
      } else {
        sum -= Number($(this).val());
      }

      $total.text(sum);
    });

    $total.text(sum);
  });
};

$(function () {
  $('.products-set').initProductsSet();
});
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
    if (!$('.products-slider').length) return;

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
/* tabs ***********************/
$.fn.initTabs = function () {
  this.each(function () {
    var blockClassName = '.tabs',
        $block = $(this),
        $actions = $(this).find(blockClassName + '__actions'),
        $externalAction = $('[data-toggle="tab"]');
        $actionsItems = $actions.find(blockClassName + '__actions-item'),
        $content = $(this).find(blockClassName + '__content'),
        $contentItems = $content.find(blockClassName + '__content-item'),
        activeClassAction = (blockClassName + '__actions-item_active').replace(/^\./g,''),
        activeClassContent = (blockClassName + '__content-item_active').replace(/^\./g,'');


    $actions.on('click', 'a', function (e) {
      e.preventDefault();

      var id = $(this).attr('href');

      $contentItems.removeClass(activeClassContent);
      $content.find(id).addClass(activeClassContent);
      $actionsItems.removeClass(activeClassAction);
      $(this).closest(blockClassName + '__actions-item').addClass(activeClassAction);
    });

    $externalAction.on('click', function (e) {
      e.preventDefault();

      var $tabs = $('[href="' + $(this).attr('href') + '"]');

      $tabs.each(function () {
        if ($(this).closest(blockClassName).length) {
          $(this).click();
          $('html, body').animate({
            scrollTop: $(this).closest(blockClassName).offset().top
          }, 500);
        }
      });
    });

    $actionsItems.first().find('a').click();
  });
};

$(function () {
  $('.tabs').initTabs();
});
/* text-field ***********************/
$.fn.initTextField = function () {
  this.each(function () {
    var blockName = '.text-field',
        $block = $(this),
        $control = $block.find(blockName + '__control'),
        focused = (blockName + '_focused').replace(/^\./g,'');

    $control.focus(function () {
      $block.addClass(focused);
    });

    $control.blur(function () {
      !$control.val() && $block.removeClass(focused);
    });

    if ($control.val()) {
      $block.addClass(focused);
    }
  });
};

$(function () {
  $('.text-field').initTextField();
});