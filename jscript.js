let score = JSON.parse(localStorage.getItem('score')) || 
{
    win:0,
    loss:0,
    tie:0
};

updateScoreElement();

//console.log(score);

//dealing with Auto Play button

document.querySelector('.auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
});

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalID=setInterval(function () {
            playGame(pickComputerMove());
        }, 1000);
        isAutoPlaying=true;
        document.querySelector('.auto-play-button').innerHTML="Stop Playing";
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
        document.querySelector('.auto-play-button').innerHTML="Auto Play";
    }

}

//ends here

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});


document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key==='s') {
        playGame('scissors');
    } else if (event.key==='a') {
        autoPlay();
    } else if (event.key==='Backspace') {
        displayWarning();
    }
})

function displayWarning() {
    document.querySelector('.warningMessage').innerHTML = `Are you sure you want to reset the score?<button class="yes">Yes</button><button class="no">No</button>`

    document.querySelector('.yes').addEventListener('click', () => {
        resetScore();
        document.querySelector('.warningMessage').innerHTML = "";
    })

    document.querySelector('.no ').addEventListener('click', () => {
        document.querySelector('.warningMessage').innerHTML = "";
    })
}

function resetScore() {

    score.win = 0;
    score.loss = 0;
    score.tie = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

function playGame(playerMove) {

    const computerMove=pickComputerMove();

    let result = '';

    if (playerMove==='scissors') {
            if (computerMove==='rock') {

                result='You lose.';
                score.loss++;
            
            } else if (computerMove==='paper') {

                result='You win.';
                score.win++;

            } else {

                result='Tie.';
                score.tie++;

            }
    } else if (playerMove==='rock') {
            if (computerMove==='scissors') {

                result='You win.';
                score.win++;

            } else if (computerMove==='paper') {

                result='You lose.';
                score.loss++;

            } else {

                result='Tie.';
                score.tie++;

            }
    } else if (playerMove==='paper') {
            if (computerMove==='rock') {

                result='You win.';
                score.win++;

            } else if (computerMove==='scissors') {

                result='You lose.';
                score.loss++;

    } else {

                result='Tie.';
                score.tie++;

            }
        }


    localStorage.setItem('score', JSON.stringify(score)); //to avoid score being reset every time we refresh the page -> only stores strings so need to convert

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
            <img src="images/${playerMove}-emoji.png" class="game-icon">
            <img src="images/${computerMove}-emoji.png" class="game-icon"> Computer`;

}

function updateScoreElement() {
                document.querySelector('.js-score')
                .innerHTML = `Wins: ${score.win}, Losses: ${score.loss}, Ties:${score.tie}`;
}

function pickComputerMove() {
        const randomNumber = Math.random();

        let computerMove= '';

        if (randomNumber>=0 && randomNumber<1/3) {
                computerMove='rock';
        } else if (randomNumber>=1/3 && randomNumber<2/3) {
                computerMove='paper';
        } else if (randomNumber>=2/3 && randomNumber<1) {
                computerMove='scissors';
        }

        return computerMove;
}
