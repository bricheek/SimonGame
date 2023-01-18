var gamePattern= [];
var buttonColors = ["red","blue","green","yellow"];
var userClickPattern = [];

var gameStarted = false;
var level = 0;

 $(document).keydown(function () {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted=true;
        }
    });

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel]===gamePattern[currentLevel]) { 
        console.log("Success");
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
    } 
    }   else {
        console.log("wrong");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");},300)
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    }



function nextSequence() {
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
}

function animatePress(currentColor) {
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");},100)
    }

function makeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    gameStarted = false;
    level = 0;
    gamePattern = [];
}
