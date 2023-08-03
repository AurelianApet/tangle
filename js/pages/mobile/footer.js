function animateWave(canvasName, color, speed, height) {
    var canvas = document.getElementById(canvasName);
    if(!canvas)
        return;
    canvas.width = window.innerWidth;
    canvas.height = height;

    var context = canvas.getContext("2d");

    var step, x, y, i;
    var width = canvas.width;
    // var height = canvas.height;

    var waves = [{
        W : 0.02,
        T0: 1.2,
        A: 20,
        V: -0.0184159129
    },
        {
            W : 0.0005,
            T0: 0.6,
            A: 15,
            V: -0.0111235123
        },
        {
            W : 0.014,
            T0: -0.0,
            A: 20,
            V: 0.03312361923
        },
        {
            W : 0.01,
            T0: 0.5,
            A: 10,
            V: -0.0912384918
        },
    ];

    function calcY(x) {
        var res = 0;
        var amp = 0;
        for(i = 0; i < waves.length; i ++) {
            res += Math.cos(x * waves[i].W + waves[i].T0) * waves[i].A;
            amp += waves[i].A;
        }
        return res / amp * height / 2 + height/2;
    }

    setInterval(function () {
        context.clearRect(0, 0, width, height);

        width = canvas.width = window.innerWidth;
        canvas.height = height;

        context.beginPath();
        context.moveTo(0, height);

        for(step = 0; step <= 1000; step ++) {
            x = step / 1000 * width;
            y = calcY(x);
            context.lineTo(x, y);
        }

        context.lineTo(width, height);
        context.fillStyle = color;
        context.fill();

        for(i = 0; i < waves.length; i ++) {
            waves[i].T0 += waves[i].V * speed;
        }
    }, 20);
}

(function($) {
    animateWave("footer", "rgb(255, 108, 0)", 0.8, 150);
    animateWave("header", "#ffcc00", 0.8, 150);
})(jQuery);

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    $('.closebtn').css('opacity', 1);
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $('.closebtn').css('opacity', 0);
}

function gotoAbout()
{
    window.sessionStorage.setItem('anchorId', '#mabout');
    location.href="index.html";
}

function gotoProducts()
{
    window.sessionStorage.setItem('anchorId', '#mproducts');
    location.href="index.html";
}

let dropdownState = true;
$('.dropdown').click(function () {
    if (dropdownState) {
        $('.dropdown-content').css('display', 'block');
        $('.fadown')[0].style.display = 'none';
        $('.faup')[0].style.display = 'block';
        dropdownState = false;
    } else {
        $('.dropdown-content').css('display', 'none');
        $('.fadown')[0].style.display = 'block';
        $('.faup')[0].style.display = 'none';
        dropdownState = true;
    }
});

$('.dropdown-content').click(function () {
    if (!dropdownState) {
        setTimeout(function () {
            $('.dropdown-content').css('display', 'none');
            $('.fadown')[0].style.display = 'block';
            $('.faup')[0].style.display = 'none';
        },1)
    }
});

$('.scroll-to-top').click(function () {
    $('.scrollToTop')[0].style.display = 'block';
    $('.scroll-to-top')[0].style.backgroundImage = 'url("../images/components/body/7-1.png")';

    setTimeout(function () {
        $('.scroll-to-top')[0].style.backgroundImage = 'url("../images/components/body/7.png")';
        $('.scrollToTop')[0].style.display = 'none';
    },600);
});
