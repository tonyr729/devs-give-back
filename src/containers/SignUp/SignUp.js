import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import DatabaseHelper from '../../helpers/DatabaseHelper';
import { handleSignup } from '../../actions/actions';

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      repo: '',
      contact: ''
    };
    this.database = new DatabaseHelper();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    const {repo, contact} = this.state;
    const { name, id } = this.props.dev;
    const { status, problemID} = this.props.signup;
    this.database.writeContributerToDatabase(repo, contact, name, id, problemID);
    this.database.writeDevProjectToDatabase(id, problemID);
    this.props.handleSignup(!status);
  }

  render() {
    const status = this.props.signup.status;
    return (
      <div className="overlay">
        {status || <Redirect to='/dev-profile'/>}
        <div className="signup-form">
          <p className="signup-title">Awesome!</p>
          <p className="signup-info">
            Please create a GitHub Repo for this project 
            and prefered contact info for the client and 
            other developers regarding this project. 
          </p>
          <input type="text" 
            name="repo" 
            placeholder="https://github.com/:user/:repo" 
            className="repo-input" 
            value={this.state.repo} 
            onChange={this.handleInputChange}
            autoFocus/>
          <input type="text" 
            name="contact" 
            placeholder="Contact Info" 
            className="contact-info" 
            value={this.state.contact}
            onChange={this.handleInputChange}/>
          <button onClick={this.handleSubmit} className="submit-signup">Submit!</button>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  dev: state.dev,
  signup: state.signup
});

export const mapDispatchToProps = (dispatch) => ({
  handleSignup: (status) => dispatch(handleSignup(status))
});



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);