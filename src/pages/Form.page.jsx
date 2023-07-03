import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      questions: [],
    };
  }

  render() {
    return (
      <>
        <h2 className='page-title'>Evaluation form</h2>
        <section className='section section-first'>
          <h1 className='section__head'>General information</h1>
          <div className='input input--border-none'>
            <label htmlFor={`answer`}>Evaluator's name :</label>
            <input
              type='text'
              id={`answer`}
              className='input'
              placeholder='eg. Nurdin Mohamedi'
            />
          </div>
        </section>
      </>
    );
  }
}
export default Form;
