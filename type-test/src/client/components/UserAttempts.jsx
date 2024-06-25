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
      <h1 className='text-2xl font-bold text-center m-2'>Прошлые попытки</h1>
      <table className="min-w-full divide-y divide-sky-400">
        <thead className="bg-sky-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-black">Очки</th>
            <th scope="col" className="px-6 py-3 text-left text-black">WPM</th>
            <th scope="col" className="px-6 py-3 text-left text-black">Процент</th>         
          </tr>
        </thead>
        <tbody className="bg-zinc-700 divide-y divide-sky-400 text-center">
          {attempts.map((attempt, index) => (
            <tr key={index}>
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

export default UserAttempts;
