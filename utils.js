export const createElemWithClass = (className, tag = 'div') => {
    const $elem = document.createElement(tag);
    
    if(className) {
        $elem.className = className;
    }

    return $elem;
}

export const getRandom = (number) => Math.ceil(Math.random() * number); 

export function getRandomArrayItem(){ return this[getRandom(this.length) - 1]; }

export function getRandomObjectItem(){ return this[Object.keys(this).getRandomArrayItem()] };

export const normalize = (num) => num.toString().length > 1 ? num : `0${num}`;

export const changeGenderVerb = (wordEnd) => {
    switch(wordEnd){
        case 'лся':
            return 'лась';
        case 'шел':
            return 'шла';
        case 'вел':
            return 'вела';
        default:
            return `${wordEnd}а`;
    }
}

