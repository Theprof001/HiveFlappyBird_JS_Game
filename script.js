document.addEventListener('DOMContentLoaded', () => {
    const hivey = document.querySelector('.hivey')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let hiveLeft = 220;
    let hiveBottom = 100;
    let gravity = 2;
    let isGameOver = false
    let gap = 430

    function startGame() {
        if (!isGameOver) {
        hiveBottom -= gravity;
        hivey.style.bottom = hiveBottom + 'px';
        hivey.style.left = hiveLeft + 'px';

        if (hiveBottom <= 0) {
            gameOver();
        }
    }
}
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32 && !isGameOver) {
            e.preventDefault();
            jump()
        }
    }

    function jump() {
        if (hiveBottom < 500) hiveBottom += 50;
        hivey.style.bottom = hiveBottom + 'px';
        console.log(hiveBottom);
    }
    document.addEventListener('keyup', control);


    function generateStructures() {
        let structuresLeft = 500
        let randomHeight = Math.random() * 60
        let structuresBottom = randomHeight
        const structures = document.createElement('div')
        const topStructures = document.createElement('div')
        if (!isGameOver) {
        structures.classList.add('structures')
        topStructures.classList.add('topStructures')
        }
        gameDisplay.appendChild(structures)
        gameDisplay.appendChild(topStructures)
        structures.style.left = structuresLeft + 'px'
        topStructures.style.left = structuresLeft + 'px'
        structures.style.bottom = structuresBottom + 'px'
        topStructures.style.bottom = structuresBottom + gap + 'px'


        function moveStructures() {
            structuresLeft -=2
            structures.style.left = structuresLeft + 'px'
            topStructures.style.left = structuresLeft + 'px'

            if (structuresLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(structures)
                gameDisplay.removeChild(topStructures)
            }
            if (
                structuresLeft > 200 && structuresLeft < 270 && hiveLeft === 220 && (hiveBottom < structuresBottom + 150 || hiveBottom > structuresBottom + gap -200) ||
                hiveBottom === 0
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveStructures, 20)
        if (!isGameOver) setTimeout(generateStructures, 3000)
    }

    generateStructures()

    function gameOver() {
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)

    }
    // clearInterval(timerId);
});