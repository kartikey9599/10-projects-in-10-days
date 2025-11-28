import React, { useRef, useState } from 'react';
import { data } from '../../assets/data';
import './quiz.css';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);

  const opt1 = useRef(null);
  const opt2 = useRef(null);
  const opt3 = useRef(null);
  const opt4 = useRef(null);
  const optionRefs = [opt1, opt2, opt3, opt4];

  const checkAns = (ev, ans) => {
    if (locked) return;
    const btn = ev.currentTarget;
    if (question.ans === ans) {
      btn.classList.add('is-correct');
      setScore((s) => s + 1);
    } else {
      btn.classList.add('is-wrong');
      // reveal correct
      const correctRef = optionRefs[question.ans - 1];
      if (correctRef?.current) correctRef.current.classList.add('is-correct');
    }
    setLocked(true);
  };

  const goNext = () => {
    if (!locked) return;
    if (index === data.length - 1) {
      setFinished(true);
      return;
    }
    // clear
    optionRefs.forEach((r) => {
      if (r.current) {
        r.current.classList.remove('is-wrong', 'is-correct');
      }
    });
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setQuestion(data[nextIndex]);
    setLocked(false);
  };

  const reset = () => {
    optionRefs.forEach((r) => {
      if (r.current) {
        r.current.classList.remove('is-wrong', 'is-correct');
      }
    });
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLocked(false);
    setFinished(false);
  };

  return (
    <section className="quiz-wrap" aria-live="polite">
      <div className="quiz-card">
        <div className="meta-row">
          <div className="tag">Quiz</div>
          <div className="progress">
            <div
              className="progress-bar"
              style={{
                width: `${((index + (locked ? 1 : 0)) / data.length) * 100}%`,
              }}
            />
          </div>
          <div className="counter">
            {index + 1}/{data.length}
          </div>
        </div>

        {!finished ? (
          <>
            <h2 className="q-title">{question.question}</h2>

            <ol className="options" type="1">
              <li>
                <button
                  ref={opt1}
                  className="opt-btn"
                  onClick={(e) => checkAns(e, 1)}
                >
                  <span className="opt-index">A</span>
                  <span className="opt-text">{question.option1}</span>
                </button>
              </li>
              <li>
                <button
                  ref={opt2}
                  className="opt-btn"
                  onClick={(e) => checkAns(e, 2)}
                >
                  <span className="opt-index">B</span>
                  <span className="opt-text">{question.option2}</span>
                </button>
              </li>
              <li>
                <button
                  ref={opt3}
                  className="opt-btn"
                  onClick={(e) => checkAns(e, 3)}
                >
                  <span className="opt-index">C</span>
                  <span className="opt-text">{question.option3}</span>
                </button>
              </li>
              <li>
                <button
                  ref={opt4}
                  className="opt-btn"
                  onClick={(e) => checkAns(e, 4)}
                >
                  <span className="opt-index">D</span>
                  <span className="opt-text">{question.option4}</span>
                </button>
              </li>
            </ol>

            <div className="actions-row">
              <button className="btn ghost" onClick={reset}>
                Restart
              </button>
              <button
                className={`btn primary ${!locked ? 'disabled' : ''}`}
                onClick={goNext}
                disabled={!locked}
              >
                {index === data.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </>
        ) : (
          <div className="result">
            <h3>Results</h3>
            <p className="score">
              You scored <strong>{score}</strong> out of{' '}
              <strong>{data.length}</strong>
            </p>
            <div className="result-cta">
              <button className="btn primary" onClick={reset}>
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Quiz;
