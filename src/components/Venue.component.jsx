import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Venue = () => {
  // * Hooks
  const [name, setName] = useState(() => '');
  const [instructor, setInstuctor] = useState(() => '');
  const [DepartmentId, setDepartmentId] = useState(() => '');
  const [departments, setDepartments] = useState(() => []);

  const { instructor_id } = useParams();
  const selectRef = useRef();

  const getDepartments = () => {
    fetch(`http://localhost:5000/departments`)
      .then((response) => response.json())
      .then((result) => {
        setDepartments(result.departments);
      })
      .catch((err) => console.error(err));
  };

  const getInstructor = () => {
    fetch(`http://localhost:5000/instructors/${instructor_id}`)
      .then((response) => response.json())
      .then((result) => {
        setInstuctor(result.instructor[0]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getInstructor();
    getDepartments();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //*Sending edit Section request
  const editInstructor = () => {
    setDepartmentId(selectRef.current.value);
    fetch(`http://localhost:5000/instructors/${instructor_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        department_id: DepartmentId,
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
  const handleDropdownChange = (e) => {
    setDepartmentId(e.target.value);
  };

  return (
    <>
      <h2 className='page-title'>Instructor</h2>
      <section className='section'>
        <h1 className='section__head'>Instructor edit</h1>
        <div className='input input--border-none'>
          <label>Instructor's name :</label>
          <input
            type='text'
            className='input'
            defaultValue={instructor?.name}
            placeholder={"Enter Instructor's name"}
            onChange={handleNameChange}
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
              defaultValue={instructor.department_id}
            >
              {departments?.map((department) => {
                return (
                  <option key={department?.id} value={department?.id}>
                    {department?.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <button className='btn' onClick={editInstructor}>
          save
        </button>
      </section>
    </>
  );
};
export default Venue;
