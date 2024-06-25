import React, { useEffect, useState } from 'react';
const UserAttempts = (openResults) => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {

    const fetchUserAttempts = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        console.error('No user found in local storage');
        return;
      }

      try {
        const response = await fetch('/api/user-attempts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user attempts');
        }

        const data = await response.json();
        setAttempts(data);
      } catch (error) {
        console.error('Error fetching user attempts:', error);
      }
    };

    fetchUserAttempts();
  }, [openResults]);

  return (
    <div>
      <h1>Your Recent Attempts</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speed</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attempts.map((attempt, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{attempt.speed}</td>
              <td className="px-6 py-4 whitespace-nowrap">{attempt.accuracy}</td>
              <td className="px-6 py-4 whitespace-nowrap">{attempt.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAttempts;
