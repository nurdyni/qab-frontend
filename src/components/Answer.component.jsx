import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Answer = () => {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState({});
  const [questionId, setQuestionId] = useState('');
  const [answerText, setAnswerText] = useState('');

  const inputRef = useRef();
  const selectRef = useRef();

  useEffect(() => {
    getQuestions();
    getAnswer();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getQuestions = () => {
    fetch('http://localhost:5000/questions')
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result.questions);
      })
      .catch((err) => console.error('error', err));
  };

  const { answer_id } = useParams();
  const getAnswer = () => {
    fetch(`http://localhost:5000/answers/${answer_id}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.answer[0]);
        setAnswer(result.answer[0]);
      })
      .catch((err) => console.error('error', err));
  };

  const handleQuestionIdChange = (e) => {
    console.log(e.target.value);
    setQuestionId(e.target.value);
  };
  const handleAnswerTextChange = (e) => {
    setAnswerText(e.target.value);
  };

  const editAnswer = () => {
    // FIXME: edit
    setQuestionId(selectRef.current.value);
    console.log(selectRef.current.value);
    console.log(answerText, questionId);
    fetch(`http://localhost:5000/answers/${answer_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer_text: answerText,
        question_id: questionId,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2 className='page-title'>Answers</h2>
      <section className='section section-first'>
        <h1 className='section__head'>Answer edit</h1>
        <div className='input input--border-none'>
          <label htmlFor={`answer`}>Answer :</label>
          <input
            type='text'
            id={`answer`}
            className='input'
            placeholder='Edit answer'
            defaultValue={answer.answer_text}
            onChange={handleAnswerTextChange}
            ref={inputRef}
          />
        </div>
        <div className='input input--border-none'>
          <label>Question :</label>
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
        </div>
        <button className='btn' onClick={editAnswer}>
          save
        </button>
      </section>
    </>
  );
};

export default Answer;
