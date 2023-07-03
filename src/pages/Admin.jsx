import React from 'react';
// import { MdDashboard } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div className='App'>
      {/*         <header className='header'>
          <nav className='navbar'></nav>
        </header> */}
      <div className='sidebar'>
        <Link to={`/admin/dashboard`} className='sibebar__nav-item'>
          {/* <span className='icon'>
            <MdDashboard />
          </span> */}
          <span className='icon-text'>Dashboard</span>
        </Link>
        <Link to={`/admin/form`} className='sibebar__nav-item'>
          form
        </Link>
        <Link to={`/admin/sections`} className='sibebar__nav-item'>
          sections
        </Link>
        <Link to={`/admin/questions`} className='sibebar__nav-item'>
          questions
        </Link>
        <Link to={`/admin/answers`} className='sibebar__nav-item'>
          answers
        </Link>
        <Link to={`/admin/colleges`} className='sibebar__nav-item'>
          colleges
        </Link>
        <Link to={`/admin/departments`} className='sibebar__nav-item'>
          departments
        </Link>
        <Link to={`/admin/users`} className='sibebar__nav-item'>
          users
        </Link>
        <Link to={`/admin/courses`} className='sibebar__nav-item'>
          courses
        </Link>
        <Link to={`/admin/lessons`} className='sibebar__nav-item'>
          lessons
        </Link>
        <Link to={`/admin/venues`} className='sibebar__nav-item'>
          venues
        </Link>
        <Link to={`/admin/timetables`} className='sibebar__nav-item'>
          timtables
        </Link>
        <Link to={`/login`} className='sibebar__nav-item'>
          logout
        </Link>
      </div>
      <main className='main-page'>
        <Outlet />
      </main>
    </div>
  );
};
export default Admin;
