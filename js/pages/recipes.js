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
    // autoplay: true,
    autoWidth: true,
    items: 4,
    nextArrow: false,
});

function animateWave(canvasName, color, speed, height) {
    var canvas = document.getElementById(canvasName);

    canvas.width = 1920;
    canvas.height = height;

    var context = canvas.getContext("2d");

    var step, x, y, i;
    var width = canvas.width;
    // var height = canvas.height;

    var waves = [{
        W: 0.02,
        T0: 1.2,
        A: 20,
        V: -0.0184159129
    },
        {
            W: 0.0005,
            T0: 0.6,
            A: 15,
            V: -0.0111235123
        },
        {
            W: 0.014,
            T0: -0.0,
            A: 20,
            V: 0.03312361923
        },
        {
            W: 0.01,
            T0: 0.5,
            A: 10,
            V: -0.0912384918
        },
    ];

    function calcY(x) {
        var res = 0;
        var amp = 0;
        for (i = 0; i < waves.length; i++) {
            res += Math.cos(x * waves[i].W + waves[i].T0) * waves[i].A;
            amp += waves[i].A;
        }
        return res / amp * height / 2 + height / 2;
    }

    setInterval(function () {
        context.clearRect(0, 0, width, height);
        canvas.height = height;

        context.beginPath();
        context.moveTo(0, height);

        for (step = 0; step <= 1000; step++) {
            x = step / 1000 * width;
            y = calcY(x);
            context.lineTo(x, y);
        }

        context.lineTo(width, height);
        context.fillStyle = color;
        context.fill();

        for (i = 0; i < waves.length; i++) {
            waves[i].T0 += waves[i].V * speed;
        }
    }, 20);
}

(function ($) {
    animateWave("footerFlow", "rgb(255, 108, 0)", 0.8, 150);
})(jQuery);

let isTight = true;
$('.recipes-group-each').hover(function () {
    if (isTight) {
        $('.recipes-line')[0].src = "./images/components/body/recipes/line.gif";
        isTight = false;
        setTimeout(function () {
            $('.recipes-line')[0].src = "./images/components/body/recipes/line.png";
            isTight = true;
        },600)
    }
});
let isPleft = true;
let pleft = 295;
// setTimeout(function () {
//     if (isPleft) {
//         // $('.recipes-group')[0].style.paddingLeft = 0;
//         let dleft = setInterval(function () {
//             if (pleft > -230) {
//                 pleft -= 10;
//                 $('.recipes-group')[0].style.marginLeft = pleft + 'px';
//             } else {
//                 clearInterval(dleft)
//             }
//         },5);
//         isPleft = false;
//     }
// },2500);
$('.recipes-group-each').mousedown(function () {
    if (isPleft) {
        // $('.recipes-group')[0].style.marginLeft = -230 + 'px';
        isPleft = false;
        let dleft = setInterval(function () {
            if (pleft > -230) {
                pleft -= 10;
                $('.recipes-group')[0].style.marginLeft = pleft + 'px';
            } else {
                clearInterval(dleft)
            }
        },10);
    }
});

$('.recipes-group').click(function () {
    changeVisible();
});
$('.recipes-group-each-plus').click(function () {
    changeVisible();
});

gsap.defaults({ease: "elastic(1, 0.2)"});

var svg  = document.querySelector("svg");
var path = document.querySelector("#path");

var connected = false;
var snapDist = 130;
var startY = 1100;

// Break the path down into points
// <path d="M200,200 Q 400,200 600,200" />
var p0 = { x: 0, y: startY };
var p1 = { x: 960, y: startY };
var p2 = { x: 1920, y: startY };

svg.addEventListener("mousemove", onMove);

gsap.ticker.add(update);
update();

function update() {

    var d = "M" + p0.x + "," + p0.y + " Q" + p1.x + "," + p1.y + " " + p2.x + "," + p2.y;

    path.setAttribute("d", d);

    if (Math.abs(p1.y - startY) > snapDist * 2) {
        connected = false;
        gsap.to(p1, { duration: 1.5,  y: startY });
    }
}

function onMove(event) {

    if (!connected && event.target === path) {
        connected = true;
        gsap.killTweensOf(p1); // Kill any active tweens on the point
    }

    if (connected) {
        p1.y = event.pageY * 2 - (p0.y + p2.y) / 2;
    }
}

(function($) {

    if ($(window).width() > 1023 && $(window).width() < 1399)
    {
        $('.header-menu').hide();
        $('.header-logo').hide();
        $('.navi-logo').show();
        $('.cursor-pointer').show();
        $('#mySidenav').show();
        $('.navi-logo').attr('src', './images/components/body/1.png');
    }

    var h = $('.recipes-group-each').height() / 2;
    $('.recipes-line').css('top', -h);
    
})(jQuery);

