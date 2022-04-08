function drawBorder() {
    canvas.beginPath();
	canvas.rect(os.x, os.y, cwh(CANVAS_WIDTH), cwh(CANVAS_HEIGHT));
	canvas.lineWidth = cwh(4);
	canvas.strokeStyle = "black";
	canvas.stroke();
}