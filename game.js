var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []

var started = false;

var level = 0;

$(".start-image").click(function(){
    if (!started) {
        $(".start-image").hide();
        $("#sub-title").text("Remember the color Sequence");
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(document).keypress(function() {
  if (!started) {
    $(".start-image").hide();
    $("#sub-title").text("Remember the color Sequence");
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log("User Clicked Pattern: " + userClickedPattern);  
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            
            nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("#sub-title").text("Your Score - " + (level-1));
      $(".start-image").attr("src", "restart.png");
      $(".start-image").show();
      startOver();
    }
}

function nextSequence(){
    
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log("Game Pattern: " + gamePattern);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}