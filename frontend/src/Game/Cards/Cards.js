import React, { Component } from 'react';
import './Cards.css';
import { connect } from 'react-redux';
import autoBind from "react-autobind";
import * as gameSelectors from "../../store/game/reducer";
import connection from "../../services/websocket/websocket";

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
        function avivable(card) {
            //сделать как то проверку
            return true;
        }
        return(
          <div id = {'cards'}>
              <div id={'usual_cards'}>
                  {this.props.user.cards.map((card, index) => <div id = {index}><button id = {'game_list'} onClick={() => this.onButtonClick(card)}
                       style={avivable(card) ? {opasity: 0} : {opasity: 1}}><img src={'./cards/'+card+'png'}/></button></div>)}
              </div>
              <div id={'special_cards'}>
                  <button id = {'game_list'} onClick={() => this.onBluffClick()}><img src={'./cards/bluffpng'}/></button>
              </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        cards: gameSelectors.getGame(state).cards
    };
}

export default connect(mapStateToProps)(Cards);