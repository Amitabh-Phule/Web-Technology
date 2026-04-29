const board = document.getElementById('game-board');
const moveDisplay = document.getElementById('move-count');
const timerDisplay = document.getElementById('timer');
const startScreen = document.getElementById('start-screen');
const overlay = document.getElementById('overlay');
const message = document.getElementById('message');

// Audio
const sndStart = document.getElementById('snd-start');
const sndCorrect = document.getElementById('snd-correct');
const sndWinStart = document.getElementById('snd-win-start');
const sndError = document.getElementById('snd-error');
const sndMsd = document.getElementById('snd-msd');
const sndWow = document.getElementById('snd-wow');
const failLoop = [
    document.getElementById('snd-error'),
    document.getElementById('snd-fail2'),
    document.getElementById('snd-fail3'),
    document.getElementById('snd-fail4')
];

let cardsList = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🍍', '🍍', '🥝', '🥝', '🍉', '🍉'];
let flipped = [];
let moves = 0;
let timeLeft = 60;
let timer;
let mistakeCount = 0;

document.getElementById('start-btn').onclick = initGame;
document.getElementById('play-again-btn').onclick = initGame;

function initGame() {
    sndStart.play();
    startScreen.style.display = 'none';
    document.getElementById('game-info').style.display = 'block';
    board.style.display = 'grid';
    overlay.classList.remove('active');
    
    timeLeft = 60;
    moves = 0;
    mistakeCount = 0;
    flipped = [];
    moveDisplay.innerText = "0";
    timerDisplay.innerText = "60";

    createBoard();
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) endGame(false);
    }, 1000);
}

function createBoard() {
    board.innerHTML = '';
    const shuffled = [...cardsList].sort(() => Math.random() - 0.5);
    shuffled.forEach(symbol => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.innerHTML = `<div class="content">${symbol}</div>`;
        card.onclick = () => {
            if (flipped.length < 2 && !card.classList.contains('flipped')) {
                card.classList.add('flipped');
                flipped.push(card);
                if (flipped.length === 2) {
                    moves++;
                    moveDisplay.innerText = moves;
                    checkMatch();
                }
            }
        };
        board.appendChild(card);
    });
}

function checkMatch() {
    const [c1, c2] = flipped;
    if (c1.dataset.symbol === c2.dataset.symbol) {
        sndCorrect.play();
        c1.classList.add('matched');
        c2.classList.add('matched');
        flipped = [];
        mistakeCount = 0;
        if (document.querySelectorAll('.matched').length === cardsList.length) endGame(true);
    } else {
        failLoop[mistakeCount % failLoop.length].play();
        mistakeCount++;
        setTimeout(() => {
            c1.classList.remove('flipped');
            c2.classList.remove('flipped');
            flipped = [];
        }, 1000);
    }
}

function endGame(win) {
    clearInterval(timer);
    if (win) {
        sndWow.play();
        message.innerText = "YOU WIN! 🎉";
        overlay.classList.add('active');
    } else {
        // TIMEOUT SEQUENCE
        sndWinStart.play(); // Windows plays first
        
        setTimeout(() => {
            sndError.play();    // Error sound plays exactly with the message
            sndMsd.play();      // MSD Dialogue plays
            message.innerText = "Kya ho gaya hai tujhe?";
            overlay.classList.add('active');
        }, 3000); // 3 second delay to let Windows sound finish
    }
}