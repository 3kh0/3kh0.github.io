console.log("Running!");
//Declare variables for cloak here
const local_title = localStorage.getItem("title");
const local_icon = localStorage.getItem("icon");

//If the window already has title stored in localstorage
if (window.localStorage.hasOwnProperty("title")) {
  document.title = local_title;
}
//Fetch and set from user's input
if (window.localStorage.hasOwnProperty("icon")) {
  document.querySelector("link[rel=icon]").href = local_icon;
}

//Add Google Analytics
const gascript = document.createElement("script");
gascript.setAttribute("async", "");
gascript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-98DP5VKS42");
const inlinegascript = document.createElement("script");
inlinegascript.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-98DP5VKS42');`
document.head.append(gascript, inlinegascript);
console.log("Google Analytics added");

//Turn off GSAP null warnings (if present)
try {
  gsap.config({
    nullTargetWarn: false,
  });
} catch {
  console.log("empty b/c no need for return :)");
}

// Credit to Team r0cket for the original code :)