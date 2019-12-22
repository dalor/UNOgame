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
        function getGame(games, target) {
            for(let i = 0; i < games.length; i++)
            {
                if(games[i].name === target.name)
                {
                    return i;
                }
            }
        }
        return(
            <div id = {'players'}>
                <div id = {'player1'}>
                    <div id={'playerName'}>
                        {this.props.game.users[0].username}
                    </div>
                    <div id={'cardNumber'}>
                        {console.log(this.props.game.users[0])}
                    </div>
                </div>
                <div id = {'player'}>
                    {this.props.game.users[1] === undefined ?
                        <button id={'addPlayer'}>+</button>:
                        <div id={'player2'}>
                            <div id={'playerName'}>
                                {this.props.game.users[1].username}
                            </div>
                            <div id={'cardNumber'}>
                                {this.props.game.users[1].cards.size}
                            </div>
                        </div>
                    }

                </div>
                <div id = {'player'}>
                    <div id={'playerName'}>
                        {this.props.game.users[2] === undefined ?
                            <button id={'addPlayer'}>+</button>:
                            <div id={'player2'}>
                                <div id={'playerName'}>
                                    {this.props.game.users[2].username}
                                </div>
                                <div id={'cardNumber'}>
                                    {this.props.game.users[2].cards.length}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div id = {'player'}>
                    <div id={'playerName'}>
                        {this.props.game.users[3] === undefined ?
                            <button id={'addPlayer'}>+</button>:
                            <div id={'player2'}>
                                <div id={'playerName'}>
                                    {this.props.game.users[3].username}
                                </div>
                                <div id={'cardNumber'}>
                                    {this.props.game.users[3].cards.length}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        game: gameSelectors.getGame(state),
        user: loginSelectors.getUser(state)
    };
}

export default connect(mapStateToProps)(Players);