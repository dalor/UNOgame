import React, { Component } from 'react';
import './Players.css';
import * as gameSelectors from "../../store/game/reducer";
import { connect } from 'react-redux';
import autoBind from "react-autobind/src/autoBind";
import * as loginSelectors from "../../store/login/reducer";



class Players extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return(
                !this.props.game ? 'No players'
                :
                <div id = {'players'}>
                    {console.log("Players", this.props.game)}
                        {
                            this.props.game.players.map(player =>
                                <div id = {'player'}>
                                    <div id={'playerName'}>
                                        {player.username}
                                        {
                                            console.log(this.props.game)
                                        }
                                    </div>
                                    <div id={'cardNumber'}>
                                        {player.cards.length}
                                    </div>
                                </div>
                            )
                        }
                </div>
            
          
        )
    }
}

function mapStateToProps(state) {
    return{
        game: gameSelectors.getGame(state),
    };
}

export default connect(mapStateToProps)(Players);