import React from 'react';

const FlexibleInput = ({
  children,
  type,
  name,
  placeholder,
  className,
  label,
  helpText,
}) => {
  return (
    <div className='flex flex-column pv1 f4-l lh-copy gap0'>
      <label className='fw6 black'>{label && <span>{label}</span>}</label>
      <input
        onChange={(e) => {
          let uname = e.target.value;
          console.log(uname);
        }}
        className={`input-reset ph3 pv2 br2-l br2-m br4 b--light-gray o-50-l ba-l b--gray ${className}`}
        type={type || 'text'}
        id={`${name}`}
        name={`${name}`}
        placeholder={`${placeholder ? placeholder : 'Text'}`}
      />
      <span className='gray o-90 f5-l ml2'>
        {helpText && <small>{`${helpText}`}</small>}
      </span>
    </div>
  );
};

export default FlexibleInput;
