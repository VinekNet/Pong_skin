/**
 * Le terrain
 * @type {Terrain}
 */
let terrain=new Terrain($(".terrain"));
/**
 * La balle
 * @type {Balle}
 */
let balle=new Balle($(".balle"));
/**
 * Le joueur à gauche
 * @type {Joueur}
 */
let joueur1=new Joueur($(".joueur1"),$(".score1"),$("#monte1"),$("#descend1"));

/**
 * Le joueur à droite
 * Ici, pour que ce soit plus lisible, on saute des lignes mais c'est pareil que pour joueur 1
 * @type {Joueur}
 */
let joueur2=new Joueur(
    $(".joueur2"),
    $(".score2"),
    $("#monte2"),
    $("#descend2")
);

/**
 * Gère les inerractions utilisateurs (les mamifères qui jouent au jeu), clavier, tactile...
 * @type {Controles}
 */
let controles=new Controles();
/**
 * un peu de musique ?
 * @type {Audio}
 */
let audio=new Audio();
/**
 * contrôle la partie, pause, écran de démarrage etc...
 * @type {Partie}
 */
let partie=new Partie();
