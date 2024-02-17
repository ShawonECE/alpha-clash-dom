// utility functions

const hideElement = (id) => {
    const element = document.getElementById(id);
    element.classList.add('hidden');
};

const showElement = (id) => {
    const element = document.getElementById(id);
    element.classList.remove('hidden');
};

const play = () => {
    hideElement('home');
    showElement('playground');

    continueGame();
}

const playAgain = () => {
    hideElement('score-board');
    showElement('playground');
    reset();
    continueGame();
};

const reset = () => {
    setInnerText(0, 'score');
    setInnerText(5, 'life');
    const previousLetter = getInnerText('current-letter').toLowerCase();
    removeBackgroundColor(previousLetter);
};

const exit = () => {
    const playground = !document.getElementById('playground').classList.contains('hidden');
    const scoreboard = !document.getElementById('score-board').classList.contains('hidden');
    if (playground) {
        hideElement('playground');
    } else if (scoreboard) {
        hideElement('score-board');
    }
    showElement('home');
    reset();
};

const getRandomLetter = () => {
    const letters = `abcdefghijklmnopqrstuvwxyz`;
    const index = Math.floor(Math.random() * 26);

    return letters[index].toUpperCase();
};

const continueGame = () => {
    const letter = getRandomLetter();
    setInnerText(letter, 'current-letter');
    setBackgroundColor(letter.toLowerCase());
};

const getInnerText = (id) => {
    const element = document.getElementById(id);
    return element.innerText;
};

const setInnerText = (text, id) => {
    document.getElementById(id).innerText = text;
};

const setBackgroundColor = (id) => {
    document.getElementById(id).classList.add('bg-orange-500');
};

const removeBackgroundColor = (id) => {
    document.getElementById(id).classList.remove('bg-orange-500');
};

const gameOver = (score) => {
    hideElement('playground');
    showElement('score-board');
    setInnerText(score, 'final-score');
};

const handleKeyboardEvent = (event) => {
    const key = event.key;
    const expectedLetter = getInnerText('current-letter').toLowerCase();
    let score = parseInt(getInnerText('score'));
    let life = parseInt(getInnerText('life'));
    
    if (key === 'Enter' && !document.getElementById('home').classList.contains('hidden')) {
        play();
        return;
    }

    if (key === 'Enter' && !document.getElementById('score-board').classList.contains('hidden')) {
        playAgain();
        return;
    }

    if (key === 'Escape') {
        exit();
        return;
    }

    if (key === expectedLetter && !document.getElementById('playground').classList.contains('hidden')) {
        score = score + 1;
        setInnerText(score, 'score');
    } else if (key !== expectedLetter && !document.getElementById('playground').classList.contains('hidden')) {
        life = life - 1;
        setInnerText(life, 'life');
        if (life === 0) {
            gameOver(score);
        }
    }

    removeBackgroundColor(expectedLetter);
    continueGame();
};

// ----------------------------------------------------------------

document.getElementById('play-now').addEventListener('click', play);
document.getElementById('play-again').addEventListener('click', playAgain);
document.addEventListener('keyup', handleKeyboardEvent);
