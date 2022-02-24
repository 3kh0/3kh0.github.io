function zoomInitialisieren(width, height) {

	$(document.body).wrapInner( "<div id='zoomcontainer'></div>" );

	// teste ob transform vom Browser unsterstützt wird
    if (isScalePossible()){
		if (!height) height = 'auto';
		var container = $('#zoomcontainer');
		container.css({
			'height' : height, // '768', // 600 rp-Titelbild
			'width' : width, //'1280', // 800 rp-Titelbild
			'margin' : 'auto',
			'-moz-transform-origin': '0% 0%',
			'-webkit-transform-origin': '0% 0%',
			'-ms-transform-origin': '0% 0%',
			'-o-transform-origin': '0% 0%',					
			'transform-origin': '0% 0%'
		});
		container.parent().css({
			"height" : '100%',
			"width" : '100%',
			// "overflow" : "hidden"
		});
	// resizen auf Bildschirmgroesse
      if (height == 'auto') {
		  scaleBreite();
		  // $(window).resize(scaleBreite);	// bei jedem resizen	  		  
		  // $(window).ready(scaleBreite);	// nur nach dem Laden	  		  
	  }
	  else {
		  scaleSite();
		  // $(window).resize(scaleSite); // bei jedem resizen		  
		  // $(window).ready(scaleSite); // nur nach dem Laden	  
	  }
    }

	// callback soll true zurück geben
    return true;
}

function scaleSite() {
  	var container = $('#zoomcontainer');
    var containerWidth = container.width();
    var containerHeight = container.height();
    var parentWidth = container.parent().width();
    var parentHeight = container.parent().height();
    var scaleWidth = parentWidth / containerWidth;
    var scaleHeight = parentHeight / containerHeight;
    var scale = Math.min(scaleWidth, scaleHeight);
    var left = (containerWidth * scale < parentWidth) ? ((parentWidth - (containerWidth * scale)) / 2) + 'px' : '0px';
    var top = (containerHeight * scale < parentHeight) ? ((parentHeight - (containerHeight * scale)) / 2) + 'px' : '0px' ;
	// console.log("parentWidth: "+parentWidth+" parentHeight: "+parentHeight+ " containerWidth: "+containerWidth+ " scale: "+ +scale);
	// console.log("scale("+scale+") top: "+top+ " left: "+left);
	    container.css({
        "-moz-transform"    : "scale("+scale+")",
        "-webkit-transform" : "scale("+scale+")",
        "-ms-transform"     : "scale("+scale+")",
        "-o-transform"      : "scale("+scale+")",
        "transform"         : "scale("+scale+")",
		"margin-left" : left,
        "margin-top" : top
    });
}
 
function scaleBreite() {
  	var container = $('#zoomcontainer');
    var containerWidth = container.width();
    var parentWidth = container.parent().width();
    var scaleWidth = parentWidth / containerWidth;
    var scale = scaleWidth;
    var left = (containerWidth * scale < parentWidth) ? ((parentWidth - (containerWidth * scale)) / 2) + 'px' : '0px';
	// console.log("parentWidth: "+parentWidth+" parentHeight: "+parentHeight+ " containerWidth: "+containerWidth+ " scale: "+ +scale);
	// console.log("scale("+scale+") top: "+top+ " left: "+left);
	    container.css({
        "-moz-transform"    : "scale("+scale+")",
        "-webkit-transform" : "scale("+scale+")",
        "-ms-transform"     : "scale("+scale+")",
        "-o-transform"      : "scale("+scale+")",
        "transform"         : "scale("+scale+")",
		"margin-left" 		: left
    });
}
  
function isScalePossible() {
    can = 'MozTransform' in document.body.style;
    if(!can) can = 'webkitTransform' in document.body.style;
    if(!can) can = 'msTransform' in document.body.style;
    if(!can) can = 'OTransform' in document.body.style;
    if(!can) can = 'transform' in document.body.style;
    if(!can) can = 'Transform' in document.body.style;
    return can;
}