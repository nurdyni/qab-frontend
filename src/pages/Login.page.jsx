import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  };
  return (
    <div className='App'>
      <form onSubmit={onFormSubmit} className='form login'>
        <h2 className='login__title'>Login</h2>
        <div className='small-container input--border-none'>
          <label className='input-label'>Username :</label>
          <input
            type='text'
            className='input'
            placeholder={`Enter username`}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='small-container input--border-none'>
          <label className='input-label'>Password :</label>
          <input
            type='password'
            className='input'
            placeholder={`Enter password`}
            onChange={handlePasswordChange}
          />
        </div>
        <button className='btn btn--width-full' type='submit'>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
