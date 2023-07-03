import React from 'react';
import FlexibleInput from './FlexibleInput.component';

const TextInput = ({ className, label, placeholder, helpText, name }) => {
  return (
    <FlexibleInput
      label={label || 'Username'}
      type='text'
      name={name || 'uname'}
      placeholder={placeholder || 'Enter username'}
      className={className || ''}
      helpText={helpText}
    />
  );
};

export default TextInput;
