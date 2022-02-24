// Set up a wheel. Credit to Roku CB.
var score = 0;
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

var color = ['#5c5c8a','#52527a','#5c5c8a','#52527a','#5c5c8a','#52527a', "#5c5c8a", "#52527a", "#5c5c8a"];
var label = ['10', '200', '50', '100', '5', '500', '300', "75", "25"];
var slices = color.length;
var sliceDeg = 360/slices;
var deg = rand(0, 360);
var speed = 0;
var slowDownRand = 0;
var ctx = canvas.getContext('2d');
var width = canvas.width; // size
var center = width/2;      // center
var isStopped = false;
var lock = false;

function deg2rad(deg) {
  return deg * Math.PI/180;
}

function drawSlice(deg, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(center, center);
  ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
  ctx.lineTo(center, center);
  ctx.fill();
}

function drawText(deg, text) {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(deg2rad(deg));
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText(text, 130, 10);
  ctx.restore();
}

function drawImg() {
  ctx.clearRect(0, 0, width, width);
  for(var i=0; i<slices; i++){
    drawSlice(deg, color[i]);
    drawText(deg+sliceDeg/2, label[i]);
    deg += sliceDeg;
  }
}

function spinWheel() {
  (function anim() {
    drawImg();
    value = 0;
    $("#point-value").html("Point value is: " + value);
    deg += speed;
    deg %= 360;

    // Increment speed
    if(!isStopped && speed<3){
      speed = speed+1 * 0.1;
    }
    // Decrement Speed
    if(isStopped){
      if(!lock){
        lock = true;
        slowDownRand = rand(0.95, 0.96);
      }
      speed = speed>0.2 ? speed*=slowDownRand : 0;
    }
    // Stopped!
    if(lock && !speed){
      var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
      ai = (slices+ai)%slices; // Fix negative index
      value = label[ai];
      $("#point-value").show();
      $("#point-value").html("Point value is: " + value);
      $(".guesses").show();
      $("#solving-things").show();
    }
  window.requestAnimationFrame( anim );
}());

document.getElementById("spin").addEventListener("mousedown", function(){
  isStopped = true;
}, false);

}

// Defining the Puzzle object.
function Puzzle(phrase, hint) {
  this.phrase = phrase;
  this.hint = hint;
}

//Defining the Category object.
function Category(title) {
  this.title = title;
  this.puzzles = [];
}
var categories = [];
// Adding puzzles and pushing to categories.
var goneWithWind= new Puzzle("Frankly, my dear, I don't give a damn", "Gone With the Wind");
var wizardOz= new Puzzle("Toto, I've a feeling we're not in Kansas anymore", "Wizard of Oz");
var citizenKane = new Puzzle("Rosebud", "Citizen Kane");
var starWars = new Puzzle("May the Force be with you", "Star Wars");
var casaBlanca= new Puzzle("Here's looking at you, kid", "Casablanca");
var movieQuotes = new Category("Movie Quotes");
movieQuotes.puzzles.push(goneWithWind, wizardOz, citizenKane, starWars, casaBlanca);
categories.push(movieQuotes);

var confuscious = new Puzzle("Confuscious", "Chinese");
var immKant = new Puzzle("Immanuel Kant", "German");
var davHume = new Puzzle("David Hume", "English");
var petSing = new Puzzle("Peter Singer", "American");
var aristotle = new Puzzle("Aristotle", "Greek");
var philosophers = new Category("Famous Philosophers");
philosophers.puzzles.push(confuscious, immKant, davHume, petSing, aristotle);
categories.push(philosophers);

var hydrogen = new Puzzle("Hydrogen", "Lightest element");
var indium = new Puzzle("Indium", "Soft metal used in semiconductor");
var polSty = new Puzzle("Polystyrene", "Makes your coffee cups");
var erlen = new Puzzle("Erlenmeyer", "Popular flask type");
var spectro = new Puzzle("Spectroscopy", "A way of identifying elements");
var chemistry = new Category("Chemistry-related questions");
chemistry.puzzles.push(hydrogen, indium, polSty, erlen, spectro);
categories.push(chemistry);

// Gives a random number in a certain range, which we need to give a random selection from a certain category.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max-min+1))+min;
}

// Generates a new puzzle board given the randomly selected phrase.
function makeBoard(phrase) {
  var newPhrase = phrase.replace(/[a-zA-Z]/g, "?");
  questionArray= newPhrase.split("");
  var gameBoard = "";
  for (i=0;i<questionArray.length;i++) {
    var addedClass;
    if (questionArray[i] == " ") {
      addedClass = "space";
    } else if (questionArray[i] == "?") {
      addedClass = "letter";
    } else {
      addedClass = "not-letter";
    }
    gameBoard += "<div class=" + addedClass +" id='letter-" + i + "'></div>";
  }
  $("#gameboard").html(gameBoard);
  var notLetIndex = [];
  for (i=0;i<questionArray.length;i++) {
    if (/[a-z]/i.test(questionArray[i]) == false) {
      notLetIndex.push(i);
    }
  }
  for (i=0;i<notLetIndex.length;i++) {
    $("#letter-" + notLetIndex[i]).html(questionArray[notLetIndex[i]]);
  }
}

// Takes a user inputted guess and determines if it exists in the array. When completed, prompt to play again, and remove completed puzzle from options.
var guesses = [];
var lives = 5;
function makeGuess(letter) {
  var guess = $("input").val().toLowerCase();
  phraseArray = selectPhrase.split("");
  var counter = 0;
  if (/[a-z]/i.test(guess) == false || guess.length > 1) {
    $("#correctness").text("That's not allowed, try again!");
  } else {
    if (guesses == []) {
      guesses.push(guess);
    } else if ($.inArray(guess, guesses) != -1) {
        $("#correctness").text("You already guessed that!");
    } else {
        guesses.push(guess);
        var answerArray = [];
        for (i=0;i<phraseArray.length;i++) {
          if (guess == phraseArray[i].toLowerCase()) {
            answerArray.push(i);
          }
        }
        if (answerArray.length == 0) {
          $("#correctness").text("Guess Again!");
          lives--;
          $("#letter-guessed").append(guess + " ");
          $("#lives").html("Lives Remaining: " + lives);
          $("#guessing-things").hide();
          if (lives == 0) {
            $("#correctness").text("You lose!");
            $("#point-value").html("");
            $("form").hide();
            $(".wheel").hide();
            $(".play-again").show();
            $("#letter-guessed").hide().html("Incorrect Letters: ");
          }
        } else {
          $("#correctness").text("Correct!");
          for (i=0;i<answerArray.length;i++) {
            score += parseInt(value);
            var letter = phraseArray[answerArray[i]];
            phraseArray.splice[answerArray[i]];
            questionArray.splice[answerArray[i]];
            questionArray[answerArray[i]] = phraseArray[answerArray[i]];
            $("#letter-" + answerArray[i]).html(letter);
            $("#letter-" + answerArray[i]).css({"background-color": "white"})
            $("#point-total").html("Total points: " + score);
        }
        value = 0;
        $("#point-value").html("Point value is: 0");
        $("#guessing-things").hide();
        $("#solving-things").show();
        if (phraseArray.join("") == questionArray.join("")) {
          $("#correctness").text("You win!");
          $("#point-value").html("");
          $("form").hide();
          $(".wheel").hide();
          $(".play-again").show();
          $("#letter-guessed").hide().html("Incorrect Letters: ");
        }
      }
    }
  }
}

// Allows the user to input a string to attempt to solve the puzzle. If correct, display the solved puzzle. Else, lose a life.
function solvePuzzle(fullGuess) {
  var fullArray = fullGuess.toLowerCase().split("");
  var newPhraseArray = selectPhrase.split("");
  var lowerCaseArray = newPhraseArray.join("").toLowerCase().split("");
  if (fullArray.join("") == lowerCaseArray.join("")) {
    $("#correctness").text("You win!");
    $("#point-value").html("");
    $("form").hide();
    $(".wheel").hide();
    var gameBoard = "";
    for (i=0;i<newPhraseArray.length;i++) {
      var addedClass;
      if (newPhraseArray[i] == " ") {
        addedClass = "space";
      } else if (/[a-z]/i.test(newPhraseArray[i]) == true){
        addedClass = "letter";
      } else {
        addedClass = "not-letter";
      }
      gameBoard += "<div class=" + addedClass +" id='letter-" + i + "'></div>";
    }
    $("#gameboard").html(gameBoard);
    for (i=0;i<newPhraseArray.length;i++) {
      $("#letter-" + i).html(newPhraseArray[i]).css({"background-color": "white"});
    }
    $(".play-again").show();
    $("#letter-guessed").hide().html("Incorrect Letters: ");
    } else {
    $("#correctness").html("Incorrect!");
    lives--;
    $("#lives").html("Lives Remaining: " + lives);
  }
}

// Sets the movieQuote object so that when clicked, it gets a random puzzle and sets up the board.
$("#movieQuotes").click(function() {
  category = "Movie Quotes";
  randNum = getRandomInt(0, categories[0].puzzles.length - 1);
  if (categories[1].puzzles.length == 0) {
    $("#correctness").show().html("Out of movie quotes! Try another category!");
  } else {
  selectPhrase = categories[0].puzzles[randNum].phrase
  $(".initial-page").hide();
  $("#hint").html(movieQuotes.puzzles[randNum].hint);
  $("#correctness").html("");
  $(".wheel").show();
  $(".hint").show();
  drawImg();
  makeBoard(selectPhrase);
}})

// Sets the philosophers object so that when clicked, it gets a random puzzle and sets up the board.
$("#philosophers").click(function() {
  category = "Famous Philosophers";
  randNum = getRandomInt(0, categories[1].puzzles.length - 1);
  if (categories[1].puzzles.length == 0) {
    $("#correctness").show().html("Out of philosophy questions! Try another category!");
  } else {
  selectPhrase = categories[1].puzzles[randNum].phrase
  $(".initial-page").hide();
  $("#hint").html(philosophers.puzzles[randNum].hint);
  $("#correctness").html("");
  $(".wheel").show();
  $(".hint").show();
  drawImg();
  makeBoard(selectPhrase);
}})

// Sets the chemistry object so that when clicked, it gets a random puzzle and sets up the board.
$("#chemistry").click(function() {
  category = "Chemistry-related questions";
  randNum = getRandomInt(0, categories[2].puzzles.length - 1);
  if (categories[2].puzzles.length == 0) {
    $("#correctness").show().html("Out of chemistry questions! Try another category!");
  } else{
    selectPhrase = chemistry.puzzles[randNum].phrase
    $(".initial-page").hide();
    $("#hint").html(chemistry.puzzles[randNum].hint);
    $("#correctness").html("");
    $(".wheel").show();
    $(".hint").show();
    drawImg();
    makeBoard(selectPhrase);
  }
})

// Prevents the form object from doing its default page-switching nonsense and starts the guess function.
$("#guessing").click(function (e) {
  e.preventDefault();
  makeGuess($("#guess").val());
})

// Removes previous puzzle from the options, and returns the user to the inial load screen by hiding all previous elements.
$(".play-again").click(function() {
  for (i=0;i<categories.length;i++) {
    if (categories[i].title == category) {
      categories[i].puzzles.splice(randNum, 1);
    }
  }
  score = 0;
  lives = 5;
  $(".initial-page").show();
  $("#gameboard").html("");
  $(".new-game").hide();
  $("#lives").html("Lives Remaining: " + lives).hide();
  $("#correctness").html("");
  $("#point-total").html("Total points: 0").hide();
  // This line below should make the point value go away, but I can't get it to work. Leaving it in on the off chance I find a way to solve the issue.
  $(".wheel").hide();
  $("#hint").hide();
  guesses = [];
})

// Sets up the puzzle solve event
$("#solving").click(function (e) {
  e.preventDefault();
  solvePuzzle($("#solution").val());
})

// Sets up the wheel spin event.
$("#start-spin").click(function() {
  $("#point-value").hide();
  spinWheel();
  $(".initial-page").hide();
  $("#lives").show();
  $("form").show();
  $("#point-total").show();
  $(".wheel").show();
  isStopped = false;
})

// Gives user a hint
$(".hint").click(function() {
  $("#hint").show()
})
