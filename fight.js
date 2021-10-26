import { getRandom, createElemWithClass, getRandomArrayItem} from './utils.js';
import { $arenas, $formFight, player, enemy } from './main.js';
import { generateLogs } from './logs.js';

Array.prototype.getRandomArrayItem = getRandomArrayItem;

const createReloadButton = () => {
    const   $reloadWrap = createElemWithClass('reloadWrap'),
            $reloadButton = createElemWithClass('button');

    $reloadWrap.appendChild($reloadButton);

    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function(){
        window.location.reload();
    })

    return $reloadWrap;
}

const $btnFight = document.body.querySelector('.control .button');

const shotResultText = (name) => {
    const $matchResultTitle = createElemWithClass('matchResultTitle');

    $matchResultTitle.innerText = name != '' ? `${name} wins` : 'draw';

    return $matchResultTitle;
}

const enemyAttack = () => {
    const hit = Object.keys(enemy.weapon).getRandomArrayItem();
    const value = getRandom(enemy.weapon[hit]);
    const defence = Object.keys(player.weapon).getRandomArrayItem();

    return {
        hit,
        value ,
        defence
    }
};

const playerAttack = () => {
    const attack = {};

    for(let item of $formFight){
        let {value, name, checked} = item;

        if(checked === true && name === 'hit'){
            attack.hit = value;
            attack.value = getRandom(player.weapon[value]);
        }
        if(checked === true && name === 'defence'){
            attack.defence = value;
        }

        item.checked = false;
    }

    return attack;
}

export const getRoundResult = () => {
    const enemyAttackObject = enemyAttack();
    const playerAttackObject = playerAttack();

    const playerFightType = player.getFightResult(enemyAttackObject, playerAttackObject);
    const enemyFightType = enemy.getFightResult(playerAttackObject, enemyAttackObject);

    generateLogs(playerFightType, player, enemy);
    generateLogs(enemyFightType, enemy, player);

}

export const getMatchResult = () => {
    const {currentHP : pHP, name : pName} = player;
    const {currentHP : eHP, name : eName} = enemy;

    if(pHP === 0 || eHP === 0){
        
        $btnFight.disabled = true;
        $formFight.style.display = 'none';
        $arenas.appendChild(createReloadButton());

        let winner = '';

        if(pHP === eHP){
            generateLogs('draw');
        } else if(pHP < eHP ){
            winner = eName;
            generateLogs('end', enemy, player);
        } else {
            winner = pName;
            generateLogs('end', player, enemy);
        }
        
        $arenas.appendChild(shotResultText(winner))
    }
}

export function startMatch(){
    this.style.display = 'none'
    $formFight.style.display = 'flex'
    generateLogs('start', player, enemy);
};
