import { createElemWithClass } from './utils.js';

export class Player {
    constructor({player, name, gender, img = name.toLowerCase(), hp = 100, weapon = {'head' : '35', 'body' : '30', 'foot' : '25'}}) {
        this.player = player;
        this.name = name;
        this.gender = gender;
        this.img = `http://reactmarathon-api.herokuapp.com/assets/${img}.gif`;
        this.totalHP = hp;
        this.currentHP = hp;
        this.diffHP = 0;
        this.weapon = weapon;
    }

    elHP(){return document.querySelector(`.player${this.player} .life`);}

    elHit(){return document.querySelector(`.player${this.player} .character`);}

    changeHP(hp){this.diffHP = this.currentHP > hp ? hp : this.currentHP; this.currentHP -= this.diffHP;}

    resetProp(prop){this[prop] = 0;}

    renderHP(){this.elHP().style.width = `${this.currentHP}%`;}

    renderHit(enemyHit){
        this.elHit().classList.add(`${enemyHit}Hit`);
        setTimeout(() => {this.elHit().classList.remove(`${enemyHit}Hit`)}, 1000)
    }

    createPlayerElement = () => { 
        const   $player = createElemWithClass('player' + this.player),
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
    
        $life.style.width = `${this.totalHP}%`;
        $name.innerText = this.name;
        $img.src = this.img;
    
        return $player;
    }

    getFightResult(enemy, player){
        const {hit : enemyHit, value : enemyValue} = enemy;
        const {defence : playerDefence} = player;
        
        if(enemyHit != playerDefence){
            this.changeHP(enemyValue);
            this.renderHP();
            this.renderHit(enemyHit);
            return 'hit';
        } else {
            this.resetProp('diffHP');
            return 'defence';
        }
    }
}


