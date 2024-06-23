import React, { useState, useEffect } from 'react';

const Attempts = ({ user }) => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await fetch(`/api/attempts/${user.id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attempts');
        }

        const data = await response.json();
        setAttempts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user) {
      fetchAttempts();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to see your attempts.</p>;
  }

  return (
    <div>
      <h2>Your Attempts</h2>
      <ul>
        {attempts.map((attempt) => (
          <li key={attempt.id}>
            Speed: {attempt.speed}, Accuracy: {attempt.accuracy}, Score: {attempt.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attempts;
