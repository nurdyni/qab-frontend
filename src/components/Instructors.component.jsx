import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Instructors = () => {
  const [departments, setDepartments] = useState(() => []);
  const [instructors, setInstructors] = useState(() => []);
  const [name, setName] = useState(() => '');
  const [departmentId, setDepartmentId] = useState(() => '');

  const nameRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    getDepartments();
    getInstructors();
  }, []);

  const getInstructors = () => {
    fetch('http://localhost:5000/instructors')
      .then((response) => response.json())
      .then((result) => {
        setInstructors(result.instructors);
      })
      .catch((err) => console.error(err));
  };
  const getDepartments = () => {
    fetch('http://localhost:5000/departments')
      .then((response) => response.json())
      .then((result) => {
        setDepartments(result.departments);
      })
      .catch((err) => console.error(err));
  };
  const handleRefresh = () => {
    getInstructors();
  };

  const createInstructor = () => {
    setDepartmentId(selectRef.current.value);
    console.log({
      name,
      departmentId,
    });
    fetch(`http://localhost:5000/instructors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        department_id: departmentId,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error('error', err))
      .finally(() => {
        nameRef.current.value = '';
      });
  };

  //A function to edit section in the databse
  const deleteInstructor = (e) => {
    const id = e.target.attributes[0].textContent;
    fetch(`http://localhost:5000/instructors/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDropdownChange = (e) => {
    setDepartmentId(e.target.value);
  };

  return (
    <>
      <h2 className='page-title'>Instructors</h2>
      <section className='section'>
        <h1 className='section__head'>Create Instructor</h1>
        <div>
          <label htmlFor={'create'} className='input-label'>
            Instructor's name:
          </label>
          <input
            type='text'
            id={'create'}
            className='input'
            placeholder={`Enter college name`}
            onChange={handleNameChange}
            ref={nameRef}
            required
          />
        </div>
        <div>
          <label htmlFor={'create'} className='input-label'>
            Department:
          </label>
          {departments && (
            <select
              onChange={handleDropdownChange}
              ref={selectRef}
              className='input'
              required
            >
              {departments?.map((department) => {
                return (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <button className='btn btn-align-left' onClick={createInstructor}>
          create
        </button>
      </section>
      <section className='section'>
        <h1 className='section__head'>instructors</h1>
        <button className='btn btn-align-left' onClick={handleRefresh}>
          refresh
        </button>
        {instructors &&
          instructors.map((department) => {
            return (
              <div className='section__item' key={department.id}>
                {department.name}
                <div className='btn-group'>
                  <Link
                    to={department.id + ''}
                    className='btn btn--type-secondary'
                  >
                    edit
                  </Link>
                  <button
                    to={department.id + ''}
                    className='btn btn--type-secondary btn--color-red'
                    onClick={deleteInstructor}
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

export default Instructors;
