import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Answers = () => {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [questionId, setQuestionId] = useState('');

  const inputRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    getQuestions();
    getAnswers();
  }, []);

  const getQuestions = () => {
    fetch('http://localhost:5000/questions')
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result.questions);
      })
      .catch((err) => console.error('error', err));
  };

  //*Getting question number
  const getAnswers = () => {
    fetch('http://localhost:5000/answers')
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAnswers(result.answers);
      })
      .catch((err) => console.error('error', err));
  };

  const createAnswer = () => {
    const id = selectRef.current.value;
    console.log(selectRef);
    setQuestionId(id);
    console.log(answerText, questionId);
    fetch(`http://localhost:5000/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer_text: answerText,
        question_id: questionId,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error('error', err))
      .finally(() => {
        inputRef.current.value = '';
      });
  };

  const handleAnswerTextChange = (e) => {
    setAnswerText(e.target.value);
  };
  const handleQuestionIdChange = (e) => {
    console.log(e.target.value);
    setQuestionId(e.target.value);
  };

  // A function to edit section in the databse
  const deleteAnswer = (e) => {
    const id = e.target.attributes[0].textContent;
    fetch(`http://localhost:5000/answers/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2 className='page-title'>Answers</h2>
      <section className='section'>
        <h1 className='section__head'>Create Answer</h1>
        <label htmlFor={'create'} className='input-label'>
          Answer :
        </label>
        <input
          type='text'
          id={'create'}
          className='input'
          placeholder={`Enter answer`}
          onChange={handleAnswerTextChange}
          ref={inputRef}
        />
        <select
          onChange={handleQuestionIdChange}
          ref={selectRef}
          className='input'
        >
          {questions &&
            questions.map((question) => {
              return (
                <option key={question.id} value={question.id}>
                  {question.question_text}
                </option>
              );
            })}
        </select>
        <button className='btn btn-align-left' onClick={createAnswer}>
          create
        </button>
      </section>
      <section className='section'>
        <h1 className='section__head'>Answers</h1>
        {answers ? null : <span>No answers</span>}
        {answers &&
          answers.map((answer) => {
            return (
              <div className='section__item' key={answer.id}>
                <div>{answer.answer_text}</div>
                <div className='btn-group'>
                  <Link to={answer.id} className='btn btn--type-secondary'>
                    edit
                  </Link>
                  <button
                    to={answer.id}
                    className='btn btn--type-secondary btn--color-red'
                    onClick={deleteAnswer}
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
export default Answers;
