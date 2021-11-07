class Space {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `space-${x}-${y}`;
        this.token = null;
        this.diameter = 76;
        this.radius = 76/2;
    }

/**
 * checks if associated space has a token with owner
 * @returns {null|object} returns owner
 */
    get owner() {
        if( this.token === null) {
            return null;
        } else {
            return this.token.owner;
        }
    }

    drawSVGSpace() {
        const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svgSpace.setAttributeNS(null, "id", this.id);
        svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "r", this.radius - 8);
        svgSpace.setAttributeNS(null, "fill", "black");
        svgSpace.setAttributeNS(null, "stroke", "none");

        document.getElementById("mask").appendChild(svgSpace);
    }

    /**
     * Updates space if token has been dropped into it
     * @param {object} the dropped token
     */
    mark(token) {
        this.token = token;
    }
}