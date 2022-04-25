'use strict';

function setV(val2)
{
    if(window.unityGame != null)
    {
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, "V2", val2);
    }
}

function getReferrerUrl()
{
  var url = (window.location != window.parent.location)
    ? document.referrer
    : document.location.href;
    return url;
}

function isMobile()
{
  var isMobile = RegExp(/Android|webOS|iPhone|iPod|iPad/i).test(navigator.userAgent);
  return isMobile || isIpad();
}

function isTablet()
{
  var userAgent = navigator.userAgent.toLowerCase();
  var isAndroidTablet = ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1));

  return isAndroidTablet || isIpad();
}

function isIpad()
{
  var isIpad = RegExp(/iPad/i).test(navigator.userAgent);

  if (!isIpad) 
  {
    const isMac = RegExp(/Macintosh/i).test(navigator.userAgent);

    if (isMac && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) 
    {
      isIpad = true;
    }
  }
  return isIpad;
}

function getOS()
{
  var detectedOS = "Unknown";
  if (window.navigator.userAgent.indexOf("Windows") != -1) {  detectedOS = "Windows";}
  else if (window.navigator.userAgent.indexOf("CrOS") != -1) { detectedOS = "Chrome";}
  else if (window.navigator.userAgent.indexOf("Mac")            != -1) detectedOS="Mac/iOS";
  else if (window.navigator.userAgent.indexOf("X11")            != -1) detectedOS="UNIX";
  else if (window.navigator.userAgent.indexOf("Linux")          != -1) detectedOS="Linux";
  
  return detectedOS;
}

function isIos()
{
  var isIos = (/iPhone|iPad|iPod/i.test(navigator.userAgent));
  return isIos || isIpad();
}


function copyTextToClipboard(text) 
{
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.warn('Unable to copy text');
  }
  document.body.removeChild(textArea);
}

window.copyText = function (text) {
  var listener = function () {

    copyTextToClipboard(text);
    if(isMobile())
    {
      document.removeEventListener('touchend', listener);
    }
    else
    {
      document.removeEventListener('mouseup', listener);
    }
    
  };

  if(isMobile())
  {
    document.addEventListener('touchend', listener);
  }
  else
  {
    document.addEventListener('mouseup', listener);
  }
};

function firebaseLogEvent(eventName)
{
  if(firebaseSupported) firebase.analytics().logEvent(eventName);
}

function firebaseSetScreen(screenName)
{
  if(firebaseSupported) firebase.analytics().setCurrentScreen(screenName);  
  if(firebaseSupported) firebase.analytics().logEvent("screen_view", { "screen_name": screenName})
}

function firebaseLogEventWithParam(eventName, p, v)
{
  if(firebaseSupported) firebase.analytics().logEvent(eventName, { [p]: v});
}

var fs = false;
function toggleFullscreen()
{
  if(fs)
  {
    console.log("exitFullScreen");
    exitFullScreen();
  }
  else
  {
    console.log("setElementFullScreen");    
    var elem = document.getElementById("mainContainer");
    setElementFullScreen(elem);
  }
  fs = !fs;
}

function isFullscreen()
{
  return fs;
}


  function onNextMouseUp(a)
  {
    var listenerName = isMobile() ? 'touchend' : 'mouseup';
    var listener = function () {
          a();
          document.removeEventListener(listenerName, listener);
        };
        document.addEventListener(listenerName, listener);
  }

  function openUrl(url)
  {
    onNextMouseUp(function () {
      console.log("openUrl onNextMouseUp");
      window.open(url, "_blank");
    });
  }

  function setElementFullScreen(el) {
		onNextMouseUp(function () {
      var request = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
			request.call(el);
		});
	}

	function exitFullScreen() {
		onNextMouseUp(function () {
			var exitFS = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
			exitFS.call(document);
		});
  }
   
  function handleKeyDown(keycode) 
  {
    if(window.unityGame) window.unityGame.SendMessage(unityFirebaseGameOjbectName, "HandleKeyDown", keycode);
  }

  function handleKeyUp(keycode) 
  {
    if(window.unityGame) window.unityGame.SendMessage(unityFirebaseGameOjbectName, "HandleKeyUp", keycode);
  }
  
  var source = "notset";
  function setUrlSource(src)
  {
    source = src;
    console.log("setUrlSource " + src);
  }

  function reloadPage()
  {
    location.reload();
  }
