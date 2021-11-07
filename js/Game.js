class Game {
    constructor(board, players, ready) {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    /**
     * Get actuve player
     * @returns {object} active player
     */
    get activePlayer() {
        return this.players.find(player => player.active);
    }

    createPlayers(name,) {

        let players = [];


        let player1 = new Player('player 1', 1, "#e15258", true);
        players.push(player1);
        let player2 = new Player('player 2', 2, "#e59a13");
        players.push(player2);

        return players;
    }

    /**
     * get game ready
     */

    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true
    }

    handleKeyDown(e) {
        if (this.ready) {
            if (e.key === 'ArrowLeft') {
                this.activePlayer.activeToken.moveLeft();
            } else if (e.key === 'ArrowRight') {
                //move right
                this.activePlayer.activeToken.moveRight(this.board.columns)
            } else if (e.key === 'ArrowDown') {
                //play token
                this.playToken();
            }
        }
    }

    playToken() {
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;

        for (let space of targetColumn) {
            if (space.token === null) {
                targetSpace = space;
            }
        }

        if (targetSpace !== null) {
            game.ready = false;
            activeToken.drop(targetSpace, function() {
                game.updateGameState(activeToken, targetSpace)
            });
        }
    }

    /**
     * Checks if there is a winner after each drop
     * @param {object} targeted space for drop
     * @returns {boolean} true if game is won, false if it is not
     */

    checkForWin(target) {
        const owner = target.token.owner;
        let win = false;

        // vertical
        for (let x = 0; x < this.board.columns; x++) {
            for (let y = 0; y < this.board.rows - 3; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x][y + 1].owner === owner &&
                    this.board.spaces[x][y + 2].owner === owner &&
                    this.board.spaces[x][y + 3].owner === owner) {
                    win = true;
                }
            }
        }
        //horizontal
        for (let x = 0; x < this.board.columns - 3; x++) {
            for (let y = 0; y < this.board.rows - 3; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x + 1][y].owner === owner &&
                    this.board.spaces[x + 2][y].owner === owner &&
                    this.board.spaces[x + 3][y].owner === owner) {
                    win = true;
                }
            }
        }
        //diagnol top left to down right
        for (let x = 3; x < this.board.columns; x++) {
            for (let y = 0; y < this.board.rows - 3; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x - 1][y + 1].owner === owner &&
                    this.board.spaces[x - 2][y + 2].owner === owner &&
                    this.board.spaces[x - 3][y + 3].owner === owner) {
                    win = true;
                }
            }
        }
        //diagnol top right down left
        for (let x = 3; x < this.board.columns; x++) {
            for (let y = 3; y < this.board.rows; y++) {
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x - 1][y - 1].owner === owner &&
                    this.board.spaces[x - 2][y - 2].owner === owner &&
                    this.board.spaces[x - 3][y - 3].owner === owner) {
                    win = true;
                }
            }
        }
        return win;
    }
    switchPlayers() {
        for( let player of this.players) {
            player.active = player.active === true ? false : true;
        }
    }
    /**
     * Shows game over
     * @param {string}} message "Game OVER"
     */
    gameOver(message) {
        const gameOver = document.querySelector('#game-over');
        gameOver.style.display = "block";
        gameOver.textContent = message;
    }
    updateGameState(token, target) {
        target.mark(token);

        if(!this.checkForWin(target)) {

            this.switchPlayers();

            if( this.activePlayer.checkTokens() ) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            } else {
                this.gameOver('No more tokens')
            }
        } else {
            this.gameOver(`${target.owner.name} wins`);
        }
    }
}