let connection = new WebSocket('ws://unog.herokuapp.com/');

connection.onopen = function () {
};

connection.onerror = function (error) {
};

export default connection;