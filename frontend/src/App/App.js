import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from '../pages/Home';
import List from '../pages/List';


import {render} from "react-dom";
import TelegramLoginButton from "react-telegram-login";


const handleTelegramResponse = response => {
    console.log(response);
};

render(
    <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="UNOgBot"/>,
    document.getElementById('telegramButton')
);



class App extends Component {
    render() {
        const App = () => (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/list' component={List}/>
                </Switch>
            </div>
        );
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;