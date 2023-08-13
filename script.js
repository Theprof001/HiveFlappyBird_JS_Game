document.addEventListener('DOMContentLoaded', () => {
    const hivey = document.querySelector('.hivey')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let hiveLeft = 220;
    let hiveBottom = 100;
    let gravity = 2;

    function startGame() {
        hiveBottom -= gravity;
        hivey.style.bottom = hiveBottom + 'px';
        hivey.style.left = hiveLeft + 'px';
    }

    let timerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            e.preventDefault();
            jump()
        }
    }

    function jump() {
        if (hiveBottom < 450) hiveBottom += 50;
        hivey.style.bottom = hiveBottom + 'px';
        console.log(hiveBottom);
    }
    document.addEventListener('keyup', control);


    function generateStructures() {
        let structuresLeft = 500
        let randomHeight = Math.random() * 60
        let structuresBottom = randomHeight
        const structures = document.createElement('div')
        structures.classList.add('structures')
        gameDisplay.appendChild(structures)
        structures.style.left = structuresLeft + 'px'
        structures.style.bottom = structuresBottom + 'px'


        function moveStructures() {
            structuresLeft -=2
            structures.style.left = structuresLeft + 'px'

            if (structuresLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(structures)
            }
        }
        let timerId = setInterval(moveStructures, 20)
        setTimeout(generateStructures, 3000)
        
    }

    generateStructures()
    // clearInterval(timerId);
});