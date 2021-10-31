import Player from './player.js';
import FetchGameApi from './fetchGameApi.js';
import { generateLogs } from './logs.js';
import { createElemWithClass } from './utils.js'

export default class Game{
    constructor(props){
        this.player = new Player({
            ...JSON.parse(localStorage.getItem('player1')),
            player: 1
        }),
        this.enemy = new Player({
            ...JSON.parse(localStorage.getItem('player2')),
            player: 2
        })
        this.arenasEl = props.arenasEl;
        this.formFightEl = props.formFightEl;
        this.btnFightEl = props.btnFightEl;
    }

    /* Управление игрой */

    startMatch = () => {
        this.arenasEl.appendChild(this.player.createPlayerElement());
        this.arenasEl.appendChild(this.enemy.createPlayerElement());
        generateLogs('start', this.player, this.enemy);
    };

    async startRound(){
        
        const {hit, defence} = this.playerAttack();

        const {player1 : playerFightObject, player2 : enemyFightObject} = await FetchGameApi.getFightObjects(hit, defence);
    
        const playerFightType = this.player.getFightResult(enemyFightObject, playerFightObject);
        const enemyFightType = this.enemy.getFightResult(playerFightObject, enemyFightObject);
    
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
            window.location.pathname = 'index.html';
        })

        return reloadWrap;
    }

    shotResultText = (name) => {
        const $matchResultTitle = createElemWithClass('matchResultTitle');
    
        $matchResultTitle.innerText = name != '' ? `${name} wins` : 'draw';
    
        return $matchResultTitle;
    }
    
    playerAttack = () => {
        let hit, defence;

        for(let item of this.formFightEl){
            if(item.checked === true && item.name === 'hit'){
                hit = item.value;
            }
            if(item.checked === true && item.name === 'defence'){
                defence = item.value;
            }
            item.checked = false;
        }
        
        return {hit, defence}
    }
}