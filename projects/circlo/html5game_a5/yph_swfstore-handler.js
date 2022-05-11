//SWFstore
!function(){"use strict";function checkData(data){if("function"==typeof data)throw new Error("SwfStore Error: Functions cannot be used as keys or values.")}var counter=0,alpnum=/[^a-z0-9_\/]/gi;window.SwfStore=function(config){function id(){return"SwfStore_"+config.namespace.replace("/","_")+"_"+counter++}function div(visible){var d=document.createElement("div");return document.body.appendChild(d),d.id=id(),visible||(d.style.position="absolute",d.style.top="-2000px",d.style.left="-2000px"),d}config=config||{};var key,defaults={swf_url:"storage.swf",namespace:"swfstore",debug:!1,timeout:10,onready:null,onerror:null};for(key in defaults)defaults.hasOwnProperty(key)&&(config.hasOwnProperty(key)||(config[key]=defaults[key]));if(config.namespace=config.namespace.replace(alpnum,"_"),window.SwfStore[config.namespace])throw"There is already an instance of SwfStore using the '"+config.namespace+"' namespace. Use that instance or specify an alternate namespace in the config.";if(this.config=config,config.debug){if("undefined"==typeof console){var loggerOutput=div(!0);this.console={log:function(msg){var m=div(!0);m.innerHTML=msg,loggerOutput.appendChild(m)}}}else this.console=console;this.log=function(type,source,msg){source="swfStore"===source?"swf":source,"undefined"!=typeof this.console[type]?this.console[type]("SwfStore - "+config.namespace+" ("+source+"): "+msg):this.console.log("SwfStore - "+config.namespace+": "+type+" ("+source+"): "+msg)}}else this.log=function(){};this.log("info","js","Initializing..."),SwfStore[config.namespace.replace("/","_")]=this;var swfContainer=div(config.debug),swfName=id(),flashvars="namespace="+encodeURIComponent(config.namespace);swfContainer.innerHTML='<object height="100" width="500" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="'+swfName+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">	<param value="'+config.swf_url+'" name="movie">	<param value="'+flashvars+'" name="FlashVars">	<param value="always" name="allowScriptAccess">	<embed height="375" align="middle" width="500" pluginspage="https://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" type="application/x-shockwave-flash" allowscriptaccess="always" quality="high" loop="false" play="true" name="'+swfName+'" bgcolor="#ffffff" src="'+config.swf_url+'"></object>',this.swf=document[swfName]||window[swfName],this._timeout=setTimeout(function(){SwfStore[config.namespace].log("error","js","Timeout reached, assuming "+config.swf_url+" failed to load and firing the onerror callback."),config.onerror&&config.onerror()},1e3*config.timeout)},SwfStore.prototype={ready:!1,set:function(key,value){this._checkReady(),checkData(key),checkData(value),null===value||"undefined"==typeof value?this.swf.clear(key):this.swf.set(key,value)},get:function(key){return this._checkReady(),checkData(key),this.swf.get(key)},getAll:function(){this._checkReady();for(var pair,pairs=this.swf.getAll(),data={},i=0,len=pairs.length;len>i;i++)pair=pairs[i],data[pair.key]=pair.value;return data},clearAll:function(){var all=this.getAll();for(var key in all)all.hasOwnProperty(key)&&this.clear(key)},clear:function(key){this._checkReady(),checkData(key),this.swf.clear(key)},_checkReady:function(){if(!this.ready)throw"SwfStore is not yet finished initializing. Pass a config.onready callback or wait until this.ready is true before trying to use a SwfStore instance."},onload:function(){var that=this;setTimeout(function(){clearTimeout(that._timeout),that.ready=!0,that.config.onready&&that.config.onready()},0)},onerror:function(){clearTimeout(this._timeout),this.config.onerror&&this.config.onerror()}}}();

//Helper functions
try{
mySwfStore = new SwfStore({
  namespace: "game_altsave",
  swf_url: "storage.swf",
  onready: function() {
	console.log("swfStore loaded!");
  },
  onerror: function() {
	console.error('swfStore failed to load :(');
  }
});}
catch(err){};

function swfGetKey(key)
{
	if((mySwfStore != undefined) && (mySwfStore != null))
	{
		if(mySwfStore.ready)
		{
			value = mySwfStore.get(key);
			console.log(value);
			if(value == null)
				return "";
			else
				return value;
		}
		return "notReady";
	}
	return "notReady";
}

function swfSetKey(key, value)
{
	if((mySwfStore != undefined) && (mySwfStore != null))
	{
		if(mySwfStore.ready)
		{
			mySwfStore.set(key, value);
		}
	}
}