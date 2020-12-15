class Audio{
    /**
     * Gère la partie audio du projet
     * @see https://createjs.com/getting-started/soundjs
     */
    constructor(){
        createjs.Sound.registerSound("sound/ping1.wav", "pong1");
        createjs.Sound.registerSound("sound/ping2.wav", "pong2");
        createjs.Sound.registerSound("sound/ping3.wav", "pong3");
        createjs.Sound.registerSound("sound/ping4.wav", "pong4");
        createjs.Sound.registerSound("sound/disappointment.wav", "disappointment");
    }
    /**
     * Joue une note aléatoirepa
     */
    playNote(){
        //let notes=["do","re","mi","fa","sol","la","si"];
        let notes=[
            "pong1"
            ,"pong2"
            ,"pong3"
            ,"pong4"
        ];
        let note =notes[Math.floor(Math.random() * notes.length)];
        createjs.Sound.play(note);

    }
    /**
     * Perdu
     */
    fausseNote(){
        createjs.Sound.play("disappointment");
    }
}