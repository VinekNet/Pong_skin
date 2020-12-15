class Terrain extends ElementHtml{
    constructor($element){
        super($element);
        this.calculeTailles();
        /**
         * L'écran qui s'affiche au début de la partie avec les instuctions
         * @type {JQuery<HTMLElement>}
         */
        this.$ecranDebut = $(".ecran-debut");
    }

    /**
     * Masque l'écran de demarrage
     */
    masqueEcranDebut(){
        //masque ecran de début
        this.$ecranDebut.addClass("invisible");
    }
    /**
     * Met le terrain en mode pause
     */
    affichePause(){
        this.$element.addClass("pause")
    }

    /**
     * Met le terrain en mode play
     */
    affichePlay(){
        this.$element.removeClass("pause")
    }
}