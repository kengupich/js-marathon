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
    elHit,
    renderHP,
    changeHP,
    renderHit,
    getFightResult,
};


function elHP(){
    return document.querySelector(`.player${this.player} .life`);
}

function elHit(){
    return document.querySelector(`.player${this.player} .character`);
}

function changeHP(hp){
    this.currentHP -= this.currentHP > hp ? hp : this.currentHP;
}

function renderHP(){
    this.elHP().style.width = `${this.currentHP}%`;
}

function renderHit(enemyHit){
    console.log(enemyHit + "Hit")
    this.elHit().classList.add(`${enemyHit}Hit`);
    setTimeout(() => {this.elHit().classList.remove(`${enemyHit}Hit`)}, 1000)
}

function getFightResult(enemy, player){
    const {hit : enemyHit, value : enemyValue} = enemy;
    const {defence : playerDefence} = player;
    
    if(enemyHit != playerDefence){
        this.changeHP(enemyValue);
        this.renderHP();
        this.renderHit(enemyHit);
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