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