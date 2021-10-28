import { Player } from './player.js';
import { generateLogs } from './logs.js';
import { getRandom, getRandomArrayItem, createElemWithClass } from './utils.js'

export default class Game{
    constructor(props){
        this.player = new Player({
            player: 1, 
            name: 'SUB-ZERO', 
            gender: 'm', 
            img: 'subzero'
        }),
        this.enemy = new Player({
            player: 2, 
            name: 'Sonya', 
            gender: 'f', 
        })
        this.arenasEl = props.arenasEl;
        this.formFightEl = props.formFightEl;
        this.startMatchEl = props.startMatchEl;
        this.btnFightEl = props.btnFightEl;
    }

    /* Управление игрой */

    startMatch = () => {
        this.startMatchEl.style.display = 'none'
        this.formFightEl.style.display = 'flex'
        this.arenasEl.appendChild(this.player.createPlayerElement());
        this.arenasEl.appendChild(this.enemy.createPlayerElement());
        generateLogs('start', this.player, this.enemy);
    };

    startRound = () => {
        const enemyAttackObject = this.enemyAttack();
        const playerAttackObject = this.playerAttack();
    
        const playerFightType = this.player.getFightResult(enemyAttackObject, playerAttackObject);
        const enemyFightType = this.enemy.getFightResult(playerAttackObject, enemyAttackObject);
    
        generateLogs(playerFightType, this.player, this.enemy);
        generateLogs(enemyFightType, this.enemy, this.player);

        this.checkRoundResult()
    }

    checkRoundResult = () => {
        const {currentHP : pHP, name : pName} = this.player;
        const {currentHP : eHP, name : eName} = this.enemy;
    
        if(pHP === 0 || eHP === 0){
            
            this.btnFightEl.disabled = true;
            this.formFightEl.style.display = 'none';
            this.arenasEl.appendChild(this.createReloadButton());
    
            let winner = '';
    
            if(pHP === eHP){
                generateLogs('draw');
            } else if(pHP < eHP ){
                winner = eName;
                generateLogs('end', this.enemy, this.player);
            } else {
                winner = pName;
                generateLogs('end', this.player, this.enemy);
            }
            
            this.arenasEl.appendChild(this.shotResultText(winner))
        }
    }

    /* Вспомогательные функции */

    createReloadButton = () => {
        const   reloadWrap = createElemWithClass('reloadWrap'),
                reloadButton = createElemWithClass('button');

        reloadWrap.appendChild(reloadButton);

        reloadButton.innerText = 'Restart';

        reloadButton.addEventListener('click', function(){
            window.location.reload();
        })

        return reloadWrap;
    }

    shotResultText = (name) => {
        const $matchResultTitle = createElemWithClass('matchResultTitle');
    
        $matchResultTitle.innerText = name != '' ? `${name} wins` : 'draw';
    
        return $matchResultTitle;
    }

    enemyAttack = () => {
        const hit = Object.keys(this.enemy.weapon).getRandomArrayItem();
        const value = getRandom(this.enemy.weapon[hit]);
        const defence = Object.keys(this.player.weapon).getRandomArrayItem();
    
        return {hit, value, defence}
    };
    
    playerAttack = () => {
        let hit, value, defence;

        for(let item of this.formFightEl){
            if(item.checked === true && item.name === 'hit'){
                hit = item.value;
                value = getRandom(this.player.weapon[item.value]);
            }
            if(item.checked === true && item.name === 'defence'){
                defence = item.value;
            }
            item.checked = false;
        }
        
        return {hit, value, defence}
    }
}