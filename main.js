function createPlayerObject(playerNumber, name, img = name.toLowerCase(), hp = 100, weapon = ['hand', 'leg', 'head'], attack = 'Fight...'){
    const newObject = {
        player  : playerNumber,
        name    : name,
        hp      : hp,
        img     : 'http://reactmarathon-api.herokuapp.com/assets/' + img + '.gif',
        weapon  : weapon,
        attack  : function(){
            console.log(name + ' ' + attack);
        },
        elHP    : elHP,
        renderHP: renderHP,
        changeHP: changeHP,
    };

    return newObject;
}

function createElemWithClass(className, tag = 'div'){
    const $elem = document.createElement(tag);
    
    if(className) {
        $elem.className = className;
    }

    return $elem;
}

function createPlayer(object){
    
    const   $player = createElemWithClass('player' + object.player),
            $progressbar = createElemWithClass('progressbar'),
            $character = createElemWithClass('character'),
            $life = createElemWithClass('life'),
            $name = createElemWithClass('name'),
            $img = createElemWithClass('', 'img');

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $character.appendChild($img);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $life.style.width = object.hp + "%";
    $name.innerText = object.name;
    $img.src = object.img;

    return $player;
}

function createReloadButton(){
    const   $reloadWrap = createElemWithClass('reloadWrap'),
            $reloadButton = createElemWithClass('button');

    $reloadWrap.appendChild($reloadButton);

    $reloadButton.innerText = 'Restart';

    return $reloadWrap;
}

function getRandom(number){
    return Math.ceil(Math.random() * number);
}

function elHP(){
    return document.querySelector('.player' + this.player + ' .life');
}

function changeHP(hp){
    this.hp -= this.hp > hp ? hp : this.hp;
}

function renderHP(){
    this.elHP().style.width = this.hp + "%";
}

function shotResultText(name){
    const $matchResultTitle = createElemWithClass('matchResultTitle');

    $matchResultTitle.innerText = name != '' ? name + ' wins' : 'draw';

    return $matchResultTitle;
}

const $arenas = document.body.querySelector('.arenas');
const $randomButton = document.body.querySelector('.button');
const $reloadButton = createReloadButton();

const player1 = createPlayerObject(1, 'SUB-ZERO', 'subzero');
const player2 = createPlayerObject(2, 'Scorpion');

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$randomButton.addEventListener('click', function(){

    player1.changeHP(getRandom(20));
    player1.renderHP();
    player2.changeHP(getRandom(20));
    player2.renderHP();

    if(player1.hp === 0 || player2.hp === 0){

        $randomButton.disabled = true;
        $arenas.appendChild($reloadButton);

        let winner = player1.hp === player2.hp ? '' //draw
            : player1.hp < player2.hp ? player2.name : player1.name; //wins
        
        $arenas.appendChild(shotResultText(winner))

    }

})

$reloadButton.addEventListener('click', function(){
    window.location.reload();
})