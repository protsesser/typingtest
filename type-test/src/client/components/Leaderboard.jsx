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
      <h1 className='text-2xl font-bold text-center m-2'>Таблица лидеров</h1>
      <table className="min-w-full divide-y divide-sky-400">
        <thead className="bg-sky-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-black">Пользователь</th>
            <th scope="col" className="px-6 py-3 text-left text-black">Очки</th>
            <th scope="col" className="px-6 py-3 text-left text-black">WPM</th>
            <th scope="col" className="px-6 py-3 text-left text-black">Процент</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-700 divide-y divide-sky-400 text-center">
          {attempts.map((attempt, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-left">{attempt.User.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{attempt.score}</td>
              <td className="px-6 py-4 whitespace-nowrap">{attempt.speed}</td>
              <td className="px-6 py-4 whitespace-nowrap">{attempt.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
