import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiX, HiRefresh } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const Quiz = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { isDarkMode } = useTheme();

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let newScore = 0;
    quiz.questions.forEach(q => {
      if (q.type === 'true-false') {
        if (answers[q.id] === q.correctAnswer) {
          newScore++;
        }
      } else if (q.type === 'text') {
        if (typeof answers[q.id] === 'string' && answers[q.id].toLowerCase() === q.correctAnswer.toLowerCase()) {
          newScore++;
        }
      } else if (answers[q.id] === q.correctAnswer) {
        newScore++;
      }
    });
    setScore((newScore / quiz.questions.length) * 100);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const renderQuestion = () => {
    const q = quiz.questions[currentQuestion];

    return (
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-4">{q.id}. {q.question}</h3>
        
        {q.type === 'multiple-choice' && q.options.map((option, index) => (
          <div key={index} className="mb-2">
            <button 
              onClick={() => handleAnswer(q.id, index)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                answers[q.id] === index
                  ? (isDarkMode ? 'bg-purple-600 border-purple-400' : 'bg-blue-600 border-blue-400 text-white')
                  : (isDarkMode ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-600/50' : 'bg-gray-100 border-gray-200 hover:bg-gray-200')
              }`}
            >
              {option}
            </button>
          </div>
        ))}

        {q.type === 'true-false' && (
          <div className="flex space-x-4">
            <button 
              onClick={() => handleAnswer(q.id, true)}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                answers[q.id] === true
                  ? 'bg-green-500 border-green-400'
                  : (isDarkMode ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-600/50' : 'bg-gray-100 border-gray-200 hover:bg-gray-200')
              }`}
            >
              True
            </button>
            <button 
              onClick={() => handleAnswer(q.id, false)}
              className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                answers[q.id] === false
                  ? 'bg-red-500 border-red-400'
                  : (isDarkMode ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-600/50' : 'bg-gray-100 border-gray-200 hover:bg-gray-200')
              }`}
            >
              False
            </button>
          </div>
        )}

        {q.type === 'text' && (
          <input
            type="text"
            onChange={(e) => handleAnswer(q.id, e.target.value)}
            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
              isDarkMode
                ? 'bg-slate-800 border-slate-600 focus:ring-purple-400'
                : 'bg-white border-gray-300 focus:ring-blue-500'
            }`}
          />
        )}

        <div className="mt-6 flex justify-between">
          <button 
            onClick={() => setCurrentQuestion(currentQuestion - 1)} 
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold disabled:opacity-50"
          >
            Back
          </button>
          {currentQuestion === quiz.questions.length - 1 ? (
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
            >
              Submit
            </button>
          ) : (
            <button 
              onClick={() => setCurrentQuestion(currentQuestion + 1)} 
              disabled={answers[q.id] === undefined}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold disabled:opacity-50"
            >
              Next
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
      <p className={`text-5xl font-extrabold mb-4 ${
        score >= quiz.passingScore ? 'text-green-400' : 'text-red-400'
      }`}>{score.toFixed(2)}%</p>
      <p className="text-lg mb-6">{score >= quiz.passingScore ? 'Congratulations, you passed!' : 'You did not pass this time. Review the material and try again!'}</p>
      
      <button 
        onClick={handleRestart}
        className="flex items-center mx-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
      >
        <HiRefresh className="mr-2" />
        Retake Quiz
      </button>

      <div className="mt-8 text-left">
        <h4 className="text-xl font-bold mb-4">Review Answers</h4>
        {quiz.questions.map(q => {
          const userAnswer = answers[q.id];
          let isCorrect = false;
          if (q.type === 'true-false') {
            isCorrect = userAnswer === q.correctAnswer;
          } else if (q.type === 'text') {
            isCorrect = typeof userAnswer === 'string' && userAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
          } else {
            isCorrect = userAnswer === q.correctAnswer;
          }
          
          return (
            <div key={q.id} className={`p-4 rounded-lg mb-4 border-l-4 ${
              isCorrect 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-red-500 bg-red-500/10'
            }`}>
              <p className="font-semibold">{q.question}</p>
              <p className={`mt-2 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                {isCorrect ? <HiCheck className="inline-block mr-2" /> : <HiX className="inline-block mr-2" />}
                Your answer: {
                  q.type === 'multiple-choice' ? q.options[userAnswer] 
                  : q.type === 'true-false' ? String(userAnswer) 
                  : userAnswer
                }
              </p>
              {!isCorrect && (
                <p className="mt-2 text-gray-400">Correct answer: {q.type === 'multiple-choice' ? q.options[q.correctAnswer] : String(q.correctAnswer)}</p>
              )}
              <p className="mt-2 text-sm italic text-gray-500">{q.explanation}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div className={`p-6 rounded-lg glass-effect transition-all duration-300 ${
      isDarkMode ? 'border border-white/10' : 'border border-gray-200/50'
    }`}>
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">{quiz.title}</h2>
      <AnimatePresence mode="wait">
        {showResults ? renderResults() : renderQuestion()}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
