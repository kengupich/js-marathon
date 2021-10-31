import { createElemWithClass } from './utils.js';

export default class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.img = props.img
        this.totalHP = props.hp;
        this.currentHP = props.hp;
        this.diffHP = 0;
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


