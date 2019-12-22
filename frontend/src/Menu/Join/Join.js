import React, { Component } from 'react';
import autoBind from "react-autobind";
import * as menuActions from "../../store/menu/actions";
import { connect } from 'react-redux';
import './Join.css';
import connection from "../../services/websocket/websocket";

class Join extends Component{
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleSubmit() {
        connection.send(JSON.stringify({type: "ADD_PLAYER", creator: this.input.value, newPlayer: this.props.userInfo}));
    }

    closeLoadGame() {
        this.props.dispatch(menuActions.joinClose());
    }

    render() {
        return(
            <div id = {'join'}>
                <p>Please choose game to join</p>
                <div id = {'avivable_games'}>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Find a game via a username</h3>
                        <input type = 'text' style={{'width': '250px'}} ref={(input) => this.input = input} required={true}/><br/>
                        <input type= 'submit' value = 'Create'/>
                    </form>
                </div>
                <button id = {'load_close'} onClick={this.closeLoadGame}>Close</button>
            </div>
        );
    }
}

export default connect()(Join);