/* search-form ***********************/
// Docs: https://select2.org/
$(function () {
  var ajaxUrl = 'http://www.mocky.io/v2/5d167b840e00002332a11948',
      $select2Elm = $('#search-form'),
      inputText;

  $select2Elm.select2({
    language: 'ru',
    multiple: true,
    maximumSelectionSize: 1,
    minimumInputLength: 1,
    allowClear: false,
    dropdownCssClass: 'search-form-dropdown',
    ajax: {
      url: ajaxUrl,
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term,
        };
      },
      processResults: function (data) {
        return {
          results: data.items,
        };
      },
      cache: true
    },
    placeholder: 'Поиск среди 4500 товаров',
    templateResult: templateResult,
    templateSelection: templateSelection
  }).on("select2:closing", function (e) {
    inputText = $('.search-form .select2-search__field').val();
  }).on("select2:close", function (e) {
    setTimeout(function () {
      $select2Elm.val(inputText);
      $('#search-input').val(inputText);
      $('.search-form .select2-search__field').val(inputText);
      $('.search-form .select2-search__field').blur();
    }, 0);
  }).on("select2:selecting", function (e) {
    var data = e.params.args.data;
    window.location = data.url;
    e.preventDefault();
  });

  function templateResult (data) {
    if (data.loading) {
      return data.text;
    }

    return $('' +
      '<div class="search-form__results">' +
        '<section class="search-form__results-item">' +
          '<a class="search-form__results-photo" href="' + data.url + '"><img src="' + data.photo + '"></a>' +
          '<div class="search-form__results-inner">' +
            '<div class="search-form__results-title">' + data.name + '</div>' +
            '<div class="search-form__results-price">' +
              data.price.now  + '&nbsp;&nbsp;&nbsp;<span>' + data.price.old + '</span>' +
            '</div>' +
          '</div>' +
        '</section>' +
      '</div>' +
    '');
  }

  function templateSelection (data) {
    return data.name || data.text;
  }
});