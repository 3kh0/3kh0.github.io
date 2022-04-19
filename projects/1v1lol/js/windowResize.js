isIframe = false;
if (window.self != window.top) {
  isIframe = true;
  function WindowResize() {
    var v = window.innerWidth;
    var maxRes = 1320;

    if (v < maxRes) {
      var ads = document.getElementsByClassName("ad");

      for (const ad of ads) {
        ad.style.transform = "scale(" + v / maxRes + ")";
      }
    } else {
      var ads = document.getElementsByClassName("ad");

      for (const ad of ads) {
        ad.style.transform = "scale(1)";
      }
    }
  }
  window.addEventListener("resize", WindowResize);
  WindowResize();
} else {
  var styles = `
    @media screen and (max-width: 1200px) { 
		.ad-leaderboard-bottom {
			display: none !important;
		}
	}
`;

  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
