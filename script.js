var scores, roundScore, activePlayer, gamePlaying; //, dice;

var lastDice;
init();


document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gamePlaying){
        //1.Random number
        var dice = Math.floor(Math.random() * 6) + 1;// put the Var inside cuz we cant access to the var from argument(function in method)
    
        //2. Display the result
        var diceDOM = document.querySelector(".dice");
         diceDOM.style.display = "block";
         diceDOM.src = "dice-" + dice + ".png";

    
         //3. Update the round score IF the rolled number was NOT a 1
         if (dice === 6 && lastDice === 6){
             //player looses score 
             scores[activePlayer] = 0;
             document.querySelector("#score-" + activePlayer).textContent = 0;
         } else if ( dice !==  1){ 
             //Add score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }else {
            //Next player
             nextPlayer();
        }
        
        lastDice = dice;//if u put var inside if statem
    }
})


document.querySelector(".btn-hold").addEventListener("click", function(){
    if (gamePlaying) {
        // Add CURENT score to GLOBAL score
        scores[activePlayer] += roundScore;
    
        // Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector(".final-score").value;
        var winningScore
        
        // Undefinde, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
             winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // Check if player won the game
        if (scores[activePlayer] >= winningScore){
            document.querySelector("#name-" + activePlayer).textContent = "winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer +"-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer +"-panel").classList.remove("active");
            gamePlaying = false;
         }else{        
            // Next player
            nextPlayer();  
    }}   
})
                                                     
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
        
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
        
    //document.querySelector(".player-0-panel").classList.remove("active");
    //document.querySelector(".player-1-panel").classList.add("active");
        
    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "player 1";
    document.querySelector("#name-1").textContent = "player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}
