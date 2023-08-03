$(document).ready(function () {
    var offset = 100;
    var duration = 500;
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
        $(window).bind("touchend touchcancel touchleave", function(e){
            if ($(this).scrollTop() > offset) {
                $('.scroll-to-top').fadeIn(duration);
            } else {
                $('.scroll-to-top').fadeOut(duration);
            }
        });
    } else {  // general
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                $('.scroll-to-top').fadeIn(duration);
            } else {
                $('.scroll-to-top').fadeOut(duration);
            }
        });
    }
    $('.scroll-to-top').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        setTimeout(function () {
            $('.scroll-to-top')[0].style.display = 'none';
        },duration);
        return false;
    });
});

