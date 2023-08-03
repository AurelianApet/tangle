$('.carousel').carousel({
    interval: 2000,
    pause : false
});

let StartX,EndX;
document.getElementsByClassName('carousel-inner')[0].addEventListener('touchstart',function (e) {
    StartX = arguments[0].changedTouches[0].pageX;
});
document.getElementsByClassName('carousel-inner')[0].addEventListener('touchend',function (e) {
    EndX = arguments[0].changedTouches[0].pageX;
    if (EndX > StartX) {
        $('.cursor1').click();
    } else {
        $('.cursor2').click();
    }
    StartX = EndX = null;
});

function animateWave2(canvasName, color, speed, height) {
    var canvas = document.getElementById(canvasName);

    var context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = height + 200;

    var step, x, y, i;
    var width = canvas.width;

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
        context.clearRect(0, 0, width, canvas.height);

        canvas.width = window.innerWidth;
        canvas.height = height + 200;

        context.beginPath();
        context.moveTo(0, 0);

        for(step = 0; step <= 1000; step ++) {
            x = step / 1000 * width;
            y = calcY(x);
            context.lineTo(x, y);
        }

        context.lineTo(width, 0);
        context.fillStyle = color;
        context.fill();


        context.beginPath();

        for(step = 0; step <= 1000; step ++) {
            x = step / 1000 * width;
            y = calcY(x);
            context.lineTo(x, y + 40);
        }

        context.fillStyle = color;
        context.strokeStyle = color;
        context.strokeWidth = 30;
        context.lineWidth = 30;
        context.lineCap = "round";
        context.lineJoin = "round";

        context.stroke();

        for(i = 0; i < waves.length; i ++) {
            waves[i].T0 += waves[i].V * speed;
        }
    }, 20);
}

(function($) {
    animateWave2("bodyFooter", "#ff6c00", 0.8, 100);
})(jQuery);