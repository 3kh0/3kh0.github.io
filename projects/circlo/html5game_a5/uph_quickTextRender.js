function drawCanvasTextFast(device, x, y, text, maxWidth, font, color, align, baseline, alpha)
{
	var ctx = device;
	ctx.fillStyle = color;
	ctx.font = font;
	ctx.textAlign = align;
	ctx.textBaseline = baseline;
	ctx.globalAlpha = alpha;
	if(maxWidth === -1)
		ctx.fillText(text, x, y);
	else
		ctx.fillText(text, x, y, maxWidth);
	ctx.globalAlpah = 1;
}