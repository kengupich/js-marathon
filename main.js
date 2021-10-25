function createPlayerObject(player, name, sex, img = name.toLowerCase(), hp = 100, weapon = ['hand', 'leg', 'head'], attack = 'Fight...'){
    const newObject = {
        player,
        name,
        sex,
        hp,
        img     : `http://reactmarathon-api.herokuapp.com/assets/${img}.gif`,
        weapon,
        attack  : function(){
            console.log(`${name} ${attack}`);
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

    $life.style.width = `${object.hp}%`;
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
    return document.querySelector(`.player${this.player} .life`);
}

function changeHP(hp){
    this.hp -= this.hp > hp ? hp : this.hp;
}

function renderHP(){
    this.elHP().style.width = `${this.hp}%`;
}

function shotResultText(name){
    const $matchResultTitle = createElemWithClass('matchResultTitle');

    $matchResultTitle.innerText = name != '' ? `${name} wins` : 'draw';

    return $matchResultTitle;
}

function normalize(num){
    return num.toString().length > 1 ? num : `0${num}`;
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

function playerAttack(){
    const attack = {};

    for(let item of $formFight){
        if(item.checked === true && item.name === 'hit'){
            attack.hit = item.value;
            attack.value = getRandom(HIT[item.value]);
        }
        if(item.checked === true && item.name === 'defence'){
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
}

function getRoundResult(enemyObject, enemy, player){
    if(enemy.hit != player.defence){
        this.changeHP(enemy.value);
        this.renderHP();
        generateLogs('hit', this, enemyObject, enemy.value, this.hp);
    } else {
        generateLogs('defence', this, enemyObject);
    }
}

function getMatchResult(){
    if(player1.hp === 0 || player2.hp === 0){
        
        $btnFight.disabled = true;
        $formFight.style.display = 'none';
        $arenas.appendChild(createReloadButton());

        let winner = '';

        if(player1.hp === player2.hp){
            generateLogs('draw');
        } else if(player1.hp < player2.hp ){
            winner = player2.name;
            generateLogs('end', player2, player1);
        } else {
            winner = player1.name;
            generateLogs('end', player1, player2);
        }
        
        $arenas.appendChild(shotResultText(winner))
    }
}

function changeSexVerb(wordEnd){
    switch(wordEnd){
        case 'лся':
            return 'лась';
        case 'ел':
            return 'ла';
        default:
            return `${wordEnd}а`;
    }
}

function generateLogs(type, player, enemy, diffHP){
    let text = logs[type];
    const date = new Date();
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
    const regSexDefence = /(?<=Defence\]\s*\S*\s\S+)(лся|ел|ал|ил|ул|ял)(?=\s|,)/g;
    const regSexKick = /(?<=Kick\]\s*\S*\s\S+)(лся|ел|ал|ил|ул|ял)(?=\s|,)/g;
    const regPlayer = /(\[player(?:1|Defence|Wins)\])/g;
    const regEnemy = /(\[player(?:2|Kick|Lose)\])/g;
    
    switch(type){
        case 'start': 
            text = text
                    .replace('[time]', time)
                    .replace(regPlayer, player.name)
                    .replace(regEnemy, enemy.name);
            break;
        case 'hit': 
            text = text[getRandom(text.length) - 1]
                    .replace(regSexDefence, function(word){
                        return player.sex === 'f' ? changeSexVerb(word) : word;
                    })
                    .replace(regPlayer, player.name)
                    .replace(regSexKick, function(word){
                        return enemy.sex === 'f' ? changeSexVerb(word) : word;
                    })
                    .replace(regEnemy, enemy.name);
            text = `${time} - ${text} -${diffHP} [${player.hp}/100]`;
            break;
        case 'defence':
            text = text[getRandom(text.length) - 1]
                    .replace(regSexDefence, function(word){
                        return player.sex === 'f' ? changeSexVerb(word) : word;
                    })
                    .replace(regSexKick, function(word){
                        return enemy.sex === 'f' ? changeSexVerb(word) : word;
                    })
                    .replace(regPlayer, player.name)
                    .replace(regEnemy, enemy.name);
            text = `${time} - ${text}`;
            break;
        case 'draw':
            text = `${time} - ${text}`;
            break;
        case 'end':
            text = text[getRandom(text.length) - 1]
                    .replace(regPlayer, player.name)
                    .replace(regEnemy, enemy.name);
            text = `${time} - ${text}`;
            break;
        default:
            text = 'Бойцы решили немного передохнуть - война войной, а обед по расписанию'
            break;
    }
                    
    const el = `<p>${text}</p>`;

    $chat.insertAdjacentHTML('afterbegin', el)
}


const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const $arenas = document.body.querySelector('.arenas');
const $btnFight = document.body.querySelector('.button');
const $formFight = document.querySelector('form.control');
const $chat = document.querySelector('.chat');

const player1 = createPlayerObject(1, 'SUB-ZERO', 'm', 'subzero');
const player2 = createPlayerObject(2, 'Sonya', 'f');

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function(e){
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();
    
    player1.getRoundResult(player2, enemy, player);
    player2.getRoundResult(player1, player, enemy);

    getMatchResult();
}) 