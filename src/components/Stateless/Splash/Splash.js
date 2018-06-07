import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signInDev, signInClient} from '../../../actions/actions';
import './Splash.css';

export class Splash extends Component {

  componentDidMount(){
    this.props.signInClient({});
    this.props.signInDev({});
  }

  render() {
    return (
      <div className='splash'>
        <h1>devs<span>GIVE</span>back</h1>
        {/* <h3>MISSION</h3> */}
        <p className='hero-text'>
          Providing a platform for non-developers that have civic minded problems to meet
          developers willing to volunteer their time to provide software that can help solve it. 
        </p>
        {/* <p>Passionate and talented developers exist all around the world.
           Many of these developers are looking to volunteer their skill 
           and passion to help those in need. This site aims to provide a 
           meeting place for individuals who have a problem and developers 
           that can offer solutions. All work should remain voluntary. Developers
           on this site are not seeking payment. Their main focus is to give back 
           to the community. That being said some projects may require the use of 
           outside services that may come with a cost. (storage, hosting, etc...)
           Ideal problems are ones that are civic-minded, or that can positively 
           affect a wide range of individuals when solved. It is up to the 
           discretion of the developer to take on a problem. 
        </p> */}
        <NavLink to='/choice'><button className='begin-button'>BEGIN</button></NavLink>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  client: state.client,
  dev: state.dev
});

export const mapDispatchToProps = (dispatch) => ({
  signInDev: (user, token) => dispatch(signInDev(user, token)),
  signInClient: (client) => dispatch(signInClient(client))
});

export default connect(null, mapDispatchToProps)(Splash);
