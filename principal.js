//cena principal do jogo
export class Principal extends Phaser.Scene {
//cria as variáveis que serão usadas
    lula;
    teclado;
    tinta;
    plataforma;
    camarao;
    pontuacao = 0;
    placar;

    constructor() {
        super({key: "Principal"})
    }

//carrega as imagens que serão usadas
preload() {
    this.load.image('background', './assets/bg.jpg');
    this.load.spritesheet('player', './assets/squid.png', {
        frameWidth: 213,
        frameHeight: 235
    });
    this.load.image('tinta', './assets/tinta.png');
    this.load.image('plataforma_pedra','./assets/pedra.png')
    this.load.image('camarao', './assets/camarao.png')
    }

//cria as imagens que serão usadas
create() {
    // define a largura e a altura da tela
    const larguraJogo = 700;
    const alturaJogo = 850;

    //cria a imagem de fundo 
    this.add.image(larguraJogo/2, alturaJogo/2, 'background');

    //adiconar o fogo do moda tinta
    this.tinta = this.add.sprite(0,0,'tinta').setScale(0.2);
    this.tinta.setVisible(false);

    //cria animações da lula
    this.anims.create({
        key: 'lula',
        frames: this.anims.generateFrameNumbers('player', {
            start: 0,
            end: 4
        }),
        frameRate: 10,
        repeat: -1
    });

    //cria a lula em sprite e adiciona posição
    this.lula = this.physics.add.sprite(larguraJogo/2, 0, 'player').setScale(0.5);
    this.lula.body.setSize(150, 200)
    this.lula.anims.play("lula", true)

    //ativa os limites de tela
    this.lula.setCollideWorldBounds(true);
    this.teclado = this.input.keyboard.createCursorKeys();
    
    //adicionando a plataforma central
    this.plataforma = this.physics.add.staticImage(larguraJogo/2 - 40, alturaJogo/2, 'plataforma_pedra');
    //criando barreiras físicas para não ocuparem o mesmo espaço
    this.physics.add.collider(this.lula, this.plataforma);


    //cria o camarao com suas dimensões
    this.camarao = this.physics.add.sprite(larguraJogo/2, 0, 'camarao').setScale(0.5);
    this.camarao.setCollideWorldBounds(true); //o faz respeitar as bordas do limite do jogo
    this.camarao.setBounce(0.7); //define seu tamanho
    //definem a interação entre a lula, o alien2 e o camarao
    this.physics.add.collider(this.camarao, this.plataforma);


    //adicionando o placar
    this.placar = this.add.text(50, 50, 'Camarões: ' + this.pontuacao, {fontSize:'45px', fill: '#495613'});

    //acontecimentos no contato entre o jogador e o camarao
    this.physics.add.overlap(this.lula, this.camarao, function(){
        //camarao some após a coleta
        this.camarao.setVisible(false) 
        //sorteia a posição de queda do camarao no eixo X
        var posicaocamarao_X = Phaser.Math.RND.between(50, 650);
        //ajusta a posição do camarao ena queda
        this.camarao.setPosition(posicaocamarao_X, 100);
        //soma pontuação
        this.pontuacao +=1;
        //atualiza o placar com as novas camaraos
        this.placar.setText('Camarões:' + this.pontuacao);
        //ativa a visão da próximo camarao que cair
        this.camarao.setVisible(true);


    }, false, this);

    }



    update() {
    //movimenta para a esquerda
    if (this.teclado.left.isDown) {
        this.lula.setVelocityX(-150);
    }

    //movimento para a direita 
    else if (this.teclado.right.isDown) {
        this.lula.setVelocityX(150);
    }

    //player sem movimento horizontal
    else {
        this.lula.setVelocityX(0);
    }
    
    //movimento para cima com a tinta ligado
    if (this.teclado.up.isDown) {
        this.lula.setVelocityY(-150);
        this.ativarTinta();
    }

    //movimento pra baixo com a tinta desligado
    else {this.semTinta(); }

    //atualiza a posição da tinta em relação ao personagem
    this.tinta.setPosition(this.lula.x + 7, this.lula.y + this.lula.height / 4);

}
//ativa a tinta
    ativarTinta() {
    this.tinta.setVisible(true);

}
 //desativa a tinta o deixando "invisível"
    semTinta() {
    this.tinta.setVisible(false)
}

}