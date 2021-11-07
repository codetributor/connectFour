class Player {
   constructor(name, id, color, active = false) {
       this.name = name;
       this.id = id;
       this.color = color;
       this.active = active;
       this.tokens = this.createTokens(21);
   } 

   /**
    * Creates token objects for player
    * @param {integer} num - Number of tokens 
    * @returns {array} token - array of tokens
    */

   createTokens(num) {
    let tokens = [];
    for(let i = 0; i < num; i++) {
        let token = new Token(i, this);
        tokens.push(token);
     }
     return tokens;
    }

/**
 * Gets all the unused tokens
 * @returns {array} of unused tokens
 */
    get unusedTokens() {
        return this.tokens.filter( token => !token.dropped);
    }

    /**
     * gets the active token by returning first token in unused array
     * @return {object}
     */

    get activeToken() {
        return this.unusedTokens[0];
    }
    /**
     * Check the amount of tokens
     * @returns {boolean} false equal no more tokens
     */
    checkTokens() {
        return this.unusedTokens.length === 0? false : true;
    }

}

