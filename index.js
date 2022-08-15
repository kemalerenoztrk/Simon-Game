var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

function nextSequence(){
    var buttonColors=["red", "blue","green","yellow"];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $("h1").text("Level "+level);

    setTimeout(function(){
        console.log("New Level");
        gameSound();
    },1500);
    
}


function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function gameSound(){
    var i=0;
    setInterval(function(){
        animatePress(gamePattern[i]);
        playSound(gamePattern[i]);
        i++;
    },1000);
}

var counter=0;//counter of checkAnswer
function checkAnswer(answer){

    if(answer===gamePattern[counter]){
        counter++;

        if(counter===gamePattern.length){
            counter=0;
            nextSequence();
        }
        
    }
    else{
        playSound("wrong");
        counter=0;
        started=false;
        level=0;
        gamePattern=[];

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        return;
        
    }
    
}

$(document).keypress(function(){
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        started = true;
        nextSequence();
      }
});

$(".btn").click(function(){
    
    if(started===true){
        $("#" + this.id).fadeIn(100).fadeOut(100).fadeIn(100);
    userClickedPattern.push(this.id);
    animatePress(this.id);
    playSound(this.id);
    checkAnswer(this.id);  
}

    else{
        animatePress(this.id);
    }


    
});

