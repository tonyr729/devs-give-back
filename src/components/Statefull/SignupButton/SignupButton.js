import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryButton extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
  }


  handleClick = () => {
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

CategoryButton.propTypes = {
  handleSignup: PropTypes.func,
  clientID: PropTypes.string,
  matchingDev: PropTypes.bool
};

export default CategoryButton;