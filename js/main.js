// Hello there!
//
// If you want to add my games to your site, please reach out at my email: echo-the-coder@tuta.io, or discord: 3kh0_#1791

console.warn(
  "%cNote!",
  "color: purple; font-weight: 600; background: yellow; padding: 0 5px; border-radius: 5px",
  "This script mostly helps all of the games run, DO NOT REMOVE IT! If you want to add my games to your site, please reach out at my email: echo-the-coder@tuta.io\nDo not just add them without asking me first!"
);
function log(text) {
  console.log("%cSite script", "color: red; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px", text);
}
function tab(text) {
  console.log("%cTab Cloak", "color: green; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px", text);
}
function script(text) {
  console.log("%cScript Injection", "color: cyan; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px", text);
}
// ====================================
// TAB CLOAK
// ====================================

log("Starting Tab cloak engine!");
console.groupCollapsed("Click to view Tab Cloak operations!");
tab("Loading Tab Cloak...");
//Declare variables for cloak here
const local_title = localStorage.getItem("title");
const local_icon = localStorage.getItem("icon");

// Set tab title (if needed)
if (window.localStorage.hasOwnProperty("title")) {
  document.title = local_title;
  tab("Title set to: " + local_title);
} else {
  tab("Title not set :(");
}
// Set tab icon (if needed)
if (window.localStorage.hasOwnProperty("icon")) {
  document.querySelector("link[rel=icon]").href = local_icon;
  tab("Icon set to: " + local_icon);
} else {
  tab("Icon not set :(");
}
tab("Tab cloak settings can be found in localStorage! If you want to change them, you can go tab cloak page.");
console.groupEnd();
log("Tab cloak engine finished!");

// ====================================
// SCRIPT INJECTION
// ====================================

log("Preparing script injections!");
console.groupCollapsed("Click to view Script Injection operations!");
script("Preparing 1 script to be injected...");

const gascript = document.createElement("script");
gascript.setAttribute("async", "");
gascript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-98DP5VKS42");
const inlinegascript = document.createElement("script");
inlinegascript.innerHTML = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-98DP5VKS42');`;
document.head.append(gascript, inlinegascript);
script("Injected script 1/1");

const gascript2 = document.createElement("script");



console.groupEnd();
log("Script injections finished!");

log("All done!");