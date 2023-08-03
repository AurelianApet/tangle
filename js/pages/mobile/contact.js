var handleInput = function(el) {
    console.log(el.parent().focused);

    if (el.val() != "" || el.parent().focused) {
        el.parent().addClass('edited');
    } else {
        el.parent().removeClass('edited');
    }

    if(el.parent().hasClass("focused")) {
        el.parent().addClass('edited');
    }
}

$('body').on('keydown', '.input-group .contact-input', function(e) {
    handleInput($(this));
});

$('body').on('blur', '.input-group .contact-input', function(e) {
    $(this).parent().removeClass("focused");
    handleInput($(this));
});


$('body').on('focus', '.input-group .contact-input', function(e) {
    $(this).parent().addClass("focused");
    handleInput($(this));
});

$('.input-group .contact-input').each(function(){
    if ($(this).val().length > 0) {
        handelInput($(this));
    }
});