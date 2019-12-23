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
            <div> 
            { !this.props.game ? 'Nine': 
            <div id = {'players'}>
               {this.props.game.players.map(player=>
                 <div id = {'player'}>
                         <div id={'playerName'}>
                            {player.username}
                         </div>
                         <div id={'cardNumber'}>
                            {player.cards.length}
                        </div>
                  </div>
                 )             
              }
             </div>          
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