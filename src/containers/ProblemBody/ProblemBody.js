import React, { Component } from 'react';
import './ProblemBody.css';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import firebase from '../../firebase/firebase'
import { createProblemBody } from '../../actions/actions';
import rightArrow from '../../images/right_arrow.svg'
import leftArrow from '../../images/left_arrow.svg'


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
    const {title, client} = this.props;
    this.writeToDatabase(title, this.state.input, client)
    this.props.history.push("/problem-main")
  }

  writeToDatabase = (title, body, clientID) => {
    firebase.database().ref('Problems').push({
      title,
      body,
      clientID
    });
  }
  

  render() {
    let name;
    !this.props.user.name ? this.props.history.push("/client-login") : name = this.props.user.name.split(' ')[0];

    return (
      <div>
        <p className='welcome'>Sounds great {name},</p>
        <p className='body-instructions'>Now give us some more detail</p>
        <textarea className='body-input' placeholder='Looking for ...' maxLength='400' value={this.state.input} onChange={this.handleInputChange}/>
        <div className="button-container">
          <button className='previous-button' onClick={()=> this.props.history.push("/problem-title")} ><img className='left-arrow-img' src={leftArrow} /></button>
          <button className='next-button' onClick={this.handleSubmit} ><img className='right-arrow-img' src={rightArrow} /></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  client: state.problemClient,
  title: state.problemTitle,
  body: state.problemBody
});

const mapDispatchToProps = (dispatch) => ({
  createProblemBody: (body) => dispatch(createProblemBody(body))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProblemBody);