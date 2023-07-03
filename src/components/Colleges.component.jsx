import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Colleges = () => {
  const [colleges, setColleges] = useState(() => []);
  const [name, setName] = useState(() => '');
  const [principle, setPrinciple] = useState(() => '');

  const nameRef = useRef();
  const principleRef = useRef();

  useEffect(() => {
    getColleges();
  }, []);

  const getColleges = () => {
    fetch('http://localhost:5000/colleges')
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setColleges(result.colleges);
      })
      .catch((err) => console.error(err));
  };
  const handleRefresh = () => {
    getColleges();
  };

  const createCollege = () => {
    fetch(`http://localhost:5000/colleges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        principle,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error('error', err))
      .finally(() => {
        nameRef.current.value = '';
        principleRef.current.value = '';
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePrincipleChange = (e) => {
    setPrinciple(e.target.value);
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
      <h2 className='page-title'>Colleges</h2>
      <section className='section'>
        <h1 className='section__head'>Create College</h1>
        <div>
          <label htmlFor={'create'} className='input-label'>
            college name:
          </label>
          <input
            type='text'
            id={'create'}
            className='input'
            placeholder={`Enter college name`}
            onChange={handleNameChange}
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor={'create'} className='input-label'>
            college principle:
          </label>
          <input
            type='text'
            id={'create'}
            className='input'
            placeholder={`Enter principle`}
            onChange={handlePrincipleChange}
            ref={principleRef}
          />
        </div>
        <button className='btn btn-align-left' onClick={createCollege}>
          create
        </button>
      </section>
      <section className='section'>
        <h1 className='section__head'>colleges</h1>
        <button className='btn btn-align-left' onClick={handleRefresh}>
          refresh
        </button>
        {colleges &&
          colleges.map((college) => {
            return (
              <div className='section__item' key={college.id}>
                {college.name}
                <div className='btn-group'>
                  <Link
                    to={college.id + ''}
                    className='btn btn--type-secondary'
                  >
                    edit
                  </Link>
                  <button
                    to={college.id}
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

export default Colleges;
