import React from 'react'

const RadioGroup = ({label, name, data}) => {

  return (
    <div className='flex-l gap4 items-baseline-l ttc-l w-auto-l f4-l'>
        <span className=''>{label}</span>
        {data?.map((item, index) => {return (<div key={index} className='flex-l items-baseline gap2 pointer f4-l'><input type={'radio'} name={`${name}`} value={`${item}`}/><label htmlFor='index' className='pointer'>{item}</label></div>);})}
        
    </div>
  )
}

export default RadioGroup