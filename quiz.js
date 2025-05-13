import React, { useState } from 'react';
import './App.css';

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correct: 2,
  },
  {
    question: 'Which language runs in a web browser?',import React, { useState } from 'react';
import './App.css';

const questionsList = [
  { question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Rome'], answer: 'Paris' },
  { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
  { question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Venus', 'Jupiter'], answer: 'Mars' },
  { question: 'Who wrote "Hamlet"?', options: ['Shakespeare', 'Hemingway', 'Tolkien', 'Rowling'], answer: 'Shakespeare' },
  { question: 'What is the boiling point of water?', options: ['90°C', '100°C', '80°C', '110°C'], answer: '100°C' }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const getRandomQuestionIndex = () => {
    let index;
    do {
      index = Math.floor(Math.random() * questionsList.length);
    } while (index === previousIndex);
    return index;
  };

  const startQuiz = () => {
    const index = getRandomQuestionIndex();
    setCurrentQuestionIndex(index);
    setPreviousIndex(index);
    setScore(0);
    setQuestionCount(0);
    setShowSummary(false);
  };

  const handleAnswer = (option) => {
    if (option === questionsList[currentQuestionIndex].answer) {
      setScore(prev => prev + 1);
    }

    const newCount = questionCount + 1;
    if (newCount >= 5) {
      setShowSummary(true);
    } else {
      const nextIndex = getRandomQuestionIndex();
      setCurrentQuestionIndex(nextIndex);
      setPreviousIndex(currentQuestionIndex);
      setQuestionCount(newCount);
    }
  };

  const restartQuiz = () => {
    startQuiz();
  };

  if (currentQuestionIndex === null) {
    return (
      <div className="app">
        <h1>Welcome to the Quiz!</h1>
        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="app">
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score} / 5</p>
        <button onClick={restartQuiz}>Restart</button>
      </div>
    );
  }

  const currentQuestion = questionsList[currentQuestionIndex];

  return (
    <div className="app">
      <h2>Question {questionCount + 1}</h2>
      <p>{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
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
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correct: 1,
  },
  {
    question: 'What color is the sky?',
    options: ['Green', 'Red', 'Blue', 'Yellow'],
    correct: 2,
  }
];

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [previousQuestionIndex, setPreviousQuestionIndex] = useState(null);
  const [usedIndices, setUsedIndices] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const getNextQuestionIndex = () => {
    const availableIndices = quizData
      .map((_, index) => index)
      .filter(index => index !== previousQuestionIndex && !usedIndices.includes(index));

    if (availableIndices.length === 0) {
      setShowResult(true);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    return availableIndices[randomIndex];
  };

  const startQuiz = () => {
    const firstIndex = getNextQuestionIndex();
    if (firstIndex !== null) {
      setCurrentQuestionIndex(firstIndex);
      setUsedIndices([firstIndex]);
    }
  };

  const handleAnswerClick = (index) => {
    if (currentQuestionIndex === null) return;

    if (index === quizData[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    const nextIndex = getNextQuestionIndex();
    if (nextIndex !== null) {
      setPreviousQuestionIndex(currentQuestionIndex);
      setCurrentQuestionIndex(nextIndex);
      setUsedIndices([...usedIndices, nextIndex]);
    }
  };

  return (
    <div className="app">
      <div className="quiz-box">
        {showResult ? (
          <div className="result">
            <h2>Quiz Completed!</h2>
            <p>Your Score: <strong>{score}</strong> / {quizData.length}</p>
          </div>
        ) : currentQuestionIndex === null ? (
          <div className="start-screen">
            <h2>Welcome to the Quiz!</h2>
            <button onClick={startQuiz}>Start Quiz</button>
          </div>
        ) : (
          <>
            <h2>Question {usedIndices.length} of {quizData
