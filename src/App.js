import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin.jsx';
import Sections from './components/Sections.component';
import Questions from './components/Questions.component';
import Answers from './components/Answers.components';
import Section from './components/Section.component';
import Question from './components/Question.component';
import Login from './pages/Login.page';
import Home from './pages/Home.page';
import Form from './pages/Form.page';
import Dashboard from './components/Dashboard.component';
import Answer from './components/Answer.component';
import Colleges from './components/Colleges.component';
import College from './components/College.component';
import Departments from './components/Departments.component';
import Department from './components/Department.component';
import User from './components/User.component';
import Users from './components/Users.component';
import Instructors from './components/Instructors.component';
import Instructor from './components/Instructor.component';
import Venues from './components/Venues.component';
import Venue from './components/Venue.component';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/form' element={<Form />} />
        <Route path='admin' element={<Admin />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='sections' element={<Sections />} />
          <Route path='sections/:section_id' element={<Section />} />
          <Route path='questions' element={<Questions />} />
          <Route path='questions/:question_id' element={<Question />} />
          <Route path='answers' element={<Answers />} />
          <Route path='answers/:answer_id' element={<Answer />} />
          <Route path='colleges' element={<Colleges />} />
          <Route path='colleges/:college_id' element={<College />} />
          <Route path='departments' element={<Departments />} />
          <Route path='departments/:department_id' element={<Department />} />
          <Route path='users' element={<Users />} />
          <Route path='users/:user_id' element={<User />} />
          <Route path='instructors' element={<Instructors />} />
          <Route path='instructors/:instructor_id' element={<Instructor />} />
          <Route path='courses' element={<Instructors />} />
          <Route path='courses/:course_code' element={<Instructor />} />
          <Route path='lessons' element={<Instructors />} />
          <Route path='lessons/:lesson_id' element={<Instructor />} />
          <Route path='timetables' element={<Instructors />} />
          <Route path='timetables/:timetable_id' element={<Instructor />} />
          <Route path='venues' element={<Venues />} />
          <Route path='venues/:venue_id' element={<Venue />} />
          <Route path='form' element={<Form />} />
          <Route path='*' element={<h1>Page not found</h1>} />
        </Route>
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
