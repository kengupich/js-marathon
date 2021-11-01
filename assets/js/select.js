import FetchGameApi from './modules/fetchGameApi.js';
import { createElemWithClass } from './modules/utils.js';

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

function createEmptyPlayerBlock() {
    const el = createElemWithClass(['character', 'div11', 'disabled']);
    const img = createElemWithClass('', 'img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');

    const player2 = await FetchGameApi.getRandomPlayer();
    localStorage.setItem('player2', JSON.stringify(player2));

    const players = await FetchGameApi.getPlayers();

    let imgSrc = null;
    createEmptyPlayerBlock();


    players.forEach(item => {
        const el = createElemWithClass(['character', `div${item.id}`]);
        const img = createElemWithClass('', 'img');

        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElemWithClass('', 'img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            localStorage.setItem('player1', JSON.stringify(item));

            el.classList.add('active');

            setTimeout(() => {

                window.location.pathname = 'arenas.html';
            }, 1000);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
