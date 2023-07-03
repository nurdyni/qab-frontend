import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Sections = () => {
  const [sections, setSections] = useState([]);
  const [sectionTitle, setSectionTitle] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    getSections();
  }, []);

  const getSections = () => {
    fetch('http://localhost:5000/sections')
      .then((response) => response.json())
      .then((result) => {
        setSections(result.sections);
      })
      .catch((err) => console.error(err));
  };
  const handleRefresh = () => {
    getSections();
  };

  const createSection = () => {
    fetch(`http://localhost:5000/sections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_title: sectionTitle }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error('error', err))
      .finally(() => {
        inputRef.current.value = '';
      });
  };

  const handleChange = (e) => {
    setSectionTitle(e.target.value);
  };

  //A function to edit section in the databse
  const deleteSection = (e) => {
    const id = e.target.attributes[0].textContent;
    fetch(`http://localhost:5000/sections/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2 className='page-title'>Sections</h2>
      <section className='section'>
        <h1 className='section__head'>Create Section</h1>
        <label htmlFor={'create'} className='input-label'>
          section title:
        </label>
        <input
          type='text'
          id={'create'}
          className='input'
          placeholder={`Enter section title`}
          onChange={handleChange}
          ref={inputRef}
        />
        <button className='btn btn-align-left' onClick={createSection}>
          create
        </button>
      </section>
      <section className='section'>
        <h1 className='section__head'>Sections</h1>
        <button className='btn btn-align-left' onClick={handleRefresh}>
          refresh
        </button>
        {sections &&
          sections.map((section) => {
            return (
              <div className='section__item' key={section.id}>
                {section.section_title}
                <div className='btn-group'>
                  <Link to={section.id} className='btn btn--type-secondary'>
                    edit
                  </Link>
                  <button
                    to={section.id}
                    className='btn btn--type-secondary btn--color-red'
                    onClick={deleteSection}
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

export default Sections;
