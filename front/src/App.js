import React from 'react';
import logo from './logo.svg';
import './App.css';
window.WebSocket = window.WebSocket || window.MozWebSocket;

class App extends React.Component {
 constructor(props) {
 super(props);
 this.sendMessage= this.sendMessage.bind(this);
 this.startChat= this.startChat.bind(this);
 this.state = 
 {
   id: 343
 }
}
 connection = new WebSocket('ws://127.0.0.1:1337')

 startChat = () => {

   }
   componentDidMount()
   {
    this.connection.onopen = function () {
    };
    
    this.connection.onerror = function (error) {
    };
    
    this.connection.onmessage = function (message) {
      try {
        let json = JSON.parse(message.data);
        console.log(json);
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ',
            message.data);
        return;
      }
    };
   }
sendMessage = ()=>
{
  
}
show = ()=>
{

}
 render() {
   console.log("Rerender");
   return (
     <div className="App">
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
      <input onChange ={this.sendMessage} />
      {/* <button style={{padding:10}} onClick={this.show}>Show my games</button>
      <button style={{padding:10}} onClick={this.sendMessage}>Send Message</button> */}
       <canvas ref="canvas" width={640} height={425} />
       </header>
     </div>
   );
 }
}


export default App;