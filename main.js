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

function changeHP(player){
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    const randomNumber = Math.ceil(Math.random() * 20);
    
    player.hp -= player.hp > randomNumber ? randomNumber : player.hp;

    $playerLife.style.width = player.hp + "%";
}

function getMatchResult(isDraw, name = null){
    const $matchResultTitle = createElemWithClass('matchResultTitle');

    $matchResultTitle.innerText = isDraw === 0 ? name + ' wins' : 'draw';

    $randomButton.disabled = true;

    return $matchResultTitle;
}

function getRoundResult(player1, player2){
    if(player1.hp > 0 && player2.hp > 0){
        return;
    }

    let $winner = '',
        $isDraw = 0;

    if(player1.hp != player2.hp){
        $winner = player1.hp > player2.hp ? player1.name : player2.name;
    } else {
        $isDraw = 1;
    }

    $arenas.appendChild(getMatchResult($isDraw, $winner))
}

function startRound(player1, player2){
    changeHP(player1);
    changeHP(player2);
    getRoundResult(player1, player2); 
}

const $arenas = document.body.querySelector('.arenas');
const $randomButton = document.body.querySelector('.button');

$randomButton.addEventListener('click', function(){
    startRound(player1, player2);
})

const player1 = createPlayerObject(1, 'SUB-ZERO', 'subzero');
const player2 = createPlayerObject(2, 'Scorpion');


$arenas.appendChild(createPlayer(player1) );
$arenas.appendChild( createPlayer(player2) );