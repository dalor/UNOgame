import React, { Component } from 'react';
import './Playground.css';
import autoBind from "react-autobind/src/autoBind";
import * as gameSelectors from "../../store/game/reducer";
import { connect } from 'react-redux';
import connection from '../../services/websocket/websocket';

class Playground extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

    }

    onStart(){
        if(this.props.game.users.length > 1)
        {
            connection.send(JSON.stringify({type: "START_GAME", game: this.props.game.name}));
        }
        else
        {
            alert('More than 1 player needed');
        }
    }

    render() {
        return(
            <div id = {'playground'}>
                <div id = {'last_card'}>
                    {
                        this.props.game ?   this.props.game.lastCard === undefined ?
                            <button id = {'start'} onClick={this.onStart}>Start</button> :
                            <img id={'l_card'} src={this.props.game.lastCard}/>
                         : 'None'
                    }
                  
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        game: gameSelectors.getGame(state)
    };
}

export default connect(mapStateToProps)(Playground);