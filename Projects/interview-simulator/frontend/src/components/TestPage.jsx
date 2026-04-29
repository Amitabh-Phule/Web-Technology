import React, { useState, useEffect } from 'react';
import { fetchQuestions, submitTest } from '../services/api';

const TOTAL_TIME = 600; // 10 minutes in seconds

function TestPage({ onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const [globalTimeLeft, setGlobalTimeLeft] = useState(TOTAL_TIME);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  
  const [loading, setLoading] = useState(true);

  // Fetch questions on mount
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
        setQuestionStartTime(Date.now());
        setLoading(false);
      } catch (err) {
        console.error("Failed to load questions", err);
      }
    };
    getQuestions();
  }, []);

  // Global Timer
  useEffect(() => {
    if (loading) return;

    if (globalTimeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setGlobalTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [globalTimeLeft, loading]);

  const handleAutoSubmit = async () => {
    // Collect current state before submitting
    const finalAnswers = [...answers];
    
    // If we're on a question and time runs out, mark it as skipped or save current if locked
    if (questions[currentIndex]) {
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
      finalAnswers.push({
        questionId: questions[currentIndex].id,
        selectedOption: isLocked ? selectedOption : null,
        timeSpent: timeSpent
      });
    }

    try {
      const result = await submitTest(finalAnswers);
      onFinish(result);
    } catch (err) {
      console.error("Error auto-submitting:", err);
    }
  };

  const handleOptionSelect = (index) => {
    if (isLocked) return;
    setSelectedOption(index);
    setIsLocked(true);
  };

  const handleNext = async () => {
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    
    const newAnswers = [
      ...answers,
      {
        questionId: questions[currentIndex].id,
        selectedOption: selectedOption,
        timeSpent
      }
    ];

    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsLocked(false);
      setQuestionStartTime(Date.now());
    } else {
      // Submit
      try {
        const result = await submitTest(newAnswers);
        onFinish(result);
      } catch (err) {
        console.error("Error submitting test", err);
      }
    }
  };

  if (loading) return <div>Loading questions...</div>;
  if (!questions || questions.length === 0) return <div>No questions available.</div>;

  const currentQuestion = questions[currentIndex];
  
  // Format time
  const minutes = Math.floor(globalTimeLeft / 60);
  const seconds = globalTimeLeft % 60;
  const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="card" style={{ position: 'relative' }}>
      <div className={`timer ${globalTimeLeft < 60 ? 'danger' : ''}`}>
        Time Left: {timeString}
      </div>
      
      <div className="question-header">
        <span className="status-badge" style={{ backgroundColor: '#6c757d', marginBottom: '1rem' }}>
          {currentQuestion.category}
        </span>
        <h2>Question {currentIndex + 1} of {questions.length}</h2>
      </div>

      <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{currentQuestion.question}</p>
      
      {currentQuestion.code && (
        <pre>
          <code>{currentQuestion.code}</code>
        </pre>
      )}

      <div className="options-container">
        {currentQuestion.options.map((opt, idx) => (
          <button
            key={idx}
            className={`option ${selectedOption === idx ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(idx)}
            disabled={isLocked && selectedOption !== idx}
          >
            {opt}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleNext} 
          disabled={!isLocked}
        >
          {currentIndex === questions.length - 1 ? "Submit Test" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

export default TestPage;
