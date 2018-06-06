import React, { Component } from 'react';

class CategoryButton extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
  }

  handleClick = () => {
    this.props.selectCategory(this.props.category);
    this.setState({
      selected: !this.state.selected
    });
  }

  render() {
    let cardClass = this.state.selected ? "selected-category" : "category-button";
    return (
      <button onClick={this.handleClick} className={cardClass}>{this.props.category}</button>
    );
  }
}

export default CategoryButton;