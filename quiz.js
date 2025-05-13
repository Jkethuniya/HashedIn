import React, { useState } from 'react';
import './App.css';

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correct: 2,
  },
  {
    question: 'Which language runs in a web browser?',
    options: ['Java', 'C', 'Python', 'JavaScript'],
    correct: 3,
  },
  {
    question: 'What does CSS stand for?',
    options: [
      'Central Style Sheets',
      'Cascading Style Sheets',
      'Cascading Simple Sheets',
      'Control Style Sheets',
    ],
    correct: 1,
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (index) => {
    if (index === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="app">
      <div className="quiz-box">
        {showResult ? (
          <div className="result">
            <h2>Quiz Completed!</h2>
            <p>
              Your Score: <strong>{score}</strong> / {quizData.length}
            </p>
          </div>
        ) : (
          <>
            <h2>
              Question {currentQuestion + 1} of {quizData.length}
            </h2>
            <div className="question">
              {quizData[currentQuestion].question}
            </div>
            <div className="options">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
