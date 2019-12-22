import React, { Component } from 'react';
import './Cards.css';
import { connect } from 'react-redux';
import autoBind from "react-autobind";
import * as gameSelectors from "../../store/game/reducer";

class Cards extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return(
          <div id = {'cards'}>

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