import React, { Component } from 'react';
import './Cards.css';
import { connect } from 'react-redux';
import autoBind from "react-autobind";
import * as gameSelectors from "../../store/game/reducer";
import connection from "../../services/websocket/websocket";
import * as loginSelectors from "../../store/login/reducer";
import { game } from '../../store/reducers';
class Cards extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    onButtonClick(card) {
        connection.send(JSON.stringify({type: "PUT_CARD", card: card}));
    }

    onBluffClick() {
        connection.send(JSON.stringify({type: "CALL_BLUFF"}));
    }
   
    render() {
        let index = this.props.players.findIndex(player=> player.surname == this.props.current_user.surname);
        let now = this.props.now;
        let possible_cards = this.props.possible_cards;
        return(
            <div>
                  {
                !this.props.game ? '' :
                <ul className = "flex">
                <li><img src = "pass.png"/></li>
                {
                this.props.players[index].cards.map(card=>
         <li><img src = {card.id} onClick = {this.onButtonClick(card.id)} className = {(index == now &&  possible_cards.findIndex(poss_card=> card.id == poss_card.id)!=-1) ? 'possible' : 'classic'} /></li>
                                                 
                            )
                }
                        
                
                       
            </ul>
            }
            </div>
          
         
              
        )
}
}

function mapStateToProps(state) {
    return{
        game: gameSelectors.getGame(state),
        players: gameSelectors.getGame(state) ? gameSelectors.getGame(state).players : [],
        possible_cards : gameSelectors.getGame(state) ? gameSelectors.getNowPlayer(state).possible_cards : [],
        current_user: loginSelectors.getUser(state),
        now: gameSelectors.getGame(state) ? gameSelectors.getGame(state).now : null,
    };
}

export default connect(mapStateToProps)(Cards);