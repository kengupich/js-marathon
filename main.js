function createPlayerObject(name, hp = 100, img = name.toLowerCase(), weapon = ['hand', 'leg', 'head'], attack = 'Fight...'){
    let newObject = {
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

const player1 = createPlayerObject('SUB-ZERO', 80, 'subzero');
const player2 = createPlayerObject('Scorpion', 50);

function createElemWithClass(className, tag = 'div'){
    const elem = document.createElement(tag);
    elem.className = className;

    return elem;
}

function createPlayer(className, object){
    const div = {
        root: createElemWithClass(className),
        progressbar: createElemWithClass('progressbar'),
        character: createElemWithClass('character'),
        life: createElemWithClass('life'),
        name: createElemWithClass('name'),
        img: document.createElement('img'),
    }

    document.body.querySelector('.arenas').appendChild(div.root);

    div.root.appendChild(div.progressbar);
    div.root.appendChild(div.character);
    div.character.appendChild(div.img);
    div.progressbar.appendChild(div.life);
    div.progressbar.appendChild(div.name);

    div.life.style.width = object.hp + "%";
    div.name.innerText = object.name;
    div.img.src = object.img;
    
}

createPlayer('player1', player1);
createPlayer('player2', player2);