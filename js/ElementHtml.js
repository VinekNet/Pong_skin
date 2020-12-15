
class ElementHtml {
    /**
     * La classe ElementHtml comme son nom l'indique est une classe qui reflète un élément HTML.
     * Cette classe n'est pas faite pour être utiliséee tel quel mais pour être éténdue (voir Balle, Raquette et Joueur)
     *
     * @param {JQuery<HTMLElement>} $element HTML Jquery principal auquel se réfèrent la hauteur, largeur etc...
     */
    constructor($element) {
        /**
         * L'élément HTML jQuery
         * @type {JQuery<HTMLElement>}
         */
        this.$element = $element;
        /**
         * Position en haut en pixels.
         * @type {number}
         */
        this.haut = 0;
        /**
         * Position à gauche en pixels.
         * @type {number}
         */
        this.gauche = 0;
        /**
         * Largeur de l'élément en pixels.
         * @type {number}
         */
        this.largeur = 0;
        /**
         * Hauteur de l'élément en pixels.
         * @type {number}
         */
        this.hauteur = 0;
    }

    /**
     * La position en bas
     * @returns {number}
     */
    get bas() {
        return this.haut + this.hauteur;
    }

    /**
     * Permet de définir le bas, ce qui influera logiquement sur le haut
     * @param {number} value
     */
    set bas(value) {
        this.haut = value - this.hauteur;
    }

    /**
     * La position à droite
     * @returns {number}
     */
    get droite() {
        return this.gauche + this.largeur;
    }

    /**
     * Permet de définir la position droite, ce qui influera logiquement sur la position gauche
     * @param {number} value
     */
    set droite(value) {
        this.gauche = value - this.largeur;
    }

    /**
     * Permet de définir les positions haut et gauche à partir du html/css
     */
    calculePositions() {
        this.gauche = parseInt(this.$element.css("left"));
        this.haut = parseInt(this.$element.css("top"));
    }

    /**
     * Permet de définir les dimension hauteur et largeur à partir du html/css
     */
    calculeTailles() {
        this.hauteur = this.$element.height();
        this.largeur = this.$element.width();
    }

    /**
     * Ajoute une classe css à l'élément et l'enlève juste après
     * @param {JQuery<HTMLElement>} $element
     * @param {string} classeCss
     */
    static effetCss($element, classeCss) {
        $element.addClass(classeCss);
        setTimeout(() => {
            $element.removeClass(classeCss);
        }, 100);
    }
}