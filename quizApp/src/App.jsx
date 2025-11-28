import React from 'react';
import Quiz from './Components/Quiz/Quiz';

const App = () => {
  return (
    <main className="page-root">
      <header className="app-header">
        <h1>BrainWave — Quick Quiz</h1>
        <p className="sub">Fast. Clean. Fun.</p>
      </header>

      <Quiz />
    </main>
  );
};

export default App;
