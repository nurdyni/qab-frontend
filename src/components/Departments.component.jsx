import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Departments = () => {
  const [colleges, setColleges] = useState(() => []);
  const [departments, setDepartments] = useState(() => []);
  const [name, setName] = useState(() => '');
  const [headOfDepartment, setHeadOfDepartment] = useState(() => '');
  const [collegeId, setCollegeId] = useState(() => '');

  const nameRef = useRef();
  const hODRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    getColleges();
    getDepartments();
  }, []);

  const getDepartments = () => {
    fetch('http://localhost:5000/departments')
      .then((response) => response.json())
      .then((result) => {
        setDepartments(result.departments);
      })
      .catch((err) => console.error(err));
  };
  const getColleges = () => {
    fetch('http://localhost:5000/colleges')
      .then((response) => response.json())
      .then((result) => {
        setColleges(result.colleges);
      })
      .catch((err) => console.error(err));
  };
  const handleRefresh = () => {
    getDepartments();
  };

  const createDepartment = () => {
    setCollegeId(selectRef.current.value);
    console.log({
      name,
      headOfDepartment,
      collegeId,
    });
    fetch(`http://localhost:5000/departments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        head_of_Department: headOfDepartment,
        college_id: collegeId,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error('error', err))
      .finally(() => {
        nameRef.current.value = '';
        hODRef.current.value = '';
      });
  };

  //A function to edit section in the databse
  const deleteCollege = (e) => {
    const id = e.target.attributes[0].textContent;
    console.log(id, typeof id);
    fetch(`http://localhost:5000/colleges/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleHODChange = (e) => {
    setHeadOfDepartment(e.target.value);
  };
  const handleDropdownChange = (e) => {
    setCollegeId(e.target.value);
  };

  return (
    <>
      <h2 className='page-title'>Departments</h2>
      <section className='section'>
        <h1 className='section__head'>Create department</h1>
        <div>
          <label htmlFor={'create'} className='input-label'>
            Department name:
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
            college:
          </label>
          {colleges && (
            <select
              onChange={handleDropdownChange}
              ref={selectRef}
              className='input'
            >
              {colleges.map((college) => {
                return (
                  <option key={college.id} value={college.id}>
                    {college.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div>
          <label htmlFor={'create'} className='input-label'>
            head of department:
          </label>
          <input
            type='text'
            id={'create'}
            className='input'
            placeholder={`Enter principle`}
            onChange={handleHODChange}
            ref={hODRef}
          />
        </div>
        <button className='btn btn-align-left' onClick={createDepartment}>
          create
        </button>
      </section>
      <section className='section'>
        <h1 className='section__head'>departments</h1>
        <button className='btn btn-align-left' onClick={handleRefresh}>
          refresh
        </button>
        {departments &&
          departments.map((department) => {
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

export default Departments;
