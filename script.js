document.addEventListener('DOMContentLoaded', function() {
    const character = document.getElementById('character');
    const fallingObject = document.getElementById('falling-object');
    const gameContainer = document.querySelector('.game-container');
    let characterPosition = 50;
    let fallingObjectPosition = { top: 0, left: 50 };
    let score = 0;

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' && characterPosition > 0) {
            characterPosition -= 5;
        } else if (event.key === 'ArrowRight' && characterPosition < 100) {
            characterPosition += 5;
        }
        character.style.left = `${characterPosition}%`;
    });

    function moveFallingObject() {
        fallingObjectPosition.top += 5;
        if (fallingObjectPosition.top > 100) {
            fallingObjectPosition.top = 0;
            fallingObjectPosition.left = Math.random() * 100;
        }
        fallingObject.style.top = `${fallingObjectPosition.top}%`;
        fallingObject.style.left = `${fallingObjectPosition.left}%`;
        checkCollision();
    }

    function checkCollision() {
        const characterRect = character.getBoundingClientRect();
        const fallingObjectRect = fallingObject.getBoundingClientRect();

        if (
            characterRect.left < fallingObjectRect.right &&
            characterRect.right > fallingObjectRect.left &&
            characterRect.top < fallingObjectRect.bottom &&
            characterRect.bottom > fallingObjectRect.top
        ) {
            score++;
            fallingObjectPosition.top = 0;
            fallingObjectPosition.left = Math.random() * 100;
           
            document.getElementsByClassName("result")[0].innerHTML = `Score: ${score}`;
        }
    }

    setInterval(moveFallingObject, 150);
});
