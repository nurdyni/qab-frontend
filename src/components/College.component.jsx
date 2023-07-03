import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const College = () => {
  // * Hooks
  const [name, setName] = useState(() => '');
  const [principle, setPrinciple] = useState(() => '');
  const [college, setCollege] = useState(() => {
    return {};
  });

  const { college_id } = useParams();
  const getAnswer = () => {
    fetch(`http://localhost:5000/colleges/${college_id}`)
      .then((response) => response.json())
      .then((result) => setCollege(result.college[0]))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAnswer();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //*Sending edit Section request
  const editSection = () => {
    fetch(`http://localhost:5000/colleges/${college_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        principle,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  // *Handling input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePrincipleChange = (e) => {
    setPrinciple(e.target.value);
  };

  return (
    <>
      <h2 className='page-title'>Colleges</h2>
      <section className='section'>
        <h1 className='section__head'>College edit</h1>
        <div className='input input--border-none'>
          <label>Principle :</label>
          <input
            type='text'
            className='input'
            defaultValue={college.name}
            onChange={handleNameChange}
          />
        </div>
        <div className='input input--border-none'>
          <label>Principle :</label>
          <input
            type='text'
            className='input'
            defaultValue={college.principle}
            onChange={handlePrincipleChange}
          />
        </div>
        <button className='btn' onClick={editSection}>
          save
        </button>
      </section>
    </>
  );
};
export default College;
