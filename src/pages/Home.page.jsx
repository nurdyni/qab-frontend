import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='App'>
        <div className='hero'>
          <h1 className='hero__text'>Welcome to QAB Evaluation Web App</h1>
          <Link to={`login`} className='btn'>
            Login
          </Link>
        </div>
      </div>
    );
  }
}
export default Home;
