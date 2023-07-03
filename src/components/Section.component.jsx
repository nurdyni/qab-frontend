import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Section = () => {
  // * Hooks
  const [sectionTitle, setSectionTitle] = useState('');
  const [section, setSection] = useState(() => {
    return {};
  });
  const inputRef = useRef();

  const { section_id } = useParams();
  const getSection = () => {
    fetch(`http://localhost:5000/sections/${section_id}`)
      .then((response) => response.json())
      .then((result) => setSection(result.section[0]))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getSection();
  });

  //*Sending edit Section request
  const editSection = () => {
    fetch(`http://localhost:5000/sections/${section_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section_title: sectionTitle }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  // *Handling input change
  const handleChange = (e) => {
    setSectionTitle(e.target.value);
  };

  return (
    <>
      <h2 className='page-title'>Sections</h2>
      <section className='section'>
        <h1 className='section__head'>Section edit</h1>
        <input
          type='text'
          className='input'
          defaultValue={section.section_title}
          onChange={handleChange}
          ref={inputRef}
        />
        <button className='btn' onClick={editSection}>
          save
        </button>
      </section>
    </>
  );
};
export default Section;
