import React from "react";

const Results = ({openResults, onClose, speed, accuracy, score}) =>{
	
	return (
    <div className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${openResults ? "visible bg-black/20" : "invisible"}
	  `} onClick={onClose}>
      <div className={`bg-white rounded-lg shadow p-6
      transition-all max-w-md ${openResults ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-4 text-xl">
          <h1 className="text-2xl font-averia-libre font-bold">Результаты теста</h1>
					<h2>Очки: <b>{score}</b></h2>
					<h2>WPM: <b>{speed}</b></h2>
					<h2>Аккуратность: <b>{accuracy}%</b></h2>
          <button className=" w-full rounded-lg py-2 px-10 bg-sky-400 hover:bg-sky-600 text-black font-averia-libre font-bold text-2xl" onClick={onClose}>
            ОК
          </button>
        </div>
      </div>
    </div>
  );
};
export default Results;