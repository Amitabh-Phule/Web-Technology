import React from 'react';

function StartTest({ onStart }) {
  return (
    <div className="card">
      <h1>Interview Reality Simulator</h1>
      <p>
        Welcome to the technical interview simulation. This test is designed to evaluate not just your technical knowledge, but also your behavior under pressure.
      </p>
      <ul>
        <li>You will have a <strong>10-minute global timer</strong> for all questions.</li>
        <li>Once you select an option, it will be <strong>locked</strong>. You cannot change your answer.</li>
        <li>There is <strong>no backtracking</strong> to previous questions.</li>
        <li>Your time spent per question is tracked and analyzed.</li>
        <li>The test will auto-submit when the timer reaches 0.</li>
      </ul>
      <p>Are you ready?</p>
      <button onClick={onStart}>Start Interview</button>
    </div>
  );
}

export default StartTest;
