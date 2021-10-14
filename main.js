function createPlayerObject(name, hp = 100, img = name.toLowerCase(), weapon = ['hand', 'leg', 'head'], attack = 'Fight...'){
    const newObject = {
        name    : name,
        hp      : hp,
        img     : 'http://reactmarathon-api.herokuapp.com/assets/' + img + '.gif',
        weapon  : weapon,
        attack  : function(){
            console.log(name + ' ' + attack);
        },
    };

    return newObject;
}

function createElemWithClass(className, tag = 'div'){
    const elem = document.createElement(tag);
    elem.className = className;

    return elem;
}

function createPlayer(className, object){
    
    const   root = createElemWithClass(className),
            progressbar = createElemWithClass('progressbar'),
            character = createElemWithClass('character'),
            life = createElemWithClass('life'),
            name = createElemWithClass('name'),
            img = document.createElement('img');

    root.appendChild(progressbar);
    root.appendChild(character);
    character.appendChild(img);
    progressbar.appendChild(life);
    progressbar.appendChild(name);

    life.style.width = object.hp + "%";
    name.innerText = object.name;
    img.src = object.img;
    
    arenas.appendChild(root);
}

const arenas = document.body.querySelector('.arenas');

const player1 = createPlayerObject('SUB-ZERO', 80, 'subzero');
const player2 = createPlayerObject('Scorpion', 50);

createPlayer('player1', player1);
createPlayer('player2', player2);