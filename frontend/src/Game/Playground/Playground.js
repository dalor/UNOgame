import React, { Component } from 'react';
import './Playground.css';
import autoBind from "react-autobind/src/autoBind";
import * as gameSelectors from "../../store/game/reducer";
import { connect } from 'react-redux';
import connection from '../../services/websocket/websocket';
const mappings = require("../Cards/mapping");

class Playground extends Component {
    constructor(props) {
        super(props);
        autoBind(this);

    }

    onStart(){
        if(this.props.game.players.length > 1)
        {
            console.log(this.props.game);
            connection.send(JSON.stringify({type: "START_GAME", game: this.props.game}));
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
                        this.props.game ? this.props.game.last_card ?
                            this.props.game.last_card.id ?
                                <img id={'l_card'} src = {'cards/' + mappings[this.props.game.last_card.id] +'.png'}/> :
                                this.props.game.last_card.light ? <img id={'l_card'} src = {'cards/' + mappings[this.props.game.last_card.light] +'.png'}/>:
                            <button id = {'start'} onClick={this.onStart}>Start</button> :
                            'None' : 'None'
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