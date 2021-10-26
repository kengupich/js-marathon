import { createElemWithClass } from './utils.js';

export function createPlayerObject(player, name, gender, img = name.toLowerCase(), hp = 100, weapon = {'head' : '35', 'body' : '30', 'foot' : '25'}){
    let newObject = Object.create(character);

    newObject.player = player;
    newObject.name = name;
    newObject.gender = gender;
    newObject.img = `http://reactmarathon-api.herokuapp.com/assets/${img}.gif`;
    newObject.totalHP = hp;
    newObject.currentHP = hp;
    newObject.weapon = weapon;

    return newObject;
}

const character = {
    elHP,
    renderHP,
    changeHP,
    getFightResult,
};


function elHP(){
    return document.querySelector(`.player${this.player} .life`);
}

function changeHP(hp){
    this.currentHP -= this.currentHP > hp ? hp : this.currentHP;
}

function renderHP(){
    this.elHP().style.width = `${this.currentHP}%`;
}

function getFightResult(enemy, player){
    const {hit : enemyHit, value : enemyValue} = enemy;
    const {defence : playerDefence} = player;
    
    if(enemyHit != playerDefence){
        this.changeHP(enemyValue);
        this.renderHP();
        return 'hit';
    } else {
        return 'defence';
    }

}

export const createPlayerElement = (object) => { 

    const {player, name, totalHP, img} = object;
    
    const   $player = createElemWithClass('player' + player),
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

    $life.style.width = `${totalHP}%`;
    $name.innerText = name;
    $img.src = img;

    return $player;
}