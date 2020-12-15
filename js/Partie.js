class Partie {
    /**
     * La classe Partie répresente un échange dans la partie
     */
    constructor() {
        let me=this;
        /**
         * La partie est elle en pause ou non ?
         * @type {boolean} 
         */
        this._enPause = true;

        /**
         * Le bouton pour démarrer une partie
         * @type {JQuery<HTMLElement>}
         */
        this.$btnGo = $(".btn-go");

        this.$btnGo.on("click",function (e) {
            e.preventDefault();
            me.demarreNouveauJeu();
            //plein écran
            //$("body")[0].requestFullscreen();
        });
        me.demarreNouveauJeu();
        /**
         * Liste des personnages dans le bublic
         * @type {Perso[]}
         */
        this.persos=[];
        // construit tous les Peso
        $(".perso").each(function(){
            let p=new Perso($(this));
            me.persos.push(p);
        });

        //une boucle qui fait tourner notre jeu
        setInterval(() => {
            joueur1.bouge();
            joueur2.bouge();
            if (!me._enPause) {
                balle.bouge();
            }
            if(Math.random()>0.996){
                let persoAleatoire=me.persos[Math.floor(Math.random() * me.persos.length)];
                persoAleatoire.parle(persoAleatoire.motAleatoire);
            }
        }, 10);
        //une boucle toutes les 3 secondes qui recalculte les positions et dimenssions au cas où l'écran change de tailleaa
        setInterval(
            function () {
                terrain.calculeTailles();
                joueur1.calculeTailles();
                joueur2.calculeTailles();
                joueur1.calculePositions();
                joueur2.calculePositions();
                balle.calculeTailles();
                balle.calculePositions();
                
            }, 3000
        );
    }
    /**
     * Masque l'écran de début, fait une pause de 3 secondes et lance la balle !
     */
    demarreNouveauJeu() {
        terrain.masqueEcranDebut();
        this.enPause = true;
        balle.bougePas();
        let me = this;
        //stope pendant 3 secondes
        setTimeout(
            function () {
                me.enPause = false;
                balle.reinitialiser();
            },
            3000
        );
    }

    /**
     * Savoir si la partie est en pause
     * @returns {boolean}
     */
    get enPause() {
        return this._enPause;
    }

    /**
     * Définir si la partie est en pause
     * @param {boolean} value
     */
    set enPause(value) {
        this._enPause = value;
        if(this._enPause){
            terrain.affichePause();
        }else{
            terrain.affichePlay();
        }
    }
}