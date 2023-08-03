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

        width = canvas.width = 1920;
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

$('.event-group-each').click(function () {
    changeVisible();
});