import React, { Component } from 'react';

import './search-panel.css';


export default class SearchPanel extends Component {

  state = {
    text:''
  }

  onText = (e) => {
    const text = e.target.value
    this.setState({
      text
    })
    this.props.onSearchPanel(text)
  }

  render() {
    return (
    <input    type="text"
              className="form-control search-input"
              placeholder="type to search"
              onChange={this.onText}
              value={this.state.text}/>
  );
  };
}