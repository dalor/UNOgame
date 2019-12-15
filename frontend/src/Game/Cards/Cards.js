import React, { Component } from 'react';
import './Cards.css';
import { connect } from 'react-redux';
import autoBind from "react-autobind";

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

export default connect()(Cards);