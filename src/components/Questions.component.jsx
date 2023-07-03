import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [sections, setSections] = useState([]);
  const [section_id, setSectionId] = useState('');
  const [question_text, setQuestionText] = useState('');
  const [type_of_question, setTypeOfQuestion] = useState('');

  const inputRef = useRef();
  const selectRef = useRef();

  const getQuestions = () => {
    fetch('http://localhost:5000/questions')
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result.questions || []);
      })
      .catch((err) => console.error('error', err));
  };
  const handleRefresh = () => {
    getQuestions();
  };

  const getSections = () => {
    fetch('http://localhost:5000/sections')
      .then((response) => response.json())
      .then((result) => {
        setSections(result.sections || []);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getQuestions();
    getSections();
  }, [questions, sections]);

  const createQuestion = () => {
    // const id = selectRef.current.value;
    setSectionId(selectRef.current.value);
    console.log({
      question_text,
      type_of_question,
      section_id,
    });
    fetch(`http://localhost:5000/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question_text,
        type_of_question,
        section_id,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error('error', err))
      .finally(() => {
        inputRef.current.value = '';
      });
  };

  // A function to edit section in the databse
  const deleteQuestion = (e) => {
    const id = e.target.attributes[0].textContent;
    fetch(`http://localhost:5000/questions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  // *Handling input changes
  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleTypeOfQuestChange = (e) => {
    setTypeOfQuestion(e.target.value);
  };
  const handleDropdownChange = (e) => {
    setSectionId(e.target.value);
  };

  return (
    <>
      <h2 className='page-title'>Questions</h2>
      <section className='section'>
        <h1 className='section__head'>Create Question</h1>
        <div className='input input--border-none'>
          <label className='input-label'>Question text :</label>
          <input
            type='text'
            className='input'
            placeholder={`Enter question text`}
            defaultValue={question_text}
            onChange={handleQuestionTextChange}
            ref={inputRef}
          />
        </div>
        <select
          onChange={handleDropdownChange}
          ref={selectRef}
          className='input'
        >
          {sections &&
            sections.map((section) => {
              return (
                <option key={section.id} value={section.id}>
                  {section.section_title}
                </option>
              );
            })}
        </select>
        <div className='input input--border-none'>
          <label className='input-label'>Type of question :</label>
          <input
            type='text'
            className='input'
            placeholder={`Enter question text`}
            defaultValue={type_of_question}
            onChange={handleTypeOfQuestChange}
          />
        </div>
        <button className='btn btn-align-left' onClick={createQuestion}>
          create
        </button>
      </section>
      <section className='section'>
        <h1 className='section__head'>Questions</h1>
        <button className='btn btn-align-left' onClick={handleRefresh}>
          refresh
        </button>
        {questions &&
          questions.map((question) => {
            return (
              <div className='section__item' key={question.id}>
                <div>{question.question_text}</div>
                <div className='btn-group'>
                  <Link to={question.id} className='btn btn--type-secondary'>
                    edit
                  </Link>
                  <button
                    to={question.id}
                    className='btn btn--type-secondary btn--color-red'
                    onClick={deleteQuestion}
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

export default Questions;
