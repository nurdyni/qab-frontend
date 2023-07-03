import React from 'react';
import FlexibleInput from './FlexibleInput.component';

const PasswordInput = () => {
  return (
    <FlexibleInput
      label='PassWord'
      type='password'
      name='pword'
      placeholder='Enter Password'
      className=''
    />
  );
};

export default PasswordInput;
