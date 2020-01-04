import React, {Component} from 'react';
import './Cards.css';
import {connect} from 'react-redux';
import autoBind from "react-autobind";
import * as gameSelectors from "../../store/game/reducer";
import connection from "../../services/websocket/websocket";
import * as loginSelectors from "../../store/login/reducer";
import {game} from '../../store/reducers';
import mapper from "./mapping"

class Cards extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    onButtonClick(id, index, now) {
        if(index === now)
        {
            //connection.send(JSON.stringify({type: "PUT_CARD", card: {id: id}, player: {id: this.props.current_user.id}}));
        }
        else
        {
            console.log('Card used', id);
        }
        connection.send(JSON.stringify({type: "PUT_CARD", card: {id: id}, player: {id: this.props.current_user.id}}));
    }

    onBluffClick() {
        connection.send(JSON.stringify({type: "CALL_BLUFF"}));
    }

    onPassClick() {
        console.log(this.props.current_user);
        connection.send(JSON.stringify({type: "PASS", game:{id: this.props.game.id, player: this.props.current_user}}));
    }

    onTakeClick() {
        connection.send(JSON.stringify({type: "GET_CARD", game:{id: this.props.game.id, player: this.props.current_user}}));
    }

    render() {
        let index = this.props.players.findIndex(player => player.username === this.props.current_user.username);
        let now = this.props.now;
        let possible_cards = this.props.possible_cards;
        console.log(index);
        return (
            <div id={'cards'}>
                {
                    !this.props.game ? '' :
                        <div className="flex">
                            {
                                this.props.game.last_card ?
                                    <div id={'card_block'} onClick={this.onTakeClick}>
                                        hehe
                                    </div>
                                    : ''
                            }
                            {
                                this.props.game.last_card ?
                                    <div id={'card_block'}><img id={'card'} src={"cards/pass.png"} onClick={this.onPassClick}/></div>
                                    : ''
                            }
                            {
                                this.props.players[index].cards.map(card =>
                                    mapper[card.light]?
                                    <div id={'card_block'}><img id={'card'}
                                                                src={'/cards/' + mapper[card.light] + '.png'}
                                                                onClick={this.onButtonClick.bind(null, card.light, index, now)}
                                                                className={(index === now && possible_cards && possible_cards.findIndex(poss_card => card.id === poss_card.id) !== -1) ? 'possible' : 'classic'}/>
                                    </div> : ''
                                )
                            }

                        </div>
                }
            </div>


        )
    }
}

function mapStateToProps(state) {
    return {
        game: gameSelectors.getGame(state),
        players: gameSelectors.getGame(state) ? gameSelectors.getGame(state).players : [],
        possible_cards: gameSelectors.getNowPlayer(state) ? gameSelectors.getNowPlayer(state).possible_cards : [],
        current_user: loginSelectors.getUser(state),
        now: gameSelectors.getGame(state) ? gameSelectors.getGame(state).now : null,
    };
}

export default connect(mapStateToProps)(Cards);