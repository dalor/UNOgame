//import * as types from './actionTypes';
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
                actions(json);
            }
        });  // user disconnected
        connection.on('close', function(connection) {
                clients.splice(index, 1);
            }
        );


        //Макет
        let games = new Map();
        let users = [{id: '123', username: 'hitrch', games: new Map()}];

        function addGame(users, target, game) {
            users.forEach((user) => {
                if(user.username === target.username)
                {
                    user.games.set(game.name, game);
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
        }

        function actions(message) {
            switch (message.type) {
                case "CREATE_NEW_GAME": {
                    let game = {
                        name: message.name,
                        creator: message.creator,
                        users: [message.creator]
                    };
                    addGame(users, message.creator, game);
                    games.set(game.name, game);
                    //console.log(games.size)
                    break;
                }
                case "GET_USER_GAMES": {
                    console.log(message.user);
                    console.log("games.size"+games.size);
                    console.log(getUser(users, message.user).games.size);
                    connection.sendUTF(JSON.stringify({ type: 'SET_GAMES', games: getUser(users, message.user).games} ));
                    break;
                }
                default: {
                    console.log('hz');
                }
            }
        }





    }
);

