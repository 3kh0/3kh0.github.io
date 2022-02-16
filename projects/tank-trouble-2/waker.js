"use strict";

var timer_id = -1;
var timer_running = false;

function startTimer()
{
	if (timer_running)
		return;
	
	timer_running = true;
	timer_id = setInterval(tick, 16);
};

function stopTimer()
{
	if (!timer_running)
		return;
	
	timer_running = false;
	clearInterval(timer_id);
	timer_id = -1;
};

function tick()
{
	if (!timer_running)
		return;
	
	self.postMessage("tick");
};

self.addEventListener("message", function (e)
{
	var cmd = e.data;
	
	if (!cmd)
		return;
	
	if (cmd === "start")
	{
		startTimer();
	}
	else if (cmd === "stop")
	{
		stopTimer();
	}
	
}, false);