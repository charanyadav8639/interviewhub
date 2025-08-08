import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function app() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/questions`)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => setError('Failed to load questions'));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Interview Hub</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {questions.length > 0 ? (
        <ul>
          {questions.map((q, index) => (
            <li key={index}>{q.title || q}</li>
          ))}
        </ul>
      ) : (
        <p>No questions yet</p>
      )}
    </div>
  );
}
