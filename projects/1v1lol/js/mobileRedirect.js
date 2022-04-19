var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/bot|crawler|spider|crawling/i.test(userAgent)) {
    // do nothing
}

// Windows Phone
else if (/windows phone/i.test(userAgent)) {
    window.location.replace("/mobile");
}

// Android
else if (/android/i.test(userAgent)) {
    window.location.replace("https://play.google.com/store/apps/details?id=lol.onevone");
}

// iOS
else if ((/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
|| (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform))) {
    window.location.replace("https://apps.apple.com/app/id1508620125");
}