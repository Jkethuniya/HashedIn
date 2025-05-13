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
