class Perso extends ElementHtml{
    constructor($html) {
        super($html);
        this.$bulle=$html.find(".bulle");
        this.mots=[
            "Bof"
            ,"Il tourne bien le singe"
            ,"Fait chaud"
            ,"..."
            ,"Rolland Garros c'est mieux"
            ,"Cool des bananes"
            ,"Y a un truc qui contrôle les barils?"
            ,"On devrait pas l'attaquer?"
            ,"Comment on explique ça au boss?"
        ];
    }
    parle(blabla){
        let ici=this;
        this.$bulle.text(blabla);
        setTimeout(function(){
            ici.$bulle.text("");
        },1500);
    }

    /**
     * Renvoie un mot aléatoire
     * @returns {string}
     */
    get motAleatoire(){
        return this.mots[Math.floor(Math.random() * this.mots.length)];
    }

}