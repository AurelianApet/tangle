/*
var clock_1 = 9 * 60;
var clock_2 = 12 * 60;
var clock_3 = 8 * 60;
var clock_4 = 10 * 60;

setInterval(function () {
    timeconver(clock_1,'clock1');
    timeconver(clock_2,'clock2');
    timeconver(clock_3,'clock3');
    timeconver(clock_4,'clock4');
    clock_1--;
    clock_2--;
    clock_3--;
    clock_4--;
},1000);

function timeconver(seconds, id) {
    if (seconds > 0) {
        var minute = Math.floor(seconds / 60);
        var second = seconds % 60;
        for (let i = 0 ; i < $('.'+id).length; i++) {
            if (minute < 10) {
                minute = '0' + Number(minute);
            }
            if (second == 0) {
                second = '00';
            } else if (second < 10) {
                second = '0' + Number(second);
            }
            $('.'+id)[i].innerHTML = minute + ':' + second;
        }
    }
}
 */
$('.owl-carousel').owlCarousel({
    margin: 0,
    loop: true,
    autoWidth: true,
    // autoplay: true,
    items: 4,
    nextArrow: false
});
let isPleft = true;
let pleft = 130;
// setTimeout(function () {
//     if (isPleft) {
//         // $('.recipes-group')[0].style.paddingLeft = 0;
//         let dleft = setInterval(function () {
//             if (pleft > -300) {
//                 pleft -= 10;
//                 $('.carousel-group')[0].style.marginLeft = pleft + 'px';
//             } else {
//                 clearInterval(dleft)
//             }
//         },5);
//         isPleft = false;
//     }
// },2500);
$('.owl-stage').on('touchstart',function () {
     if (isPleft) {
         let dleft = setInterval(function () {
             if (pleft > -550) {
                 pleft -= 10;
                 $('.carousel-group')[0].style.marginLeft = pleft + 'px';
             } else {
                 clearInterval(dleft)
             }
         },15);
         isPleft = false;
     }
});

(function($) {
    var h = $('.carousel-group').height();
    var item_h = $('.owl-item').height();
    $('.recipes-group-line').css('margin-top', -h + item_h / 2);
})(jQuery);
