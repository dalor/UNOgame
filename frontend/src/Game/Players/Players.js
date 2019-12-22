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
            <div id = {'players'}>
                <div id = {'player1'}>
                    <div id={'playerName'}>
                        {this.props.game.users[0].username}
                    </div>
                    <div id={'cardNumber'}>
                        {this.props.game.users[0].cards.length}
                    </div>
                </div>
                <div id = {'player'}>
                    {this.props.game.users[1] === undefined ?
                        <div>No player yet</div>:
                        <div id={'player2'}>
                            <div id={'playerName'}>
                                {this.props.game.users[1].username}
                            </div>
                            <div id={'cardNumber'}>
                                {this.props.game.users[1].cards.length}
                            </div>
                        </div>
                    }

                </div>
                <div id = {'player'}>
                    <div id={'playerName'}>
                        {this.props.game.users[2] === undefined ?
                            <div>No player yet</div>:
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
                            <div>No player yet</div>:
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