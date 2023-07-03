import React from 'react';

const Dropdown = ({ data, label }) => {
  // const items = ['a', 'b', 'c'];

  return (
    <div className='w5-l flex justify-between-l gap6 items-baseline f4-l justify-stretch'>
      <select className='ph2 pv2 tl f4-l lh-copy br2-l ba-l b--gray'>
        <option selected disabled>
          {label}
        </option>
        {data?.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </select>
    </div>
  );
};

export default Dropdown;
