

let connection = new WebSocket('ws://25.73.130.253:8080');   //ws://discount-space.herokuapp.com

connection.onopen = function () {
};

connection.onerror = function (error) {
};

export default connection;