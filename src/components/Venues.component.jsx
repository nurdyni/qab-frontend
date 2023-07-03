import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Venues = () => {
  const [colleges, setColleges] = useState(() => []);
  const [venues, setVenues] = useState(() => []);
  const [name, setName] = useState(() => '');
  const [collegeId, setCollegeId] = useState(() => '');
  const [capacity, setCapacity] = useState(() => 0);
  const [location, setLocation] = useState(() => '');

  const nameRef = useRef();
  const collegeRef = useRef();
  const capacityRef = useRef();
  const locationRef = useRef();

  useEffect(() => {
    getColleges();
    getVenues();
  }, []);

  const getVenues = () => {
    fetch('http://localhost:5000/venues')
      .then((response) => response.json())
      .then((result) => {
        setVenues(result.venues);
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
    getVenues();
  };

  const createVenue =  () => {
    setCollegeId(collegeRef.current.value);
    console.log({
      name,
      collegeId,
    });
      fetch(`http://localhost:5000/venues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          location,
          capacity,
          college_id: collegeId,
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
  const deleteVenue = (e) => {
    const id = e.target.attributes[0].textContent;
    fetch(`http://localhost:5000/venues/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCollegeChange = (e) => {
    setCollegeId(e.target.value);
  };
  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <>
      <h2 className='page-title'>Venues</h2>
      <section className='section'>
        <h1 className='section__head'>Create Venue</h1>
        <div>
          <label htmlFor={'create'} className='input-label'>
            Name of venue:
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
            capacity:
          </label>
          <input
            type='text'
            id={'create'}
            className='input'
            placeholder={`Enter college name`}
            onChange={handleCapacityChange}
            ref={capacityRef}
            required
          />
        </div>
        <div>
          <label htmlFor={'create'} className='input-label'>
            location :
          </label>
          <input
            type='text'
            id={'create'}
            className='input'
            placeholder={`Enter college name`}
            onChange={handleLocationChange}
            ref={locationRef}
            required
          />
        </div>
        <div>
          <label htmlFor={'create'} className='input-label'>
            College :
          </label>
          {colleges && (
            <select
              onChange={handleCollegeChange}
              ref={collegeRef}
              className='input'
              required
            >
              {colleges?.map((college) => {
                return (
                  <option key={college.id} value={college.id}>
                    {college.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <button className='btn btn-align-left' onClick={createVenue}>
          create
        </button>
      </section>
      <section className='section'>
        <h1 className='section__head'>Venues</h1>
        <button className='btn btn-align-left' onClick={handleRefresh}>
          refresh
        </button>
        {venues &&
          venues.map((department) => {
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
                    onClick={deleteVenue}
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

export default Venues;
