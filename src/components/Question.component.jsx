import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Question = () => {
  // * Hooks
  const [question, setQuestion] = useState({});
  const [sections, setSections] = useState(() => {
    return [];
  });
  const [questionText, setQuestionText] = useState(question.question_text);
  const [sectionId, setSectionId] = useState(question.section_id);
  const [typeOfQuestion, setTypeOfQuestion] = useState('');
  const inputRef = useRef();

  const getSections = () => {
    fetch('http://localhost:5000/sections')
      .then((response) => response.json())
      .then((result) => setSections(result.sections))
      .then((err) => console.error('error', err));
  };

  const getQuestion = () => {
    fetch(`http://localhost:5000/questions/${question_id}`)
      .then((response) => response.json())
      .then((result) => {
        setQuestion(result.question[0]);
      })
      .catch((err) => console.error(err));
  };
  const { question_id } = useParams();
  useEffect(() => {
    getQuestion();
    getSections();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //*Sending edit Section request
  const editQuestion = () => {
    setSectionId();
    setTypeOfQuestion();
    fetch(`http://localhost:5000/questions/${question_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question_text: questionText,
        type_of_question: typeOfQuestion,
        section_id: sectionId,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  // *Handling input changes
  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };
  const handleSectionIdChange = (e) => {
    setSectionId(e.target.value);
  };
  const handleChange = (e) => {
    setQuestionText(e.target.value);
  };

  return (
    <>
      <h2 className='page-title'>Questions</h2>
      <section className='section'>
        <h1 className='section__head'>Question edit</h1>
        <div className='input input--border-none'>
          <label>Question text :</label>
          <input
            type='text'
            className='input'
            defaultValue={question.question_text}
            onChange={handleQuestionTextChange}
            ref={inputRef}
          />
        </div>
        <div className='input input--border-none'>
          <label>Section Title :</label>
          <select
            onChange={handleSectionIdChange}
            className='input'
            defaultValue={question.section_id}
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
        </div>
        <div className='input input--border-none'>
          <label>Type of question :</label>
          <input
            type='text'
            className='input'
            defaultValue={question.type_of_question}
            onChange={handleChange}
          />
        </div>
        <button className='btn' onClick={editQuestion}>
          save
        </button>
      </section>
    </>
  );
};
export default Question;
