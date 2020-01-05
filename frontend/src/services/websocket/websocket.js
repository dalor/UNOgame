let connection = new WebSocket('ws://https://unog.herokuapp.com/');

connection.onopen = function () {
};

connection.onerror = function (error) {
};

export default connection;