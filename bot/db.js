const client = require('./redis')

const save_game = (game) => {
    client.HMSET(game.id, game.repr(), function(err, res)
    {
        client.quit();
    })

}

exports.save_game = save_game

const load_game = (game_id) => new Promise((resolve, reject) => { 
    client.hgetall(`${game_id}`, function (err, obj) {
        if(obj ==null) reject('No game with such an id')
        else resolve(parse(obj))
    });
})

const parse = (game)=>
{
   game.now = parseInt(game.now);
   game.last_card = JSON.parse( game.last_card);
   game.players = JSON.parse( game.players);
   game.turn = parseInt(game.turn);
   game.used_cards = JSON.parse( game.used_cards);
   game.possible_cards = JSON.parse(game.possible_cards);
   game.winner = parseInt(game.winner);
   game.cards = JSON.parse(game.cards);
   return game;

}

exports.load_game = load_game