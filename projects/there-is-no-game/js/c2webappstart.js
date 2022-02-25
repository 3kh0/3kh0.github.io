// Start the Construct 2 project running on window load.
jQuery(document).ready(function ()
{			
	// Create new runtime using the c2canvas
	cr_createRuntime("c2canvas");
	cr_sizeCanvas(jQuery(window).width(), jQuery(window).height());
});
// Pause and resume on page becoming visible/invisible
function onVisibilityChanged() {
	if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)
		cr_setSuspended(true);
	else
		cr_setSuspended(false);
};
document.addEventListener("visibilitychange", onVisibilityChanged, false);
document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
document.addEventListener("msvisibilitychange", onVisibilityChanged, false);