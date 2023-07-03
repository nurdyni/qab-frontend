import React from 'react';

const Button = ({ className }) => {
  return (
    <input
      className={`fw4 bg-brand-blue white bn mt4 ph3 pv2 f3-l br2-l br2-m br4 pointer button ${className}`}
      type={'submit'}
      name='login'
      id='login'
      value={'Login'}
    />
  );
};

export default Button;
