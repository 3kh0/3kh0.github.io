function drawTriangle(context, x1, y1, x2, y2, x3, y3, color) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.lineTo(x1, y1);
  context.fillStyle = color;
  console.log(color);
  context.fill();
}

function toggleHTML5Fullscreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }

  //Firefox bug
  setTimeout(function () {
    document.documentElement.style.cssText = "background-color: #101010 !important";
    document.body.style.cssText = "background-color: #101010 !important";

    setTimeout(function () {
      document.documentElement.style.cssText = "background-color: black !important";
      document.body.style.cssText = "background-color: black !important";
    }, 100);
  }, 1000);
}

function isHTML5FullScreen() {
  return (document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen);
}