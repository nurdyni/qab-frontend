import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Department = () => {
  // * Hooks
  const [name, setName] = useState(() => '');
  const [department, setDepartment] = useState(() => '');
  const [headOfDepartment, setHeadOfDepartment] = useState(() => '');
  const [collegeId, setCollegeId] = useState(() => '');
  const [colleges, setColleges] = useState(() => []);

  const { department_id } = useParams();
  const selectRef = useRef();

  const getColleges = () => {
    fetch(`http://localhost:5000/colleges`)
      .then((response) => response.json())
      .then((result) => {
        setColleges(result.colleges);
      })
      .catch((err) => console.error(err));
  };

  const getDepartment = () => {
    fetch(`http://localhost:5000/departments/${department_id}`)
      .then((response) => response.json())
      .then((result) => {
        setDepartment(result.department[0]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDepartment();
    getColleges();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //*Sending edit Section request
  const editSection = () => {
    setCollegeId(selectRef.current.value);
    fetch(`http://localhost:5000/departments/${department_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        head_of_Department: headOfDepartment,
        college_id: collegeId,
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
        <h1 className='section__head'>Department edit</h1>
        <div className='input input--border-none'>
          <label>Department name :</label>
          <input
            type='text'
            className='input'
            defaultValue={department.name}
            onChange={handleNameChange}
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
              defaultValue={department.college_id}
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
        <div className='input input--border-none'>
          <label>Head of department :</label>
          <input
            type='text'
            className='input'
            defaultValue={department.head_of_department}
            onChange={handleHODChange}
          />
        </div>
        <button className='btn' onClick={editSection}>
          save
        </button>
      </section>
    </>
  );
};
export default Department;
