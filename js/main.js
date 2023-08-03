$(document).ready(function () {
  checkPortrait();
  $(window).resize(function() {
    checkPortrait();
  });
});

function checkPortrait() {
  var url = location.href.replace('/tablet', '');
  var cur_url = url.replace('/mobile', '');
  var mobile_offset = 769;
  var tablet_offset = 1400;
  var port_url = url.split(':');
  if(port_url.length > 2){
    url = cur_url.split('/');
    if(url.length > 0 && url[4])
    {
      url = url[4];
    }
  }else{
    url = cur_url.split('/');
    if(url.length > 0 && url[3])
    {
      url = url[3];
    }
  }

  if(url == 'bulgogi.html' || url == 'bulgogi2.html' || url == 'kimchi.html' || url == 'kimchi2.html'
    || url == 'recipes.html'){
    mobile_offset = 1023;
    tablet_offset = 0;
  }

  if ($(window).width() < mobile_offset)
  {
      var sub_folders = cur_url.split("/");
      var cur_page = sub_folders[sub_folders.length - 2];
      url = cur_url.replace(cur_page, cur_page + "/mobile");
  }else if($(window).width() < tablet_offset){
      var sub_folders = cur_url.split("/");
      var cur_page = sub_folders[sub_folders.length - 2];
      url = cur_url.replace(cur_page, cur_page + "/tablet");
  }else{
    url = cur_url;
  }
  if(url != location.href){
    location.href = url;
  }
  // if (checkMobile()) {
  //   var cur_url = location.href;
  //   if(cur_url.indexOf("/tablet/") > 0){
  //     cur_url = cur_url.replace("/tablet/", "/");
  //   }
  //   if (cur_url.indexOf("/mobile/") < 0) {
  //     var sub_folders = cur_url.split("/");
  //     var cur_page = sub_folders[sub_folders.length - 2];
  //     location.href = cur_url.replace(cur_page, cur_page + "/mobile");
  //   }
  // } else if(checkTablet()){
  //   var cur_url = location.href;
  //   if(window.innerWidth > window.innerHeight){
  //     if(cur_url.indexOf("/mobile/") > 0){
  //       cur_url = cur_url.replace("/mobile/", "/");
  //     }
  //     if (cur_url.indexOf("/tablet/") < 0) {
  //       var sub_folders = cur_url.split("/");
  //       var cur_page = sub_folders[sub_folders.length - 2];
  //       location.href = cur_url.replace(cur_page, cur_page + "/tablet");
  //     }
  //   }else{
  //     if(cur_url.indexOf("/tablet/") > 0){
  //       cur_url = cur_url.replace("/tablet/", "/");
  //     }
  //     if (cur_url.indexOf("/mobile/") < 0) {
  //       var sub_folders = cur_url.split("/");
  //       var cur_page = sub_folders[sub_folders.length - 2];
  //       location.href = cur_url.replace(cur_page, cur_page + "/mobile");
  //     }
  //   }
  // }
  // else {
  //   var cur_url = location.href;
  //   if (cur_url.indexOf("/mobile/") >= 0) {
  //     location.href = cur_url.replace("/mobile", "");
  //   }else if(cur_url.indexOf("/tablet/") >= 0) {
  //     location.href = cur_url.replace("/tablet", "");
  //   }
  // }
}

function checkTablet() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTablet = /(ipad|ipod|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
  return isTablet;
}

function checkMobile() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return true;
  }

  if (/android/i.test(userAgent)) {
    return true;
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPhone/.test(userAgent) && !window.MSStream) {
    return true;
  }

  if ($(window).width() < 769) return true;
  if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
    return true;
  return false;
}

function isIpadOS() {
  return navigator.maxTouchPoints &&
    navigator.maxTouchPoints > 2 &&
    /MacIntel/.test(navigator.platform);
}

function formatCurrency(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function isOldIE() {
  var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
  var msie = ua.indexOf("MSIE "); // IE 10 or older
  var trident = ua.indexOf("Trident/"); //IE 11
  return msie > 0 /* || trident > 0*/;
}

if (isOldIE()) {
  alert(
    "Your Internet version is not supported. Please use Internet Explorer version 11 or above."
  );
}

function goto(url) {
  window.location.href = url + ".html";
}

$(".scroll-to-top").click(function () {
  changeVisible();
});
$(".body-container-footer-web-img").click(function () {
  changeVisible();
});
$(".modal").click(function () {
  changeVisible();
});

function changeVisible() {
  isPointerImageVisible = false;
  setTimeout(function () {
    isPointerImageVisible = true;
  }, 500);
}
