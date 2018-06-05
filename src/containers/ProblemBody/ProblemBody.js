import React, { Component } from 'react';
import './ProblemBody.css';
import { connect } from 'react-redux';
import { createProblemBody } from '../../actions/actions';
import rightArrow from '../../images/right_arrow.svg';
import leftArrow from '../../images/left_arrow.svg';


class ProblemBody extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  handleInputChange= (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createProblemBody(this.state.input);
    this.props.history.push("/problem-category")
  }

  addInput = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      this.handleSubmit(event);
    }
  }

  logInCheck = (client) => {
    const value = Object.keys(client).length;
    if ( value === 0 ) {
      this.props.history.push("/client-login");
    }
  }
  

  render() {
    this.logInCheck(this.props.client)
    const name = this.props.client.name || 'client unknown';
    const firstName = name.split(' ')[0];

    return (
      <div className='client-background'>
        <p className='welcome'>Sounds great {firstName},</p>
        <p className='body-instructions'>Now give us some more detail</p>
        <textarea className='body-input' onKeyDown={this.addInput} onChange={this.handleInputChange} maxLength='400' value={this.state.input} autoFocus/>
        <div className="button-container">
          <button className='previous-button' onClick={()=> this.props.history.push("/problem-title")} ><img className='left-arrow-img' src={leftArrow} /></button>
          <button className='next-button' onClick={this.handleSubmit} ><img className='right-arrow-img' src={rightArrow} /></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client,
  clientID: state.problemClient,
  title: state.problemTitle,
  body: state.problemBody
});

const mapDispatchToProps = (dispatch) => ({
  createProblemBody: (body) => dispatch(createProblemBody(body))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProblemBody);