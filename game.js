var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red","blue","green","yellow"];

var started = false;

var level = 0;

$(document).keypress(function() {
    if(!started){

        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});



function nextSequence(){

    level++;

    $("#level-title").text("Level "+level);


    var randomNumber = Math.floor(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    

}

$(".btn").click(function (event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatepress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatepress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}






