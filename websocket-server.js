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
  }
  function check_in_game(data)
  {
    let games = await storage.load_by_id(data.id);
    return games.length != 0;
  }

  function create_game(data, conn)
  {
    
    if(check_in_game(data)) {conn.sendUTF8(JSON.stringify({type: 'ALREADY_IN_GAME'}))}
    else
    {
      let game = new logic.Game({id: data.username, players: [data]});
      storage.save_game(game);
      conn.sendUTF8(JSON.stringify({type: 'GAME_CREATED', id: game.id, players: game.players}))
     } 
  }

  function add_player(data,conn)
  {
    if(check_in_game(data))
    {
      conn.sendUTF8(JSON.stringify({type: 'ALREADY_IN_GAME'}))
    }
    else
    {
      let game = await storage.load_game(data.id_creator);
      game.add_player(data);
      storage.save_game(game);
      broadcast({type: "PLAYER_JOINED", joined: game.players[game.players.length-1].full_name, players: game.players }, game.players)
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
          client[key].sendUTF8(JSON.stringify(data));
          }
        }
      })
     
  }
  function delete_player(data,conn)
  {
    let game = await storage.load_game(data.id_creator);
    game.remove_player(data);
    if(game.players.length == 0 || game.players.length == 1)
    {
      storage.delete_game(data.id_creator);
      if(game.players.length == 1)
      {

      }
    }
    else 
    {
      storage.save_game(game);
      broadcast({type: "PLAYER_LEFT", left: data.full_name, players: game.players }, game.players);
    }

  }

  function start_game(data, conn)
  { 
    let game = await storage.load_game(data.id_creator);
    try{
      game.start();
      storage.save_game(game);
      broadcast({type: "GAME_STARTED",id:game.id, possible_cards: game.possible_cards, last_card: game.last_card, now: game.now, players: game.players }, game.players);
    }
    catch{
      conn.sendUTF8(JSON.stringify({type: 'NOT_ENOUGH_PLAYERS'}));
    }

  }

  function call_bluff(data)
  {
    let game = await storage.load_game(data.id_creator);
    game.check_honest(true);
    storage.save_game(game);
    broadcast({type: "CALLED_BLUFF",id:game.id, possible_cards: game.possible_cards, last_card: game.last_card, now: game.now, players: game.players }, game.players);
  }
  function pass()
  {
    let game = await storage.load_game(data.id_creator);
    game.pass();
    storage.save_game(game);
    broadcast({type: "PASSED",id:game.id, possible_cards: game.possible_cards, last_card: game.last_card, now: game.now, players: game.players }, game.players);
  }
  function put_card(data)
 {
  let game = await storage.load_game(data.id_creator);
  game.put_card(data.card);
  storage.save_game(game);
  broadcast(Object.assign({type: "PUT_CARD",id:game.id, possible_cards: game.possible_cards, last_card: game.last_card, now: game.now, players: game.players }), game.players);
 }

 function set_color(data)
 {
  let game = await storage.load_game(data.id_creator);
  game.set_color(data.color);
  storage.save_game(game);
  broadcast({type: "SET_COLOR",id:game.id, color: game.last_card.color, possible_cards: game.possible_cards, last_card: game.last_card, now: game.now, players: game.players }, game.players);
 }
  wsServer.on('request', function(request) {
   let connection = request.accept(null, request.origin);
   clients.push({'unknown': connection});
   connection.on('message', function(message) {
      if (message.type == 'utf8') { 
        let data = JSON.parse(message.utf8Data);
        switch(data.type)
        {
          case 'SAVE_CONNECTION': save_connection(data, connection); break;
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


