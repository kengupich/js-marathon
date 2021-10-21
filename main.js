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
        elHP,
        renderHP,
        changeHP,
        getRoundResult,
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

    $reloadButton.addEventListener('click', function(){
        window.location.reload();
    })

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

function enemyAttack(){
    const hit = ATTACK[getRandom(3) - 1];
    const value = getRandom(HIT[hit]);
    const defence = ATTACK[getRandom(3) - 1];

    return {
        hit,
        value,
        defence
    }
}

function getRoundResult(enemy, attack){
    if(enemy.hit != attack.defence){
        this.changeHP(enemy.value);
        this.renderHP();
    }
}

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const $arenas = document.body.querySelector('.arenas');
const $btnFight = document.body.querySelector('.button');
const $formFight = document.querySelector('form.control');

const player1 = createPlayerObject(1, 'SUB-ZERO', 'subzero');
const player2 = createPlayerObject(2, 'Scorpion');

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$formFight.addEventListener('submit', function(e){
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = {};

    for(let item of this){
        if(item.checked === true && item.name === 'hit'){
            attack.hit = item.value;
            attack.value = getRandom(HIT[item.value]);
        }
        if(item.checked === true && item.name === 'defence'){
            attack.defence = item.value;
        }
        item.checked = false;
    }
    
    player1.getRoundResult(enemy, attack);
    player2.getRoundResult(attack, enemy);

    if(player1.hp === 0 || player2.hp === 0){
        
        $btnFight.disabled = true;
        $arenas.appendChild(createReloadButton());

        let winner = 
                player1.hp === player2.hp 
                ? '' //draw
                : player1.hp < player2.hp ? player2.name : player1.name; //wins
        
        $arenas.appendChild(shotResultText(winner))
    }
})