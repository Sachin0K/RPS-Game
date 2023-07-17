window.onload = beginAnimation();
let computerSelection;
let playerSelection;
let computerScore =0;
let playerScore = 0;

let buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');
const main = document.querySelector('main');
const endAlert = document.querySelector('#end-alert');
const endDesc =  document.querySelector('#end-desc');
const returnMainBtn = document.querySelector('#retry-btn');
const desc = document.querySelector('#desc3');
const container = document.querySelector("#results-container");
const playerHand = document.querySelector(".player-hand");
const computerHand = document.querySelector(".computer-hand");

body.addEventListener('click', skipAnime());
body.addEventListener('keydown',skipAnime());

function skipAnime() {
    const span = document.querySelectorAll('span');
    
    span.forEach((span) => {
        span.classList.add('skip');
    });
}

function beginAnimation() {
    fadeIn();

    const desc1 = document.querySelector('#desc1');
    let desc1Span = desc1.querySelectorAll('span');

    desc1Span = Array.from(desc1Span);

    const desc2 = document.querySelector('#desc2');
    const desc3 = document.querySelector('#desc3');

    desc1Span[desc1Span.length - 1].ontransitionend = () => {
        desc1.classList.add("fade-out");

        desc1.addEventListener('animationend',() => {
            desc1.classList.add('disappear');
            desc1.classList.remove('animate');
            desc2.classList.remove('disappear');
            desc2.classList.add('animate');

            fadeIn();

            let desc2Span = desc2.querySelectorAll('span');

            desc2Span = Array.from(desc2Span);
            
            desc2Span[desc2Span.length - 1].ontransitionend = () => {
                    
                    desc2.classList.add("fade-out");
                    desc2.addEventListener("animationend", () => {
                        
                    desc2.classList.add('disappear');
                    desc2.classList.remove('animate');
                    desc3.classList.remove('disappear');
                    desc3.classList.add('animate');
                        
                    fadeIn();
                    let desc3Span = desc3.querySelectorAll("span");
                    desc3Span = Array.from(desc3Span);

                    desc3Span[desc3Span.length - 1].ontransitionend = () => {
                        const cyf = document.querySelector('#cyf');
                        cyf.classList.add("drop-down");

                        cyf.addEventListener('animationend', () => {
                            const gameCtn = document.querySelector("#game-container");

                            setTimeout(function () {
                                gameCtn.classList.add("fade-in");
                            }, 300);
                        });
                }
            })};
        });
    };
}
function fadeIn(){
    let text = document.querySelector(".animate");
    let strText =text.textContent;
    let splitText = strText.split("");
    text.textContent = "";

    for(let i = 0; i < splitText.length; i++) {
        text.innerHTML += `<span>${splitText[i]}</span>`
    }

    let char =0;
    let timer = setInterval(onTick, 50);

    function onTick() {
        const span = text.querySelectorAll('span')[char];
        span.classList.add('fade');
        char++;

        if(char === splitText.length)
        {
            complete();
            return;
        }
    }
    
    function complete() {
        clearInterval(timer);
        timer = null;
    }
}
const hands = document.querySelectorAll(".hands img");


buttons.forEach((button) => {
    button.addEventListener('click',() => {
        
        
        const img = button.querySelector('img');
        playerSelection =img.alt.toLowerCase();
        computerSelection = computerPlay();

        playerHand.src = `./image/rock.png`;
        computerHand.src = `./image/rock.png`;
            
            hands.forEach(hand => {
                hand.addEventListener("animationend", function() {
                    this.style.animation = "";
                });
            });
            
            setTimeout(() => {
            playRound(playerSelection, computerSelection);
                        
            if((playerScore === 5) || (computerScore === 5))
            {   
                declareWinner();
            }
                //Update Images
            playerHand.src = `./image/${playerSelection}.png`;
            computerHand.src = `./image/${computerSelection}.png`;
            },2000);
            


            playerHand.style.animation = "shakePlayer 2s ease";
            computerHand.style.animation = "shakeComputer 2s ease";


        
    });
});

const myArray = ["rock","paper","scissors"];

function computerPlay ()
{
    return myArray[~~(Math.random()*myArray.length)];
}

function playRound(playerSelection,computerSelection){
    
    computerSelection =computerSelection.toLowerCase();
    playerSelection = playerSelection.toLowerCase();

    if(playerSelection == computerSelection)
    {
        displayResults("Tie Game!");
    }
    else if(
        (computerSelection == "rock" && playerSelection == "scissors") || 
        (computerSelection == "paper" && playerSelection == "rock") || 
        (computerSelection == "scissors" && playerSelection == "paper") 
    )
    {
        computerScore = ++computerScore;
        keepCpuScore();

        if (computerScore === 1) {
                displayResults(
                `Oh no! You lost.
                ${capitalize(computerSelection)} beats ${playerSelection}.`
                );
        } else if (computerScore === 2) {
                displayResults(
                `Arghh. ${capitalize(
                    computerSelection
                )} beats ${playerSelection}. Give it another shot!`
                );
        } else if (computerScore === 3) {
                displayResults(
                `${capitalize(
                    computerSelection
                )} beats ${playerSelection}. It's ok. You got this!!`
                );
        } else if (computerScore === 4) {
                displayResults(
                `Oh no. It's match point!! ${capitalize(
                    computerSelection
                )} beats ${playerSelection}. Don't let us down!`
                );
        } else {
                displayResults(`${computerSelection} beats ${playerSelection}`);
        }
    }
    else{
        playerScore = ++playerScore;
        keepPlayerScore();
        if (playerScore === 1) {
        displayResults(
            `Lets go!!! You won.
            ${capitalize(playerSelection)} beats ${computerSelection}.`
        );
        } else if (playerScore === 2) {
        displayResults(
            `You're pretty good at this. ${capitalize(
            playerSelection
            )} beats ${computerSelection}.`
        );
        } else if (playerScore === 3) {
        displayResults(
            `${capitalize(
            playerSelection
            )} beats ${computerSelection}! Has mankind found its savior??`
        );
        } else if (playerScore === 4) {
        displayResults(
            `${capitalize(
            playerSelection
            )} beats ${computerSelection}. One more and you're a hero!`
        );
        } else {
        displayResults(`${playerSelection} beats ${computerSelection}`);
        }
    }
}
function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
function displayResults(str) {
    container.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-out",
    });
    container.textContent = str;
}
function declareWinner() {
    rplContent();
    if (playerScore > computerScore) {
        endDesc.textContent = "You win! It's your day";
        returnMainBtn.innerText = "Play Again";
    } else {
        endDesc.textContent = "You lost... Well Play ";
        returnMainBtn.innerText = "Try Again?";
    }
    fadeIn();

    let endDescSpan = endDesc.querySelectorAll("span");
    endDescSpan = Array.from(endDescSpan);

    endDescSpan[endDescSpan.length - 1].ontransitionend = () => {
        returnMainBtn.classList.add("fade-in");
        /*returnMainBtn.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 00,
        fill: "forwards",
        iterations: 1,
        delay: 0,
        easing: "ease-in",
        });*/
    };
}
function rplContent() {
    main.classList.add("disappear");
    endAlert.classList.remove("disappear");
    desc.classList.remove("animate");
    endDesc.classList.add("animate");
    returnMainBtn.addEventListener("click", () => {
    main.classList.remove("disappear");
    endAlert.classList.add("disappear");
    desc.classList.add("animate");
    returnMainBtn.classList.remove("fade-in");
    resetGame();
    });
}
function resetGame() {
    fadeIn();
    container.textContent = "";
    playerScore = 0;
    computerScore = 0;
    playerHand.src = `./image/rock.png`;
    computerHand.src = `./image/rock.png`;
    keepPlayerScore();
    keepCpuScore();
}
function keepPlayerScore() {
    let playerScoreBox = document.querySelector("#player-score");

    playerScoreBox.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-out",
    });

    playerScoreBox.textContent = playerScore;
}
function keepCpuScore() {
    let computerScoreBox = document.querySelector("#computer-score");

    computerScoreBox.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    fill: "forwards",
    iterations: 1,
    delay: 0,
    easing: "ease-out",
    });

    computerScoreBox.textContent = computerScore;
}