import { createPlayerObject, createPlayerElement } from './player.js';
import { getRoundResult, getMatchResult, startMatch } from './fight.js'

export const $arenas = document.body.querySelector('.arenas');
export const $formFight = document.querySelector('form.control');
const $startFight = document.querySelector('.startButtonWrap .button');

export const player = createPlayerObject(1, 'SUB-ZERO', 'm', 'subzero');
export const enemy = createPlayerObject(2, 'Sonya', 'f');

$arenas.appendChild(createPlayerElement(player));
$arenas.appendChild(createPlayerElement(enemy));

$startFight.addEventListener('click', function(e){
    startMatch.call($startFight);
})

$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    getRoundResult();
    getMatchResult();
}) 