class Controles {
    /**
     * Gère les entrées interactives (clavier, souris, touch tactile etc...)
     */
    constructor() {
        //c'est parti !
        this._ecouteBoutons();
        this._ecouteClavier();
    }
    /**
     * Méthode pour commencer à écouter le clavier
     * @private
     */
    _ecouteClavier(){
        //quand on appuie sur une touche du clavier
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
                return; // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
            }
            if(event.key === "a"){
                joueur1.monte();
            }
            if(event.key === "q"){
                joueur1.descend();
            }
            if(event.key === "p"){
                joueur2.monte();
            }
            if(event.key === "m"){
                joueur2.descend();
            }
            event.preventDefault(); // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
        }, true);

        //quand on relâche une touche du clavier
        //ici on utilise un switch plutôt que des if, c'est pareil, c'est juste une histoire de pain au chocolat vs chocolatine
        window.addEventListener("keyup", function (event) {
            if (event.defaultPrevented) {
                return; // je n'explique pas à quoi ça sert ça vous embrouillerait pour rien
            }
            switch (event.key) {
                case "a":
                case "q":
                    joueur1.bougePas()
                    break;
                case "p":
                case "m":
                    joueur2.bougePas()
                    break;
            }
            event.preventDefault(); // je n'explique pas à quoi ça sert ça vous embrouillerait sans raison
        }, true);
    }

    /**
     * écoute les interractions sur les boutons et réagit en fonction
     * @private
     */
    _ecouteBoutons(){

        // on va utiliser plusieurs styles de code pour faire à peu près la même chose...

        // 1 la méthode la plus simple, la plus lisible pour un débutant, mais aussi la plus longue si on veut gérer plein de touches à la fois

        //pour faire monter la raquette de gauche
        joueur1.$boutonMonte.on("mousedown touchstart", function (e) {
            e.preventDefault();
            joueur1.monte();
        });
        //pour arrêter de faire monter la raquette de gauche
        joueur1.$boutonMonte.on("mouseup touchend", function (e) {
            e.preventDefault();
            joueur1.bougePas()
        });

        // 2 Méthode un peu plus compacte qui permet de gérer 4 évènements différents sur un même élément

        joueur2.$boutonMonte.on("mousedown touchstart mouseup touchend", function (e) {
            console.log(e.type)
            e.preventDefault();
            switch (e.type){
                case "mousedown":
                case "touchstart":

                    console.log(e.type,"joueur2.monte()");

                    joueur2.monte();
                    break;

                case "mouseup":
                case "touchend":
                    joueur2.bougePas();
                    break;
            }
        });

        // 3 Méthode beaucoup moins lisible pour les débutants et bcp plus appréciée par les gens avec de l'expérience
        // cette méthode tire plein parti de jQuery.
        // l'avantage de cette dernière technique est qu'elle marcherait même si on avait 200 boutons à gérer d'un coup

        /**
         * Une seule variable qui regroupe deux boutons
         * @type {JQuery<HTMLElement>}
         */
        let $mesBoutons=joueur1.$boutonDescend.add(joueur2.$boutonDescend);

        // on aurait pu faire comme ça aussi (et ça aurait sélectionné nos 4 boutons d'un seul coup par leurs ids)
        //let $mesBoutons=$("#monte1,#monte2,#descend1,#descend2");

        // ou encore (et ça aurait sélectionné nos 4 boutons d'un seul coup par leurs classe css)
        //let $mesBoutons=$(".touche");

        $mesBoutons.on("mousedown touchstart mouseup touchend", function (e) {
            e.preventDefault();

            //d'abord on détermine quel joueur sera impacté

            /**
             * Le joueur sur qui portera ce qui va se passer
             * @type {Joueur}
             */
            let joueur=null;
            if($(this).is(".left")){
                joueur=joueur1;
            }else{ // donc $(this).is(".right")
                joueur=joueur2;
            }

            //ensuite, en fonction de l'évênement
            switch (e.type){
                case "mousedown":
                case "touchstart":
                    joueur.descend();
                    break;
                case "mouseup":
                case "touchend":
                    joueur.bougePas();
                    break;
            }
        });
    }
}