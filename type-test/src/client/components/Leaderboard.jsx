import React, { useEffect, useState } from 'react';

const Leaderboard = (openResults) => {
  const [attempts, setAttempts] = useState([]);
  

  useEffect(() => {
    const fetchTopAttempts = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        setAttempts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching top attempts:', error);
      }
    };
		fetchTopAttempts();
  }, [openResults]);

  return (
    <div className="">
      <h1>Leaderboard</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speed</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attempts.map((attempt, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{attempt.User.name}</td>
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

export default Leaderboard;
