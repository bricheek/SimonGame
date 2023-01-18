//variable for button colors
var buttonColors = ["red","blue","green","yellow"];
//arrays to hold sequences of colors
var gamePattern= [];
var userClickPattern = [];

//variables for game started and level 
var gameStarted = false;
var level = 0;

//function at start of game, detects key down.
$(document).keydown(function () {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted=true;
        }
    });

//function to detect click on color, sound and animation.    
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length-1);
});

//function to check answer fromn user, end game if wrong, continue if correct.
function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel]===gamePattern[currentLevel]) { 
        //console.log("Success"); console logs for checking the checker
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
    } 
    }   else {
        // console.log("wrong"); checking the checker
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");},300)
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    }


//gets next color in sequence.
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

// function sequencePlayback() {
//     for (var i = 0; i <= level; i++) {
//         // setTimeout (function () {
//             $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
//             makeSound(gamePattern[i])} //,100);      
// }
// // }

// var looper = async function () {
//     for (var i = 1; i < level; i++) {
//       await new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
//             makeSound(gamePattern[i])
//         }, 500);
//       });
//     }
//     return true;
//   }
//   looper().then(function(){console.log("DONE!")});
  


//animates the click on color
function animatePress(currentColor) {
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");},100)
    }

//sound function for colors
function makeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//starts game over, called on wrong answer.
function startOver() {
    gameStarted = false;
    level = 0;
    gamePattern = [];
}
