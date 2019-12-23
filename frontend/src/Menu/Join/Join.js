import React, { Component } from 'react';
import autoBind from "react-autobind";
import * as menuActions from "../../store/menu/actions";
import { connect } from 'react-redux';
import './Join.css';
import connection from "../../services/websocket/websocket";
import loginSelectors from "../../store/login/reducer"

class Join extends Component{
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleChange() {
        console.log(this.props);
        connection.send(JSON.stringify({type: "ADD_PLAYER", id_creator: this.props.userInfo.username}));
    }
    joinGame(game_id)
    {

    }
    closeLoadGame() {
        this.props.dispatch(menuActions.joinClose());
    }

    render() {
        return(
            <div id = {'join'}>
            <h3>Find a game via a username</h3>
            <input type = 'text' style={{'width': '250px'}} onChange = {this.handleChange} required={true}/><br/>
            {this.props.userInfo.available_games.length ==0 ? '' : this.props.userInfo.available_games.map(game=>
            <div className ='offered-game' onClick = {this.joinGame.bind(null,game.id_creator)}>{game.id_creator}</div>
            )
    }
            <button id = {'load_close'} onClick={this.closeLoadGame}>Close</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        userInfo:  loginSelectors.getUser(state)
    };
}
export default connect(mapStateToProps)(Join);