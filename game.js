import { Principal } from "./principal.js";
import { Welcome } from "./welcome.js";

// relaciona 
const config = {
    type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT
        },
        autoCenter: Phaser.Scale.CENTER,
        width: 400, //largura da tela do jogo
        height: 600, //altura da tela do jogo
        backgroundColor: '#39addd',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: true 
            }
        },
        parent: "game",
        dom:{
        createContainer: true,
        },
        scene: [Welcome, Principal]
    };

// aplica as configurações definidas anteriormente
const game = new Phaser.Game(config);
