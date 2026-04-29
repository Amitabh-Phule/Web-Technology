import { useState } from 'react';
import StartTest from './components/StartTest';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('start'); // start, test, result
  const [results, setResults] = useState(null);

  const startTest = () => {
    setCurrentView('test');
  };

  const finishTest = (testResults) => {
    setResults(testResults);
    setCurrentView('result');
  };

  const restartTest = () => {
    setResults(null);
    setCurrentView('start');
  };

  return (
    <div className="container">
      {currentView === 'start' && <StartTest onStart={startTest} />}
      {currentView === 'test' && <TestPage onFinish={finishTest} />}
      {currentView === 'result' && <ResultPage results={results} onRestart={restartTest} />}
    </div>
  );
}

export default App;
