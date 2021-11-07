let game = new Game();

let startbtn = document.querySelector('#begin-game');
startbtn.addEventListener('click', function() {
    game.startGame();

    this.style.display = 'none';
    document.getElementById('play-area').style.opacity = '1';
});

document.addEventListener('keydown', function(event) {
    game.handleKeyDown(event);
});