import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
  // * Hooks
  const [username, setUsername] = useState(() => '');
  const [role, setRole] = useState(() => '');
  const [password, setPassword] = useState(() => '');
  const [user, setUser] = useState(() => {
    return {};
  });

  const { user_id } = useParams();
  const getUser = () => {
    fetch(`http://localhost:5000/users/${user_id}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUser(result.user[0]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUser();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //*Sending edit Section request
  const editUser = () => {
    fetch(`http://localhost:5000/users/${user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  // *Handling input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <>
      <h2 className='page-title'>Users</h2>
      <section className='section'>
        <h1 className='section__head'>User edit</h1>
        <div className='input input--border-none'>
          <label>username :</label>
          <input
            type='text'
            className='input'
            placeholder='Enter username'
            defaultValue={user.username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='input input--border-none'>
          <label>role :</label>
          <input
            type='text'
            className='input'
            placeholder='Enter role'
            defaultValue={user.role}
            onChange={handleRoleChange}
          />
        </div>
        <div className='input input--border-none'>
          <label>password :</label>
          <input
            type='password'
            className='input'
            placeholder='Enter password'
            defaultValue={user.password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className='btn' onClick={editUser}>
          save
        </button>
      </section>
    </>
  );
};
export default User;
