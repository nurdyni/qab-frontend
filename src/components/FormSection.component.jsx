import React from 'react';

const FormSection = ({ head, children }) => {
  return (
    <div>
      <fieldset className='dib w-90 br2 flex flex-column gap1 bn-l bn'>
        <legend className='f5 bg-accent-color brand-blue br3-l ph3 pv2 f4-l b--black'>
          {head} :
        </legend>
        {children}
      </fieldset>
    </div>
  );
};

export default FormSection;
