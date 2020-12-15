class Joueur extends ElementHtml{
    /**
     * Représente un joueur.
     *
     * @param {JQuery<HTMLElement>} $raquette L'élément HTML de la raquette
     * @param {JQuery<HTMLElement>} $score L'élément HTML du score
     * @param {JQuery<HTMLElement>} $boutonMonte L'élément HTML du bouton pour monter
     * @param {JQuery<HTMLElement>} $boutonDescend L'élément HTML du bouton pour descendre
     */
    constructor($raquette,$score,$boutonMonte,$boutonDescend){
        super($raquette);
        /**
         * La raquette est l'élément pricipal auquel se rapporte la hauteur, largeur, etc, mais on le nomme $raquette ici pour éviter les confusions
         * @type {JQuery<HTMLElement>}
         */
        this.$raquette=this.$element;
        /**
         * L'endroit où on va écrire le score du joueur
         * @type {JQuery<HTMLElement>}
         */
        this.$score=$score;
        /**
         * Le bouton pour monter
         * @type {JQuery<HTMLElement>}
         */
        this.$boutonMonte=$boutonMonte;
        /**
         * Le bouton pour descendre
         * @type {JQuery<HTMLElement>}
         */
        this.$boutonDescend=$boutonDescend;
        /**
         * Le score du joueur
         * @type {number}
         */
        this.score=0;
        /**
         * La vitesse de déplacement de la raquette
         * @type {number}
         */
        this.vitesseY=5;
        /**
         * Direction dans laquelle se déplace la raquette
         * -1 vers le haut
         * 1 vers le bas
         * 0 ne bouge pas
         * @type {number}
         */
        this.directionY=0;
        this.calculePositions();
        this.calculeTailles();

    }
    /**
     * Fait monter la raquette
     */
    monte(){
        this.$raquette.attr("sens","monte")
        this.$boutonMonte.addClass("flash");
        this.directionY=-1;
    }
     /**
     * Fait descendre la raquette
     */
    descend(){
         this.$raquette.attr("sens","descend")
        this.$boutonDescend.addClass("flash");
        this.directionY=1;
    }
     /**
     * arrête la raquette
     */
    bougePas(){
         this.$raquette.attr("sens","")
         this.$boutonMonte.add(this.$boutonDescend).removeClass("flash");
        this.directionY=0;
    }
    /**
     * Fait en sorte que la raquette ne sorte pas du terrain
     * @private
     */
    _limiteMouvements(){
        if(this.haut < terrain.haut){
            this.haut=terrain.haut;
        }
        if(this.bas > terrain.hauteur){
            this.bas = terrain.hauteur;
        }
    }
    /**
     * Fait bouger (ou pas) la raquette
     */
    bouge(){
        this.haut+= this.vitesseY * this.directionY;
        this._limiteMouvements();
        this._rafraichitHTML();
    }
    /**
     * Fait gagner des points au joueur
     * @param {Number} points Les points gagnés
     */
    incrementeScore(points){
        this.score+=points;
        this._effetScore();
        this.$score.text(this.score);
    }
    /**
     * Effet visuel (et sonore) qui se produit quand on touche la balle
     */
    effetToucheBalle(){
        ElementHtml.effetCss(this.$raquette,"touche-balle");
        audio.playNote();
    }
    /**
     * Effet visuel qui se produit quand on gagne des points
     * @private
     */
    _effetScore(){
        ElementHtml.effetCss(this.$score,"flash");
    }
    /**
     * Appelé quand le joueur gagne un échange
     */
    gagne(){
        //on aumente son score
        this.incrementeScore(10);
        this._rafraichitHTML();
        audio.fausseNote();
        partie.demarreNouveauJeu();
    }
    /**
     * Applique les valeurs en CSS
     * @private
     */
    _rafraichitHTML(){
        this.$element.css("top", this.haut); 
    }
    
}

