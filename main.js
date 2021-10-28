import Game from './game.js';

const game = new Game({
    arenasEl : document.body.querySelector('.arenas'),
    formFightEl : document.querySelector('form.control'),
    btnFightEl : document.body.querySelector('.control .button'),
    startMatchEl : document.querySelector('.startButtonWrap .button'),
});

game.startMatchEl.addEventListener('click', function(e){
    game.startMatch();
})

game.formFightEl.addEventListener('submit', function(e){
    e.preventDefault();
    game.startRound();
})