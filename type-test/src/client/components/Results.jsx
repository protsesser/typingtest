import React, { useEffect, useState } from "react";

const Results = ({ openResults, onClose, lastAttemptId }) => {
  const [attempt, setAttempt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lastAttemptId) return;

    const fetchAttempt = async () => {
      try {
        const response = await fetch(`/api/attempt/${lastAttemptId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch attempt');
        }

        const data = await response.json();
        setAttempt(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAttempt();
  }, [lastAttemptId]);

  return (
    <div
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${
        openResults ? "visible bg-black/20" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-6 transition-all max-w-md ${
          openResults ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 text-xl">
          <h1 className="text-2xl font-averia-libre font-bold">Результаты теста</h1>
          {error ? (
            <h2 className="text-red-500">{error}</h2>
          ) : attempt ? (
            <>
              <h2>Очки: <b>{attempt.score}</b></h2>
              <h2>WPM: <b>{attempt.speed}</b></h2>
              <h2>Аккуратность: <b>{attempt.accuracy}%</b></h2>
            </>
          ) : (
            <h2>Загрузка...</h2>
          )}
          <button
            className="w-full rounded-lg py-2 px-10 bg-sky-400 hover:bg-sky-600 text-black font-averia-libre font-bold text-2xl"
            onClick={onClose}>
            ОК
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
