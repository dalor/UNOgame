import strore from '../../index';

let connection = new WebSocket('ws://127.0.0.1:1337');

connection.onopen = function () {
};

connection.onerror = function (error) {
};

/*connection.onmessage = function (message) {
    try {
        let json = JSON.parse(message.data);
        switch (json.type) {
                case "SET_USER":{
                    //console.log(json);
                    break;
                }
                default: {
                    console.log('No type message');
                    break;
                }
        }
    } catch (e) {
        console.log(e);
    }
};*/

export default connection;