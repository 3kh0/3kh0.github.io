'use strict';

var gameContainer;
function updateAdSizes() 
{
  if(gameContainer == null)
  {
    gameContainer = document.getElementById('gameContainer');
  }

  if(gameContainer != null)
  {
    updateMainMenuBanner();
    updateLongBanner();
    updateWinBanner();
  }
}

function adBlockerActive()
{
  var active = (document.getElementById('nbAIVXTtpUxM') == null);
  return active;
}

var mainMenuBanner;
function updateMainMenuBanner()
{ 
  if(mainMenuBanner == null)
  {
    mainMenuBanner = document.getElementById('adContainer');
  }

  if(mainMenuBanner != null && mainMenuBanner.display != "none")
  {
    var adContainerW = mainMenuBanner.offsetWidth;
    var adContainerH = mainMenuBanner.offsetHeight;
    var gameContainerH = gameContainer.offsetHeight;

    if(adContainerH/gameContainerH > 0.8)
    {
      var newHeight = gameContainerH * 0.8;
      var newScale = newHeight / adContainerH;
      var scaleString = "scale( " + newScale + "," + newScale + ")";
      var offsetX = (adContainerW - (adContainerW*newScale))/2 - 10;
      var offsetY = 10 - (adContainerH - adContainerH*newScale)/2;
      var translateString = "translate(" + offsetX + "px, " + offsetY + "px)";
      mainMenuBanner.style.transform = translateString + " " + scaleString;
    }
    else
    {
      mainMenuBanner.style.transform =  "scale( 1, 1) translate(-10px, 10px)";
    }
  }
}

var winBanner;
function updateWinBanner()
{ 
  if(winBanner == null)
  {
    winBanner = document.getElementById('adContainer2');
  }

  if(winBanner != null && winBanner.display != "none")
  {
    var adContainerW = winBanner.offsetWidth;
    var adContainerH = winBanner.offsetHeight;
    var gameContainerH = gameContainer.offsetHeight;

    if(adContainerH/gameContainerH > 0.65)
    {
      var newHeight = gameContainerH * 0.65;
      var newScale = newHeight / adContainerH;
      var scaleString = "scale( " + newScale + "," + newScale + ")";
      var offsetX = (adContainerW - (adContainerW*newScale))/2 - 10;
      var offsetY = gameContainerH/2 - adContainerH/2;
      var translateString = "translate(" + offsetX + "px, " + offsetY + "px)";
      winBanner.style.transform = translateString + " " + scaleString;
    }
    else
    {
      var offsetY = gameContainerH/2 - adContainerH/2;
      winBanner.style.transform =  "scale( 1, 1) translate(-10px, " + offsetY + "px)";
    }
  }
}

var longBanner;
function updateLongBanner()
{ 
  if(longBanner == null)
  {
    longBanner = document.getElementById('adLongContainer');
  }

  if(longBanner != null && longBanner.display != "none")
  {
    if(isMobile())
    {
      longBanner.style.left = "50%";
      longBanner.style.marginRight = "-50%";
      
      var p = window.innerHeight - longBanner.offsetHeight;
      
      longBanner.style.top = p + "px";
      longBanner.style.transform =  "scale( 1, 1) translate(-50%, -10px)";
    }
    else
    {
      longBanner.style.bottom = 0 + "px";
      longBanner.style.width = 100 + "vw";

      var adContainerH = longBanner.offsetHeight;
      var gameContainerH = gameContainer.offsetHeight;

      if(adContainerH/gameContainerH > 0.3)
      {
        var newHeight = gameContainerH * 0.3;
        var newScale = newHeight / adContainerH;
        var scaleString = "scale( " + newScale + "," + newScale + ")";
        var offsetX = 0;
        var offsetY = (adContainerH - adContainerH*newScale)/2 - 10;
        var translateString = "translate(" + offsetX + "px, " + offsetY + "px)";
        longBanner.style.transform = translateString + " " + scaleString;
      }
      else
      {
        longBanner.style.transform =  "scale( 1, 1) translate(0px, -10px)";
      }
    }

    if(isMobile())
    {
      var p = window.innerHeight - longBanner.offsetHeight;
      longBanner.style.top = p + "px";
    }
    else
    {
      longBanner.style.bottom = 0 + "px";
    }
  }
}

setInterval(updateAdSizes, 500);

function showMainMenuBanner()
{
  hideWinCeremonyBanner();
  hideLongBanner();

  const ad = document.querySelector("#adContainer");
  ad.style.display = "block";
  updateAdSizes();

  requestMainMenuBanner();
}

function hideMainMenuBanner()
{
  const ad = document.querySelector("#adContainer");
  if(ad != null) ad.style.display = "none";

  const ad2 = document.querySelector("#adContainerMainMenu");
  if(ad2 != null) ad2.style.display = "none";
}

function showWinCeremonyBanner(interstialRequested)
{
  hideLongBanner();
  hideMainMenuBanner();

  const ad = document.querySelector("#adContainer2");
  ad.style.display = "block";
  updateAdSizes();

  requestWinCeremonyBanner(interstialRequested);
}


function hideWinCeremonyBanner()
{
  const ad = document.querySelector("#adContainer2");
  if(ad != null) ad.style.display = "none";

  const ad2 = document.querySelector("#adContainerWin");
  if(ad2 != null) ad2.style.display = "none";
}

function showLongBanner()
{
  hideWinCeremonyBanner();
  hideMainMenuBanner();

  const ad = document.querySelector("#adLongContainer");
  ad.style.display = "flex";
  updateAdSizes();

  requestLongBanner();
}


function hideLongBanner()
{
  const ad = document.querySelector("#adLongContainer");
  if(ad != null) ad.style.display = "none";

  const ad2 = document.querySelector("#adLongContainer2");
  if(ad2 != null) ad2.style.display = "none";
}

function showLongBanner2()
{
  hideWinCeremonyBanner();
  hideMainMenuBanner();

  const ad = document.querySelector("#adLongContainer2");
  ad.style.position = "absolute";
  ad.style.display = "block";
  requestLongBanner2();
}

function showMainMenuBanner2()
{
  hideWinCeremonyBanner();
  hideLongBanner();

  const ad = document.querySelector("#adContainerMainMenu");
  ad.style.position = "absolute";
  ad.style.display = "block";
  requestMainMenuBanner2();
}

function showWinCeremonyBanner2(interstialRequested)
{
  hideLongBanner();
  hideMainMenuBanner();

  const ad = document.querySelector("#adContainerWin");
  ad.style.position = "absolute";
  ad.style.display = "block";
  requestWinCeremonyBanner2(interstialRequested);
}


function setElementSize(identifier, x, y, w, h)
{
  const el = document.getElementById(identifier);
  if(el != null)
  {
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.width = w + "px";
    el.style.height = h + "px";
  }
}

function showPreGameInterstitial(audioOn)
{
  showInterstitial(audioOn, 'start', 'pregame');
}

function showWinCeremonyInterstitial(audioOn)
{
  showInterstitial(audioOn, 'next', 'winceremony')
}

function interstitialStart()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialStart");
}

function interstitialError()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialFailed");
}

function interstitialSkipped()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialSkipped");
}


function interstitialComplete() 
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "InterstitialComplete");
}
