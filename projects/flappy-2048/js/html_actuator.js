function HTMLActuator() {
  this.gridContainer    = document.querySelector(".grid-container");
  // this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.birdobj          = document.querySelector(".tile-bird");
  this.birdinn          = document.querySelector(".tile-bird .tile-inner");
  this.blockobja        = document.querySelector(".tile-block-a");
  this.blockobjb        = document.querySelector(".tile-block-b");
  this.blockobjc        = document.querySelector(".tile-block-c");
  this.blockobjd        = document.querySelector(".tile-block-d");
  this.blockinna        = document.querySelector(".tile-block-a .tile-inner");
  this.blockinnb        = document.querySelector(".tile-block-b .tile-inner");
  this.blockinnc        = document.querySelector(".tile-block-c .tile-inner");
  this.blockinnd        = document.querySelector(".tile-block-d .tile-inner");
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  var classes = ["tile", "tile-bird"];

  var s = Math.floor(metadata.score);

       if (s > 2048) classes.push("tile-super")
  else if (s > 1024) classes.push("tile-2048")
  else if (s >  512) classes.push("tile-1024")
  else if (s >  256) classes.push("tile-512")
  else if (s >  128) classes.push("tile-256")
  else if (s >   64) classes.push("tile-128")
  else if (s >   32) classes.push("tile-64")
  else if (s >   16) classes.push("tile-32")
  else if (s >    8) classes.push("tile-16")
  else if (s >    4) classes.push("tile-8")
  else if (s >    2) classes.push("tile-4")
  else               classes.push("tile-2");

  this.applyClasses(this.birdobj, classes);

  var zonesize = this.gridContainer.clientHeight;
  var morepos = 0.75 * (metadata.score - s);

  this.birdobj.style.top = metadata.birdpos * zonesize + "px";

  this.blockobja.style.top = [0.5 , 0   , 0   ][metadata.ab] * zonesize + "px";
  this.blockobjb.style.top = [0.75, 0.75, 0.25][metadata.ab] * zonesize + "px";
  this.blockobjc.style.top = [0.5 , 0   , 0   ][metadata.cd] * zonesize + "px";
  this.blockobjd.style.top = [0.75, 0.75, 0.25][metadata.cd] * zonesize + "px";

  this.blockobja.style.left = (0.5  - morepos) * zonesize + "px";
  this.blockobjb.style.left = (0.5  - morepos) * zonesize + "px";
  this.blockobjc.style.left = (1.25 - morepos) * zonesize + "px";
  this.blockobjd.style.left = (1.25 - morepos) * zonesize + "px";

  this.birdinn.textContent = s;

  window.requestAnimationFrame(function () {
    self.updateScore(s);
    self.updateBestScore(Math.floor(metadata.bestScore));
  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continue = function () {
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  // this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  //this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  if (difference > 0) {
    this.scoreContainer.textContent = this.score;

    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};
