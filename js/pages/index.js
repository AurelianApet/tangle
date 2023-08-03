let first_vidoe = document.getElementById("first_video");
let second_video = document.getElementById("second_video");
let carousel = $(".carousel");
carousel.on("slide.bs.carousel", function () {
  if (arguments[0].to === 1 || arguments[0].to == 3) {
    setTimeout(function () {
      nextSlide();
    }, 3000);
    first_vidoe.pause();
    second_video.pause();
  } else if (arguments[0].to === 0) {
    first_vidoe.play();
  } else if (arguments[0].to === 2) {
    second_video.play();
  }
});

carousel.carousel({
  pause: false,
  interval: false,
});

function nextSlide() {
  carousel.carousel("next");
}

first_vidoe.addEventListener(
  "ended",
  function () {
    $(".cursor2").click();
  },
  false
);
second_video.addEventListener(
  "ended",
  function () {
    $(".cursor2").click();
  },
  false
);

//$('video#first_video').prop('loop',true);
//$('video#second_video').prop('loop',true);

$(".body-container-footer-pane-input-icon").click(function () {
  var type = "postSubscribe";
  var subEmail = $("#subEmail").val();
  var now = new Date();
  var year = now.getFullYear();
  var month = addLeadingZero(now.getMonth() + 1);
  var day = addLeadingZero(now.getDate());
  var hours = addLeadingZero(now.getHours());
  var minutes = addLeadingZero(now.getMinutes());
  var seconds = addLeadingZero(now.getSeconds());
  var createdAt =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  function addLeadingZero(value) {
    return value < 10 ? "0" + value : value;
  }
  var deleteYn = "n";

  function validateEmail(email) {
    // 이메일 주소의 형식을 검사하는 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  if (subEmail == "") {
    popupOpen("sendSubs", "Please enter your email address.");
    return;
  }

  if (!validateEmail(subEmail)) {
    popupOpen(
      "sendSubs",
      "The email address is not in the correct format.\nPlease check again."
    );
    return;
  }

  $.ajax({
    type: "POST",
    url: "./api/index.php",
    data: {
      type: type,
      subEmail: subEmail,
      createdAt: createdAt,
      deleteYn: deleteYn,
    },
    success: function (data) {
      $(".body-container-footer-pane-input-text")[0].style.display = "block";
      $(".body-container-footer-pane-input")[0].style.display = "none";
      $(".body-container-footer-pane-input-icon")[0].style.display = "none";
    },
    error: function (data) {
      alert("구독에 실패했습니다.");
    },
  });
});

function animateFlow(canvasName, speed, text = "Mingle and Wiggle") {
  var canvas = document.getElementById(canvasName);
  canvas.width = 1920;
  canvas.height = 240;
  var context = canvas.getContext("2d");
  text = "  " + text + "  ";
  var allText = text.repeat(30);

  var xoffset = [0, 0];
  var yoffset = [80, 160];

  context.font = "900 64px Pretendard";
  context.fillStyle = "#412111";

  var id, x, y, rotation, ch, i;
  var mouseX,
    mouseY = 0;

  setInterval(function () {
    var totalWidth = context.measureText(text).width;
    var wSpeed = (Math.PI * 2) / totalWidth;

    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 1920;

    context.font = "900 64px Pretendard";
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

        if (!(x < -100 || x > 1920 + 100)) {
          y = Math.cos(wSpeed * x) * -30 + yoffset[id];
          context.translate(x, y);
          rotation = -Math.atan(-1.0 * Math.sin(wSpeed * x) * wSpeed * 30);
          context.rotate(rotation);
          context.fillText(ch, 0, 0);
          context.rotate(-rotation);
          context.translate(-x, -y);
        }

        x += context.measureText(ch).width;
        if (x > 1920 + 100) break;
      }
    }
  }, 30);
}

(function ($) {
  animateFlow("mingleandwiggleCanvas", 3);
})(jQuery);

function animateWave(canvasName, color, speed, height) {
  var canvas = document.getElementById(canvasName);

  canvas.width = 1920;
  canvas.height = height;

  var context = canvas.getContext("2d");

  var step, x, y, i;
  var width = canvas.width;
  // var height = canvas.height;

  var waves = [
    {
      W: 0.02,
      T0: 1.2,
      A: 20,
      V: -0.0184159129,
    },
    {
      W: 0.0005,
      T0: 0.6,
      A: 15,
      V: -0.0111235123,
    },
    {
      W: 0.014,
      T0: -0.0,
      A: 20,
      V: 0.03312361923,
    },
    {
      W: 0.01,
      T0: 0.5,
      A: 10,
      V: -0.0912384918,
    },
  ];

  function calcY(x) {
    var res = 0;
    var amp = 0;
    for (i = 0; i < waves.length; i++) {
      res += Math.cos(x * waves[i].W + waves[i].T0) * waves[i].A;
      amp += waves[i].A;
    }
    return ((res / amp) * height) / 2 + height / 2;
  }

  setInterval(function () {
    context.clearRect(0, 0, width, height);

    width = canvas.width = 1920;
    canvas.height = height;

    context.beginPath();
    context.moveTo(0, height);

    for (step = 0; step <= 1000; step++) {
      x = (step / 1000) * width;
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
  animateWave("first-pane-flow", "#ffcc00", 0.8, 200);
})(jQuery);

let isImageMove;

function initImageMove() {
  function setPosition(e) {
    let standardX = $(".image")[0].clientWidth / 2;
    let standardY = 3400;
    var x = e.clientX;
    if (x > standardX) {
      isImageMove = true;
      if (isImageMove) {
        isImageMove = false;
        $(".image-container")[0].style.marginLeft = "40px";
        $(".image-container")[0].style.marginRight = 0;
      }
    } else if (x < standardX) {
      isImageMove = true;
      if (isImageMove) {
        isImageMove = false;
        $(".image-container")[0].style.marginLeft = 0;
        $(".image-container")[0].style.marginRight = "40px";
      }
    }
    if (e.pageY > standardY) {
      isImageMove = true;
      if (isImageMove) {
        isImageMove = false;
        $(".image-container")[0].style.top = "40px";
        $(".image-container")[0].style.bottom = 0;
      }
    } else if (e.pageY < standardY) {
      isImageMove = true;
      if (isImageMove) {
        isImageMove = false;
        $(".image-container")[0].style.top = 0;
        $(".image-container")[0].style.bottom = "40px";
      }
    }
  }
  document.onmousemove = setPosition;
}

initImageMove();

wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();

function animateLogoFlow(
  canvasName,
  speed,
  text = "Mingle and Wiggle",
  height,
  backgroundColor,
  foregroundColor,
  fontHeight
) {
  var canvas = document.getElementById(canvasName);

  canvas.width = 1920;
  canvas.height = height;

  var context = canvas.getContext("2d");

  text = "  " + text + "  ";

  var allText = text.repeat(30);

  var xoffset = [0, 0];
  var yoffset = [80, 160];

  context.font = "900 " + fontHeight + "px Pretendard";
  context.fillStyle = "#40220f";
  var totalWidth = context.measureText(text).width;
  var wSpeed = (Math.PI * 2) / totalWidth;
  var w = 0;

  var id, x, y, rotation, ch, i;
  var mouseX,
    mouseY = 0;

  setInterval(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = 1920;

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    context.font = "900 " + fontHeight + "px Pretendard";
    context.fillStyle = foregroundColor;

    for (id = 0; id < 1; id++) {
      if (id == 0) xoffset[id] -= speed;
      else xoffset[id] += speed;

      if (xoffset[id] < -totalWidth) xoffset[id] += totalWidth;
      if (xoffset[id] > 0) xoffset[id] -= totalWidth;

      x = xoffset[id];
      rotation = 0;
      y = 0;

      for (i = 0; i < allText.length; i++) {
        ch = allText.charAt(i);

        if (!(x < -100 || x > 1920 + 100)) {
          y = height / 2 + (fontHeight * 1) / 3;
          context.translate(x, y);
          context.fillText(ch, 0, 0);
          context.translate(-x, -y);
        }

        x += context.measureText(ch).width;
        if (x > 1920 + 100) break;
      }
    }
  }, 30);
}

(function ($) {
  $(document).ready(function () {
    $("#product-title").sticky({ topSpacing: 30 });
  });
})(jQuery);

let img_mask_state = false;
let img_mask_left = 0;
//
$(window).scroll(function () {
  if ($(this).scrollTop() > 2000) {
    $(".crossover").fadeIn(1500);
    $(".underline").fadeIn(1500);
  }
  if ($(this).scrollTop() > 2540) {
    if (!img_mask_state) {
      img_mask_state = true;
      setInterval(function () {
        if (img_mask_left < 101) {
          $(".mask-tangle")[0].style.left = img_mask_left + "%";
          img_mask_left++;
        }
      }, 10);
    }
  }
});

let img_state = 1;
$(".body-container-first-pane-bottom").click(function () {
  img_mask_left = 0;
  if (img_state == 1) {
    $(".body-container-first-pane-bottom-img")[0].src =
      "./images/components/body/main/8.png";
    $(".line")[0].style.backgroundImage =
      "url('./images/components/body/main/22-2.png')";
    let showMask = setInterval(function () {
      if (img_mask_left < 102) {
        $(".mask-tangle")[0].style.left = img_mask_left + "%";
        img_mask_left++;
      }
    }, 30);
    clearInterval(showMask);
    img_state = 2;
  } else if (img_state == 2) {
    $(".body-container-first-pane-bottom-img")[0].src =
      "./images/components/body/main/114.png";
    $(".line")[0].style.backgroundImage =
      "url('./images/components/body/main/22-1.png')";
    img_state = 3;
  } else if (img_state == 3) {
    $(".body-container-first-pane-bottom-img")[0].src =
      "./images/components/body/main/10.png";
    $(".line")[0].style.backgroundImage =
      "url('./images/components/body/main/22-2.png')";
    img_state = 4;
  } else {
    $(".body-container-first-pane-bottom-img")[0].src =
      "./images/components/body/main/113.png";
    $(".line")[0].style.backgroundImage =
      "url('./images/components/body/main/22-1.png')";
    img_state = 1;
  }
});

for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    $(".mingle")[i].style.transform = "scale(1)";
  }, (i + 1) * 100);
}

for (let i = 0; i < 11; i++) {
  setTimeout(function () {
    $(".tangle")[i].style.transform = "scale(1)";
  }, (i + 1) * 100);
}

let isHover = true;

$(".body-container-second-pane-product-pane-div").mouseover(function () {
  if (isHover) {
    $(this)[0].style.borderRadius = "110px";
    isHover = false;
    setTimeout(function () {
      isHover = true;
    }, 50);
  }
});

$(".body-container-second-pane-product-pane-div").mouseleave(function () {
  $(this)[0].style.borderRadius = 0;
});

$(".body-container-first-pane-separator").mousedown(function () {
  $(".body-container-first-pane-separator")[0].style.backgroundColor =
    "#6eba2b";
});

$(".body-container-first-pane-separator").mouseleave(function () {
  $(".body-container-first-pane-separator")[0].style.backgroundColor =
    "var(--brown-color)";
});

$(".body-container-first-pane-separator").mouseover(function () {
  $(".body-container-first-pane-separator")[0].style.backgroundColor =
    "var(--pink-color)";
});

$(".image-container").click(function () {
  changeVisible();
});

$(".arrow-button > img").click(function () {
  changeVisible();
});

$(".body-container-second-pane-product-pane-div").click(function () {
  changeVisible();
});

// $(".body-container-footer-pane-input-icon").click(function () {
//   changeVisible();
// });

$(".menu-tab").click(function () {
  changeVisible();
});
$(".follow-box").click(function () {
  changeVisible();
});

$(".custom-modal-content-close").click(function () {
  const modal = document.querySelector("#sendSubs");
  modal.classList.remove("show");
  modal.classList.add("fade");
  modal.style.display = "none";
});

function popupOpen(id, text) {
  const modal = document.querySelector("#" + id);
  modal.classList.remove("fade");
  modal.classList.add("show");
  modal.style.display = "block";
  const modalText = document.querySelector(".custom-modal-content-text");
  modalText.textContent = text;
}
