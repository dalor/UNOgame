const log = require("./objects");
const storage = require("./db");
let players = [new log.Player({id: 343, full_name: 'David'}),new log.Player({id: 340, full_name: 'Sonya'})];
let game = new log.Game({id: 7, players: players, });
game.start();
storage.save_game(game);
 storage.load_game(7).then((obj)=>
 {
      game = new log.Game (obj);
 });