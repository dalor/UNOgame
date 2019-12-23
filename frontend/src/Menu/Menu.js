import React, { Component } from 'react';
import Game from "../Game/Game";
import './Menu.css';
import * as loginSelectors from '../store/login/reducer';
import * as menuSelectors from '../store/menu/reducer';
import * as gameSelectors from '../store/game/reducer';
import * as menuActions from '../store/menu/actions';
import { connect } from 'react-redux';
import autoBind from "react-autobind";
import NewGame from "./NewGame/NewGame";
import LoadGame from "./Continue/Continue";
import Join from "./Join/Join";
import connection from "../services/websocket/websocket";
import * as loginActions from "../store/login/actions";


class Menu extends Component {

    constructor(props) {
        super(props);
        autoBind(this);

    }

    componentDidMount() {
        let pg = this;
        connection.onopen = () => {

            connection.send(JSON.stringify(Object.assign({type: "SAVE_CONNECTION"}, pg.props.userInfo)));
        };
        connection.onmessage = function (message) {
            let json = JSON.parse(message.data);
            switch(json.type) {
                case 'SET_GAMES': {
                    pg.props.dispatch(loginActions.setUser(json));
                    break;
                }
            }
        };
    }

    onNewGameClick(){
        this.props.dispatch(menuActions.newGameChosen());
    }

    onContinueClick(){
        this.props.dispatch(menuActions.continueChosen());
    }

    onJoinClick(){
        this.props.dispatch(menuActions.joinChosen());
    }


    render() {
        const Header = () => (
            <div id = {'header'}>
                <div id = {'welcome'}>
                    Greetings treveler  {this.props.userInfo.username}
                </div>
            </div>
        );
        const Body = () => (
            <div id = {'body'}>
                <div style = {{'width': '200px','marginLeft': 'auto', 'marginRight': 'auto', 'textAlign': 'center'}}>
                    <h4>
                        Welcome to menu
                    </h4>
                </div>
                <div id = {'menubutton'}>
                    <button style = {{'width': '100px'}} onClick = {this.onNewGameClick}>New Game</button>
                </div>
                <div id = {'menubutton'}>
                    <button style = {{'width': '100px', 'marginTop': '20px'}} onClick = {this.onContinueClick}>Continue</button>
                </div>
                <div id = {'menubutton'}>
                    <button style = {{'width': '100px', 'marginTop': '20px'}} onClick = {this.onJoinClick}>Join</button>
                </div>
            </div>
        );

        return(
            <div id = {'menu'}>
                <Header/>
                {this.props.gameChosen !== undefined ?
                    <Game/> :
                    this.props.newGameChosen ?
                        <NewGame/>:
                        this.props.continueChosen ?
                            <LoadGame/>:
                            this.props.joinChosen ?
                                <Join/>:
                                <Body/>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        userInfo: loginSelectors.getUser(state),
        gameChosen: gameSelectors.getGame(state),
        newGameChosen: menuSelectors.getNewGame(state),
        continueChosen: menuSelectors.getLoadGame(state),
        joinChosen:menuSelectors.getJoin(state)
    };
}

export default connect(mapStateToProps)(Menu);