import { getRandomArrayItem, normalize, changeGenderVerb } from './utils.js';

Array.prototype.getRandomArrayItem = getRandomArrayItem;

const $chat = document.querySelector('.chat');

export const generateLogs = (type, player = {}, enemy = {}) => {
    const date = new Date();
    const time = `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;

    let text = logs[type];
    const {name : enemyName, gender : enemyGender} = enemy;
    const {name : playerName, gender : playerGender, currentHP : playerCurrentHP, diffHP : playerDiffHP, totalHP : playerTotalHP} = player;
    
    const regGenderDefence = /(?<=Defence\](?:\s\S)*\s\S+)(лся|шел|вел|ал|ил|ул|ял)(?=\s|,)/g; // look for verbs for change gender
    const regGenderKick = /(?<=Kick\](?:\s\S)*\s\S+)(лся|шел|вел|ал|ил|ул|ял)(?=\s|,)/g; // look for verbs for change gender
    const regPlayer = /(\[player(?:1|Defence|Wins)\])/g; // look for player's name
    const regEnemy = /(\[player(?:2|Kick|Lose)\])/g; // look for enemy's name    
    
    const getReplacedText = (str, definitions = {}) => {
        const {changeTime = false, changeGender = false, symKick = '', symDef = ''} = definitions;

        if(changeTime === true){
            str = str
                    .replace('[time]', time)
        }
        
        if(changeGender === true){
            str = str
                    .replace(regGenderDefence, (word) => { return playerGender === 'f' ? changeGenderVerb(word) : word; })
                    .replace(regGenderKick, (word) => { return enemyGender === 'f' ? changeGenderVerb(word) : word; })
        }

        return str
                .replace(regPlayer, `<span class="playerChat">${symDef}${playerName}</span>`)
                .replace(regEnemy, `<span class="playerChat">${symKick}${enemyName}</span>`);
    }

    switch(type){
        case 'start': 
            text = getReplacedText(text, {changeTime: true})
            break;
        case 'hit': 
            text = getReplacedText(text.getRandomArrayItem(), {changeGender: true, symDef: '🛡️', symKick: '🥊'})
            text = `${time} - ${text} -${playerDiffHP} [${playerCurrentHP}/${playerTotalHP}]`;
            break;
        case 'defence':
            text = getReplacedText(text.getRandomArrayItem(), {changeGender: true, symDef: '🛡️', symKick: '❌'})
            text = `${time} - ${text}`;
            break;
        case 'draw':
            text = `${time} - ${text}`;
            break;
        case 'end':
            text = getReplacedText(text.getRandomArrayItem())
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
    "start": "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
    "end": [
      "Результат удара [playerWins]: [playerLose] - труп",
      "[playerLose] погиб от удара бойца [playerWins]",
      "Результат боя: [playerLose] - жертва, [playerWins] - убийца"
    ],
    "hit": [
      "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
      "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
      "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
      "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
      "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
      "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
      "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
      "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
      "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
      "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
      "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
      "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
      "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
      "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
      "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
      "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
      "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
      "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага."
    ],
    "defence": [
      "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
      "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
      "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
      "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
      "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
      "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
      "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
      "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение."
    ],
    "draw": "Ничья - это тоже победа!"
}