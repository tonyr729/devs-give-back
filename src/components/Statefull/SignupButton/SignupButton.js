import React, { Component } from 'react';

class CategoryButton extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    }
  }


  handleClick = (event) => {
    if (!this.state.selected) {
      this.props.handleSignup(true, this.props.clientID);
      this.setState({
        selected: true
      });
    }
  }

  render() {
    let cardClass = this.state.selected ? "selected" : 'signup-button';
    return (
      <button onClick={this.handleClick} className={cardClass} disabled={ this.props.matchingDev }>Sign Up!</button>
    );
  }
}

export default CategoryButton;