'use strict';

function requestMainMenuBanner()
{
  if(!isMobile())
  {
    aiptag.cmd.display.push(function() { aipDisplayTag.display('smashkarts-io_300x250')});
  }
}

function requestWinCeremonyBanner(interstialRequested)
{
  if(!isMobile())
  {
    aiptag.cmd.display.push(function() { aipDisplayTag.display('smashkarts-io_300x250_2')});
  }
}


function requestLongBanner()
{
  if(!isMobile())
  {
      //aiptag.cmd.display.push(function() { aipDisplayTag.display('smashkarts-io_728x90')});
      aiptag.cmd.display.push(function() { aipDisplayTag.display('smashkarts-io_970x250')});
  }
  else
  {
      //aiptag.cmd.display.push(function() { aipDisplayTag.display('smashkarts-io_320x100')});
  }
}

function showInterstitial(unusedParam, interstitialType, interstitialName)
{
    // var audioOnStr = audioOn ? 'on' : 'off';
    // adConfig({
    //   sound: audioOnStr,
    // });
  
    if(adBreak != null)
    {
      adBreak({
                
        type: interstitialType,  // ad shows at start of next level
        name: interstitialName,
        beforeBreak: interstitialStart,
        afterBreak: interstitialComplete
      });
    }
}


var onShowRewardedVideoClicked = null;

function tryInitRewardedInterstitial(unusedParam)
{
    if(adBreak != null)
    {
      adBreak({
        type: 'reward', // The type of this placement
        name: 'rewardedxpboost', // A descriptive name for this placement
        beforeAd: () => {interstitialStart();}, // Prepare for the ad. Mute and pause the game flow
        afterAd: () => {console.log("tryInitRewardedInterstitials afterAd");}, // Resume the game and re-enable sound
        beforeReward: (showAdFn) => { console.log("set onShowRewardedVideoClicked"); rewardedInterstitialAvailable(); onShowRewardedVideoClicked = showAdFn }, // Show reward prompt (call showAdFn() if clicked)
        adDismissed: () => {interstitialSkipped();}, // Player dismissed the ad before it finished.
        adViewed: () => {interstitialComplete();}, // Player watched the ad–give them the reward.
        adBreakDone: (placementInfo) => {console.log("tryInitRewardedInterstitials adBreakDone");}, // Always called (if provided) even if an ad didn’t show
        });
    }
}

function tryShowRewardedInterstitial(unusedParam)
{
  if(onShowRewardedVideoClicked != null)
  {
    onShowRewardedVideoClicked();
  }
}

function rewardedInterstitialAvailable()
{
  window.unityGame.SendMessage(unityFirebaseGameOjbectName, "RewardedInterstitialAvailable");
}
