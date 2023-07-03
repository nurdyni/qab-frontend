import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState(() => []);
  const [username, setUsername] = useState(() => '');
  const [password, setPassword] = useState(() => '');
  const [role, setRole] = useState(() => '');

  const nameRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUsers(result.users);
      })
      .catch((err) => console.error(err));
  };
  const handleRefresh = () => {
    getUsers();
  };

  const createUser = () => {
    console.log({
      username,
      password,
      role,
    });
    fetch(`http://localhost:5000/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error('error', err))
      .finally(() => {
        nameRef.current.value = '';
        roleRef.current.value = '';
        passwordRef.current.value = '';
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  //A function to edit section in the databse
  const deleteCollege = (e) => {
    const id = e.target.attributes[0].textContent;
    fetch(`http://localhost:5000/colleges/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2 className='page-title'>Users</h2>
      <section className='section'>
        <h1 className='section__head'>Create User</h1>
        <div>
          <label htmlFor={'username'} className='input-label'>
            username:
          </label>
          <input
            type='text'
            id={'username'}
            className='input'
            placeholder={`Enter username`}
            onChange={handleUsernameChange}
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor={'role'} className='input-label'>
            role:
          </label>
          <input
            type='text'
            id={'role'}
            className='input'
            placeholder={`Enter role`}
            onChange={handleRoleChange}
            ref={roleRef}
          />
        </div>
        <div>
          <label htmlFor={'password'} className='input-label'>
            password:
          </label>
          <input
            type='password'
            id={'password'}
            className='input'
            placeholder={`Enter password`}
            onChange={handlePasswordChange}
            ref={passwordRef}
          />
        </div>
        <button className='btn btn-align-left' onClick={createUser}>
          create
        </button>
      </section>
      <section className='section'>
        <h1 className='section__head'>Users</h1>
        <button className='btn btn-align-left' onClick={handleRefresh}>
          refresh
        </button>
        {users.length !== 0 &&
          users &&
          users.map((user) => {
            return (
              <div className='section__item' key={user.id}>
                {user.username}
                <div className='btn-group'>
                  <Link to={user.id} className='btn btn--type-secondary'>
                    edit
                  </Link>
                  <button
                    to={user.id}
                    className='btn btn--type-secondary btn--color-red'
                    onClick={deleteCollege}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default Users;
