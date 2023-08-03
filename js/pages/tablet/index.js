let first_vidoe = document.getElementById('first_video');
let second_video = document.getElementById('second_video');
let carousel = $(".carousel");
let ticker = null;
carousel.on('slide.bs.carousel', function () {
    if (arguments[0].to == 1) {
        $('#first_video').get(0).pause();
        $('#first_video').get(0).currentTime = 0;
        $('#second_video').get(0).pause();
        $('#second_video').get(0).currentTime = 0;
        ticker = setTimeout(function () {
            carousel.carousel("next");
        },3000);
    } else if ( arguments[0].to == 3) {
        $('#first_video').get(0).pause();
        $('#first_video').get(0).currentTime = 0;
        $('#second_video').get(0).pause();
        $('#second_video').get(0).currentTime = 0;
        ticker = setTimeout(function () {
            carousel.carousel("next");
        },3000);
    } else if ( arguments[0].to == 0) {
        $('#first_video').get(0).play();
    } else if ( arguments[0].to == 2) {
        $('#second_video').get(0).play();
    }
});

carousel.carousel({
    pause : false,
    interval : false,
});

function nextSlide() {
    carousel.carousel("next");
}

let StartX,EndX;
document.getElementsByClassName('carousel-inner')[0].addEventListener('touchstart',function (e) {
    StartX = arguments[0].changedTouches[0].pageX;
});

document.getElementsByClassName('carousel-inner')[0].addEventListener('touchend',function (e) {
    EndX = arguments[0].changedTouches[0].pageX;
    if (EndX - StartX > 20) {
        $('#first_video').get(0).pause();
        $('#first_video').get(0).currentTime = 0;
        $('#second_video').get(0).pause();
        $('#second_video').get(0).currentTime = 0;
        carousel.carousel("prev");
    } else if (StartX - EndX > 20) {
        $('#first_video').get(0).pause();
        $('#first_video').get(0).currentTime = 0;
        $('#second_video').get(0).pause();
        $('#second_video').get(0).currentTime = 0;
        carousel.carousel("next");
    }
    StartX = EndX = null;
    clearTimeout(ticker);
    initSlider();
});

function initSlider()
{
    var index = $('.carousel').find('.carousel-item.active').index() + 1;
    if(index == 1 || index == 3){
        ticker = setTimeout(function () {
            carousel.carousel("next");
        },3000);
    }
}

function animateFlow(canvasName, speed, text = "Mingle and Wiggle") {
    var canvas = document.getElementById(canvasName);

    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * 0.67;

    var context = canvas.getContext("2d");

    text = "  " + text + "  ";

    var allText = text.repeat(30);

    var xoffset = [0, 0];
    var yoffset = [window.innerWidth * 0.12, window.innerWidth * 0.18];


    context.font = "700 " + window.innerWidth * 0.05 + "px Pretendard";
    context.fillStyle = "#412111";
    var totalWidth = context.measureText(text).width;
    var wSpeed = (Math.PI * 2) / totalWidth;

    var id, x, y, rotation, ch, i;
    var mouseX, mouseY = 0;

    setInterval(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = window.innerWidth;

        context.font = "700 " + window.innerWidth * 0.05 + "px Pretendard";
        context.fillStyle = "#412111";
        for (id = 0; id < 2; id++) {
            if (id == 0) xoffset[id] -= speed;
            else xoffset[id] += speed;

            if (xoffset[id] < -totalWidth) xoffset[id] += totalWidth;
            if (xoffset[id] > 0) xoffset[id] -= totalWidth;

            x = xoffset[id];
            rotation = 0;
            y = 0;

            for (i = 0; i < allText.length; i++) {
                ch = allText.charAt(i);

                if (!(x < -window.innerWidth * 0.2 || x > window.innerWidth + window.innerWidth * 0.2)) {
                    y = Math.cos(wSpeed * x) * - 20 + yoffset[id];

                    context.translate(x, y);
                    rotation = -Math.atan(-1.0 * Math.sin(wSpeed * x) * wSpeed * 18);
                    context.rotate(rotation);
                    context.fillText(ch, 0, 0);
                    context.rotate(-rotation);
                    context.translate(-x, -y);
                }

                x += context.measureText(ch).width;
                if (x > window.innerWidth + window.innerWidth * 0.2) break;
            }
        }
    }, 40);
}

(function($) {
    animateFlow("mingleandwiggleCanvas", 2);
})(jQuery);

$('#body-container-footer-pane-input-icon').click(function () {
    $('.body-container-footer-pane-input-text')[0].style.display = 'block';
    $('.body-container-footer-pane-input')[0].style.display = 'none';
    $('.body-container-footer-pane-input-icon')[0].style.display = 'none';
});

let tangle_story_pane_img_state = false, mask_state = false, mingleMaskLeft1_state = false, productMask1_state = false,productMask2_state = false;
let tangle_story_pane_img_state_opacity = 0;
let mask_left = 0,mingleMaskLeft1 = 0,productMaskLeft1 = 0;
let mask_left2 = 0,mingleMaskLeft2 = 0,productMaskLeft2 = 0;
let opac = 0;

$(window).scroll(function() {
    var offset = $(".tangle-story-pane").offset().top - screen.height / 2;
    if ($(this).scrollTop() > offset ) {
        if (!tangle_story_pane_img_state) {
            tangle_story_pane_img_state = true;
            setInterval(function () {
                if ($('.tangle-story-pane-img')[0].style.opacity < 1) {
                    $('.tangle-story-pane-img')[0].style.opacity = tangle_story_pane_img_state_opacity;
                    tangle_story_pane_img_state_opacity += 0.1;
                }
            },10);
        }
    }
    offset = $(".tangle-story-pane").offset().top - 100;
    if ($(this).scrollTop() > offset) {
        let setInter = setInterval(function () {
            if (opac < 1) {
                $('.circle')[0].style.opacity = opac;
                $('.crossover-1')[0].style.opacity = opac;
                $('.underline')[0].style.opacity = opac;
                opac += 0.05;
            }
            // else {
            //     clearInterval(setInter)
            //     opac = 0;
            // }
        },50);
    }
    offset = $(".mask").offset().top - screen.height / 2;
    if ($(this).scrollTop() > offset) {
        if (!mask_state) {
            mask_state = true;
            setInterval(function () {
                if (mask_left < 100) {
                    $('.mask')[0].style.left = mask_left + '%';
                    mask_left++;
                }
            },10);
        }
    }

    offset = $(".mingle-mask1").offset().top - screen.height / 2;
    if ($(this).scrollTop() > offset) {
        if (!mingleMaskLeft1_state) {
            mingleMaskLeft1_state = true;
            setInterval(function () {
                if (mingleMaskLeft1 < 100) {
                    $('.mingle-mask1')[0].style.left = mingleMaskLeft1 + '%';
                    $('.mingle-mask2')[0].style.left = mingleMaskLeft1 + '%';
                    mingleMaskLeft1++;
                }
            },10);
        }
    }

    offset = $(".mingle-and-wiggle-with").offset().top - screen.height / 2;
    if ($(this).scrollTop() > offset) {
        $('.mingle').addClass('mingleWiggleAnimation');
        $('.tangle').addClass('mingleWiggleAnimation');
    }

    offset = $(".productMaskLeft1").offset().top - screen.height / 2;
    if ($(this).scrollTop() > offset) {
        if (!productMask1_state) {
            productMask1_state = true;
            setInterval(function () {
                if (productMaskLeft1 < 100) {
                    $('.productMaskLeft1')[0].style.left = productMaskLeft1 + '%';
                    productMaskLeft1++;
                }
            },10);
        }
    }

    offset = $(".productMaskLeft2").offset().top - screen.height / 2;
    if ($(this).scrollTop() > offset) {
        if (!productMask2_state) {
            productMask2_state = true;
            setInterval(function () {
                if (productMaskLeft2 < 100) {
                    $('.productMaskLeft2')[0].style.left = productMaskLeft2 + '%';
                    productMaskLeft2++;
                }
            },20);
        }
    }
});

let img_state = 1;
$('.body-container-first-pane-bottom').click(function () {
    img_mask_left = 0;
    if (img_state == 1) {
        $('.body-container-first-pane-bottom-img')[0].src = '../images/components/body/main/8.png';
        $('.line')[0].style.backgroundImage = "url('../images/components/body/main/22-2.png')";
        setInterval(function () {
            if (img_mask_left < 100) {
                $('.mask')[0].style.left = img_mask_left + '%';
                img_mask_left++;
            }
        },10);
        img_state = 2;
    } else if (img_state == 2) {
        $('.body-container-first-pane-bottom-img')[0].src = '../images/components/body/main/114.png';
        $('.line')[0].style.backgroundImage = "url('../images/components/body/main/22-1.png')";
        img_state = 3;

    } else if (img_state == 3) {
        $('.body-container-first-pane-bottom-img')[0].src = '../images/components/body/main/10.png';
        $('.line')[0].style.backgroundImage = "url('../images/components/body/main/22-2.png')";
        img_state = 4;
    } else {
        $('.body-container-first-pane-bottom-img')[0].src = '../images/components/body/main/113.png';
        $('.line')[0].style.backgroundImage = "url('../images/components/body/main/22-1.png')";

        img_state = 1;
    }
});

for (let i = 0; i < 10; i++) {
    setTimeout(function () {
        $('.mingle')[i].style.transform = 'scale(1)';
    },(i+1) * 100);
}

for (let i= 0; i < 11; i++) {
    setTimeout(function () {
        $('.tangle')[i].style.transform = 'scale(1)';
    },(i+1) * 100);
}

function animateWave1(canvasName, color, speed, height) {
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

        for(step = 0; step <= window.innerWidth * 2.78; step ++) {
            x = step / window.innerWidth * 2.78 * width;
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
    var anispeed = 360 * 400 / window.innerWidth;
    $('.body-container-first-pane-separator').css('animation', 'linear ' + anispeed + 's flow');
    animateWave1("footer1", "rgb(255, 108, 0)", 0.5, window.innerWidth * 0.278);
})(jQuery);
