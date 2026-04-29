import React from 'react';

function ResultPage({ results, onRestart }) {
  if (!results) return <div>No results found.</div>;

  const { score, total, accuracy, analysis, finalStatus, breakdown } = results;

  const getStatusClass = (status) => {
    if (status === 'Ready') return 'bg-success';
    if (status === 'Moderate') return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="card">
      <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Interview Results</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#007bff' }}>
          {score} / {total}
        </div>
        <div style={{ fontSize: '1.2rem', color: '#555' }}>
          Accuracy: {accuracy}%
        </div>
        <div style={{ marginTop: '1rem' }}>
          <span className={`status-badge ${getStatusClass(finalStatus)}`} style={{ fontSize: '1.1rem', padding: '0.5rem 1rem' }}>
            {finalStatus}
          </span>
        </div>
      </div>

      {analysis && analysis.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3>Behavioral Analysis</h3>
          <ul style={{ paddingLeft: '1.5rem', color: '#444' }}>
            {analysis.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3>Detailed Breakdown</h3>
        {breakdown && breakdown.map((item, idx) => (
          <div key={idx} className="result-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong>Question {item.questionId}</strong>
              <span className={`status-badge ${item.correct ? 'bg-success' : 'bg-danger'}`} style={{ marginTop: 0 }}>
                {item.correct ? 'Correct' : 'Wrong'}
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <div>Time Spent: {item.timeSpent}s</div>
              <div>Remark: <span style={{ fontWeight: '500', color: '#333' }}>{item.remark}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={onRestart}>Take Another Interview</button>
      </div>
    </div>
  );
}

export default ResultPage;
