class Token {
    constructor(index, owner, dropped) {
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

/**
 * Gets associated HTML token
 * @return {element} HTML element associated with object
 */
    get htmlToken() {
        return document.getElementById(this.id);
    }

    /**
     * Gets left offset or html element
     * @returns {string} - Let offset of token's object htmlToken
     */
    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }

/**
 * Draws new HTML token
 */
    drawHTMLToken() {
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    /**
     * moves token left column
     */
    moveLeft() {
        if(this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        }
    }

    moveRight(columns) {
        if(this.columnLocation < columns - 1) {
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation += 1;
        }
    }

    /**
     * Drops HTML token to target board space
     * @param {object} Target space for dropped token
     * @param {function} The reset function is to be call after
     */
    drop(target, reset) {
        this.dropped = true;

        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }
}

