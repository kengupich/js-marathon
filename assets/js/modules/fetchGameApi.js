export default class FetchGameApi{
    constructor(){}

    static getPlayers(){
        return fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json().catch(error => console.log(error.message)));
    };

    static getRandomPlayer(){
        return fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json().catch(error => console.log(error.message)));
    };

    static getFightObjects(hit, defence){
        return fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json().catch(error => console.log(error.message)));
    };
}