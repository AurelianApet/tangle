let isPointerImageVisible = true;
let pointer = document.getElementById("pointer");

function initPointerArea() {
  let pointerArea = document.getElementById("pointerArea");
  let current = 0;
  if (!pointerArea) return;
  pointerArea.onclick = function (e) {
    if (!isPointerImageVisible) {
      return;
    }
    isPointerImageVisible = false;
    current++;
    if (current > 10) current = 1;

    pointer.style.top = e.pageY + 45 + "px";
    pointer.style.left = e.pageX + 45 + "px";

    pointer.style.backgroundImage =
      "url('./images/pointer/" + current + ".png')";
    pointer.style.display = "block";

    setTimeout(function () {
      pointer.style.display = "none";
      isPointerImageVisible = true;
    }, 1000);

    // pointerArea.style.cursor = "url('./images/pointer/" + current + ".png'), auto";
  };

  function setPosition(e) {
    pointer.style.top = e.pageY + 45 + "px";
    pointer.style.left = e.pageX + 45 + "px";
  }
  function scrollMove(e) {
    let top = window.scrollY;
    pointer.style.top = top + 120 + 45 + "px";
    pointer.style.display = "none";
  }
  window.addEventListener("mousemove", setPosition);
  window.addEventListener("scroll", scrollMove);
}

(function($) {
  if ($(window).width() > 1023 && $(window).width() < 1399)
  {
  }else{
    initPointerArea();
  }
})(jQuery);
