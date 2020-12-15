class Perso extends ElementHtml{
    constructor($html) {
        super($html);
        this.$bulle=$html.find(".bulle");
        this.mots=[
            "Bof"
            ,"On s'emmerde un peu"
            ,"Fait chaud"
            ,"..."
            ,"Rolland Garros c'est mieux"
            ,"zyva l'autre avec sa raquette"
            ,"sont pas doués"
            ,"Ya koi ce soir à la télé?"
            ,"vive moi!"
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