import React, { Component } from 'react';
import './NewGame.css';
import autoBind from "react-autobind";
import * as menuActions from '../../store/menu/actions';
import * as gameActions from '../../store/game/actions';
import { connect } from 'react-redux';
import connection from '../../services/websocket/websocket';
import * as loginSelectors from "../../store/login/reducer";


class NewGame extends Component{
    constructor(props) {
        super(props);
        autoBind(this);
    }

    handleSubmit(e) {
        if(this.props.userInfo.games.length > 5)
        {
            alert('Слишком много игр');
        }
        else
        {
            connection.send(JSON.stringify({type: "USERN"}));
            connection.send(JSON.stringify({type: "CREATE_NEW_GAME", name: this.input.value, creator: this.props.userInfo}));
            alert('Ваша игра теперь доступна во вкладе Continue');
        }

        this.props.dispatch(menuActions.newGameClose());
        e.preventDefault();
    }

    close() {
        this.props.dispatch(menuActions.newGameClose());
    }

    render() {
        return(
        <div id = {'newgame'}>
            <form onSubmit={this.handleSubmit}>
                <h3>NewGame</h3>
                <h3>Game name</h3>
                <input type = 'text' style={{'width': '250px'}} ref={(input) => this.input = input} required={true}/><br/>
                <button onClick={this.close} style={{'marginTop': '20px'}}>Close</button>
                <input type= 'submit' value = 'Create'/>
            </form>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        userInfo: loginSelectors.getUser(state)
    };
}

export default connect(mapStateToProps)(NewGame);