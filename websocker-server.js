var webSocketsServerPort = 1337;
const logic = require("./bot/objects");
const storage = require("./bot/db");
var webSocketServer = require('websocket').server;
var http = require('http');


var server = http.createServer(function(request, response) {
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port "
        + webSocketsServerPort);
});
var wsServer = new webSocketServer({
    httpServer: server
});
let clients = [];
let admin_client = [];
function save_connection(data, conn)
{
    for(let i in clients)
    {
        for(let key in clients[i])
        {
            if(clients[i][key] == conn)
            {
                clients.splice(i,1);
                let client = {};
                client[data.id] = conn;
                clients.push(client);
            }
        }
    }
  for(let key in clients[0])
  {
      console.log(key);
  }
}
 function check_in_game(data) {
    return new Promise(async (resolve, reject)=>
    {
        let games = await storage.load_by_id(data.id);
        resolve(games.length != 0)
    })
}

async function create_game(data, conn)
{
   let in_game = await check_in_game(data);

    if(in_game) { console.log('Now'); conn.sendUTF(JSON.stringify({type: 'ALREADY_IN_GAME'}))}
    else
    {
        console.log('Saved!');
        let game = new logic.Game({id: data.username, players: [data], last_card: {id:'1'}});
        console.log(game);
        storage.save_game(game);
        conn.sendUTF(JSON.stringify({type: 'GAME_CREATED', id: game.id, players: game.players}))
    }
}

async function add_player(data, conn) {
    if (check_in_game(data)) {
        conn.sendUTF(JSON.stringify({type: 'ALREADY_IN_GAME'}))
    } else {
        let game = await storage.load_game(data.id_creator);
        game.add_player(data);
        storage.save_game(game);
        broadcast({
            type: "PLAYER_JOINED",
            joined: game.players[game.players.length - 1].full_name,
            players: game.players
        }, game.players)
    }
}
function broadcast(data, players)
{
    clients.forEach(client=>
    {
        for(let key in client)
        {
            if(players.findIndex(player=> player.id == key)!=-1)
            {
                client[key].sendUTF(JSON.stringify(data));
            }
        }
    })

}
async function delete_player(data, conn) {
    let game = await storage.load_game(data.id_creator);
    game.remove_player(data);
    if (game.players.length == 0 || game.players.length == 1) {
        storage.delete_game(data.id_creator);
        if (game.players.length == 1) {

        }
    } else {
        storage.save_game(game);
        broadcast({type: "PLAYER_LEFT", left: data.full_name, players: game.players}, game.players);
    }

}

async function start_game(data, conn) {
    let game = await storage.load_game(data.id_creator);
    try {
        game.start();
        storage.save_game(game);
        broadcast({
            type: "GAME_STARTED",
            id: game.id,
            possible_cards: game.possible_cards,
            last_card: game.last_card,
            now: game.now,
            players: game.players
        }, game.players);
    } catch {
        conn.sendUTF(JSON.stringify({type: 'NOT_ENOUGH_PLAYERS'}));
    }

}

async function call_bluff(data) {
    let game = await storage.load_game(data.id_creator);
    game.check_honest(true);
    storage.save_game(game);
    broadcast({
        type: "CALLED_BLUFF",
        id: game.id,
        possible_cards: game.possible_cards,
        last_card: game.last_card,
        now: game.now,
        players: game.players
    }, game.players);
}
async function pass() {
    let game = await storage.load_game(data.id_creator);
    game.pass();
    storage.save_game(game);
    broadcast({
        type: "PASSED",
        id: game.id,
        possible_cards: game.possible_cards,
        last_card: game.last_card,
        now: game.now,
        players: game.players
    }, game.players);
}
async function put_card(data) {
    let game = await storage.load_game(data.id_creator);
    game.put_card(data.card);
    storage.save_game(game);
    broadcast(Object.assign({
        type: "PUT_CARD",
        id: game.id,
        possible_cards: game.possible_cards,
        last_card: game.last_card,
        now: game.now,
        players: game.players
    }), game.players);
}

async function set_color(data) {
    let game = await storage.load_game(data.id_creator);
    game.set_color(data.color);
    storage.save_game(game);
    broadcast({
        type: "SET_COLOR",
        id: game.id,
        color: game.last_card.color,
        possible_cards: game.possible_cards,
        last_card: game.last_card,
        now: game.now,
        players: game.players
    }, game.players);
}
wsServer.on('request', function(request) {
        let connection = request.accept(null, null);
        clients.push({'unknown': connection});
        connection.on('message', function(message) {
            if (message.type == 'utf8') {
                let data = JSON.parse(message.utf8Data);

                switch(data.type)
                {
                    case 'SAVE_CONNECTION':{ save_connection(data, connection);  break;}
                    case 'CREATE_GAME': create_game(data, connection); break;
                    case 'ADD_PLAYER': add_player(data, connection); break;
                    case 'DELETE_PLAYER': delete_player(data, connection); break;
                    case 'START_GAME': start_game(data,connection); break;
                    case 'PUT_CARD': put_card(data); break;
                    case 'CALL_BLUFF': call_bluff(data); break;
                    case 'PASS': pass(data); break;
                    case 'SET_COLOR': set_color(data); break;
                }
            }
        });
        connection.on('close', function(connection) {

            }
        );
    }
);


/*import * as types from './actionTypes';
//import {getUser} from "./frontend/src/store/login/reducer";

let webSocketsServerPort = 1337;
let webSocketServer = require('websocket').server;
let http = require('http');
let server = http.createServer(function(request, response) {
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port "
        + webSocketsServerPort);
});
let wsServer = new webSocketServer({
    httpServer: server
});
let clients = [];
wsServer.on('request', function(request) {
        let connection = request.accept(null, request.origin);
        let index = clients.push(connection) - 1;
        //connection.sendUTF(JSON.stringify({ message: 'Hello'} ));
        connection.on('message', function(message) {
            if (message.type == 'utf8') {
                var json = JSON.parse(message.utf8Data);
                actions(json, connection);
            }
        });  // user disconnected
        connection.on('close', function(connection) {
                clients.splice(index, 1);
            }
        );
    }
);

//Макет
let games = [];

function actions(message, connection) {
    switch (message.type) {
        case "CREATE_NEW_GAME": {
            let game = {
                name: message.name,
                creator: message.creator.username,
                users: [message.creator],
                lastCard: undefined
            };

            //addGame(users, message.creator, game);
            games.push(game);
            //connection.sendUTF(JSON.stringify({ type: 'SET_GAMES', games: getUser(users, message.creator).games }));
            //console.log(games.size)
            break;
        }
        case "GET_USER_GAMES": {
            //console.log(users);
            //console.log("games.size"+games.size);
            console.log(games);
            //connection.sendUTF(JSON.stringify({ type: 'SET_GAMES', games: getUser(users, message.user).games }));
            break;
        }
        case "USERN": {
            clients.forEach(connection => {
                connection.sendUTF(JSON.stringify({ type: 'USERN', username: 'check' }));
            });
            break;
        }
        default: {
            console.log('hz');
        }
    }
}


function addGame(users, target, game) {
    users.forEach((user) => {
        if(user.username === target.username)
        {
            user.games.push(game);
        }
    })
}

function getUser(users, target) {
    for(let i = 0; i < users.length; i++)
    {
        if(users[i].username === target.username)
        {
            return users[i];
        }
    }
}*/