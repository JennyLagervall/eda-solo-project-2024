import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        
      },
    });
    setUsername('');
    setFirstName('');
    setPassword('');
    setLastName('');
  }; // end registerUser

  return (
    <form className='formPanel' onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className='alert' role='alert'>
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor='username'>
          Username:
          <input
            type='text'
            name='username'
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='password'>
          Password:
          <input
            type='password'
            name='password'
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          First Name:
          <input
            type='firstName'
            name='firstName'
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type='lastName'
            name='lastName'
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className='btn' type='submit' name='submit' value='Register' />
      </div>
    </form>
  );
}

export default RegisterForm;
