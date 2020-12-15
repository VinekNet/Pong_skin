class Balle extends ElementHtml {
    /**
     * Une balle de PONG avec tout ce qui va avec:
     * gestion des rebonds
     * gestion des accélérations
     * gestion des rebonds légèrement différents selon où la balle touche la raquette
     * gestion des parties gagnées /perdues
     *
     * @param {JQuery<HTMLElement>} $element Jquery de la balle
     */
    constructor($element) {
        super($element);
        /**
         * selon si -1 ou 1 ira vers la gauche ou vers la droite
         * @type {Number}
         */
        this.directionX = 0;
        /**
         * selon si -1 ou 1 ira vers le haut ou vers le bas
         * @type {Number}
         */
        this.directionY = 0;
        /**
         * vitesse de déplacement en x et y qui sera impactée par directionX et directionY
         * @type {Number}
         */
        this.vitesse = 0;

        //seront définis ultérieurement par calculeTailles()

        /**
         * vitesse de déplacement maximum pour éviter que le jeu devienne injouable
         * @type {Number}
         */
        this.vitesseDepart = 0;
        /**
         * vitesse de déplacement maximum pour éviter que le jeu devienne injouable
         * @type {Number}
         */
        this.vitesseMax = 0;
        /**
         * vitesse d'accelération qu'on incrémente à chaque toucher de raquette
         * @type {Number}
         */
        this.acceleration = 0;

        //c'est parti !
        this.calculePositions();
        this.calculeTailles();
        this.calculeVariablesQuiDependentDeLaTailleDeLEcran();
    }

    /**
     * Inverse la direction de la balle suite à un rebond haut ou bas
     */
    inverseDirectionY() {
        this.directionY *= -1;
    }
    /**
     * Dis à la balle d'aller vers la gauche
     * @private
     */
    _vaVersLaGauche() {
        this.directionX = -1;
    }
    /**
     * Dis à la balle d'aller vers la droite
     * @private
     */
    _vaVersLaDroite() {
        this.directionX = 1;
    }

    /**
     * Dis à la balle de ne pas bouger
     */
    bougePas() {
        this.directionY = 0;
        this.directionX = 0;
    }

    /**
     * Recentre la balle et lui donne une direction aléatoire
     */
    reinitialiser() {
        this.vitesse = this.vitesseDepart;
        this._recentre();
        this._directionAleatoire();
    }

    /**
     * Recentre la balle
     * @private
     *
     */
    _recentre() {
        this.gauche = terrain.largeur / 2 - this.largeur / 2;
        this.haut = terrain.hauteur / 2 - this.hauteur / 2;
    }

    /**
     * Donne une direction X et Y aléatoire à la balle
     * @private
     */
    _directionAleatoire() {
        //Angle de direction de la balle en aléatoire
        this.directionY = Math.random() * 0.3;
        if (Math.random() > 0.5) {
            this.inverseDirectionY();
        }

        //direction de la balle gauche droite en aléatoire
        if (Math.random() > 0.5) {
            this._vaVersLaGauche();
        } else {
            this._vaVersLaDroite();
        }
    }


    /**
     * Calcule certaines propriétés qui sont proportionelles à la taille du jeu
     * Est appelé plus haut quand on redimensionne l'écran et que la taille du jeu change
     */
    calculeVariablesQuiDependentDeLaTailleDeLEcran() {
        this.vitesseMax = terrain.largeur / 100;
        this.acceleration = terrain.largeur / 2000;
        this.vitesseDepart = terrain.largeur / 400;
    }
    /**
     * accelère la balle (avec une petite limite quand même)
     * @private
     */
    _accelere() {
        if (this.vitesse < this.vitesseMax) {
            this.vitesse += this.acceleration;
        } else {
            this.vitesse = this.vitesseMax
        }
    }

    /**
     * Selon où la balle rebondit sur la raquette du joueur on adapte l'angle de rebond (donc la vitesse Y de la balle)
     * @param {Joueur} joueur
     * @private
     */
    _devieDirection(joueur) {
        //valeur entre 0 et 1
        let facteur = (this.bas - joueur.haut) / (joueur.hauteur + this.hauteur);
        //valeur entre -0.5 et 0.5
        facteur = facteur - 0.5;
        //valeur entre -1 et 1
        facteur*=2;
        //facteur va influer (et non pas définir) sur la direction.
        this.directionY = (facteur + this.directionY) / 2;
    }
    /**
     * Fait bouger la balle en fonction des paramètres
     */
    bouge() {
        this.haut += this.vitesse * this.directionY;
        this.gauche += this.vitesse * this.directionX;
        this._limiteMouvements();
        this._rafraichitHTML();
    }
    /**
     * Gère les cas de dépassement du terrain et ce que cela induit
     * les rebonds en haut et en bas
     * les touchers de raquettes avec rebonds, effets, accélération et trajectoire déviée
     * Les cas où un deux deux joueurs perd
     * @private
     */
    _limiteMouvements() {
        //murs en haut et en bas
        if (this.haut < terrain.haut || this.bas > terrain.bas) {
            //inverse la direction Y
            this.inverseDirectionY();
            this.haut += this.vitesse * this.directionY;
            audio.playNote();
        }

        //raquettes
        if (this._toucheJoueur1() || this._toucheJoueur2()) {

            if (this._toucheJoueur1()) {
                joueur1.effetToucheBalle();
                this._devieDirection(joueur1);
                this._vaVersLaDroite();
            }
            if (this._toucheJoueur2()) {
                joueur2.effetToucheBalle();
                this._devieDirection(joueur2);
                this._vaVersLaGauche();
            }
            this.gauche += this.vitesse * this.directionX;
            //si on touche une raquette on accélère la balle
            this._accelere();
        }
        //perdu ?
        if (this._toucheCoteGauche()) {
            joueur2.gagne();
        }
        if (this._toucheCoteDroite()) {
            joueur1.gagne();
        }
    }

    /**
     * Renvoie true si la balle touche le joueur 1
     * @private
     * @returns {boolean}
     */
    _toucheJoueur1() {
        //pour une version alternative de ce code regardez _toucheJoueur2()
        if (this.gauche < joueur1.droite) {
            if (this.bas > joueur1.haut) {
                if (this.haut < joueur1.bas) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Renvoie true si la balle touche le joueur 2
     * @private
     * @returns {boolean}
     */
    _toucheJoueur2() {
        //pour une version alternative (plus lisible mais plus longue) de ce code regardez _toucheJoueur1()
        return this.droite > joueur2.gauche && (this.bas > joueur2.haut && this.haut < joueur2.bas);
    }

    /**
     * Renvoie true si la balle touche la gauche du terrain
     * @private
     * @returns {boolean}
     */
    _toucheCoteGauche() {
        //pour voir une version plus jolie de ce code regardez _toucheCoteDroite()
        if (this.gauche < terrain.gauche) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Renvoie true si la balle touche la droite du terrain
     * @private
     * @returns {boolean}
     */
    _toucheCoteDroite() {
        //c'est une version plus élégante de toucheGauche()
        return this.droite > terrain.droite;
    }
    /**
     * Applique les valeurs en CSS
     * @private
     */
    _rafraichitHTML() {
        this.$element.css("top", this.haut);
        this.$element.css("left", this.gauche);
    }
}