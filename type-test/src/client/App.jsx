import { useEffect, useState } from "react";
import Login from "./components/Login";
import Test from "./components/Test";
import Register from "./components/Register";
import Leaderboard from "./components/Leaderboard";
import UserAttempts from "./components/UserAttempts";
import Results from "./components/Results";


function App() {
  const [openLogin, setOpenLogin] = useState(true);
  const [logReg, setLogReg] = useState(true);
  const [lastAttemptId, setLastAttemptId] = useState(null);
  const [openResults, setOpenResults] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setOpenLogin(false);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('user');
    setOpenLogin(true);  
  };

  return (
    <div className="App flex justify-between w-full box-border min-h-dvh bg-zinc-800 items-center text-white font-manrope">
      <div className="">
      <UserAttempts openResults={openResults}/>
      </div>
      <div className="">
      <Test setOpenResults={setOpenResults} setLastAttemptId={setLastAttemptId}/>
      {openResults && <Results openResults={openResults} onClose={()=>setOpenResults(false)} lastAttemptId={lastAttemptId}/>}
      
      {(logReg ? (
        <Login setOpenLogin={setOpenLogin} openLogin={openLogin} setLogReg={setLogReg}/>
      ) : (
        <Register setOpenLogin={setOpenLogin} openLogin={openLogin} setLogReg={setLogReg}/>
      ))}
      </div>
      <div className="">
        <Leaderboard openResults={openResults}/>
      </div>
      <button onClick={handleLogout} className="p-2 bg-sky-400 text-black rounded-lg font-bold hover:bg-sky-600 absolute top-0 right-0 m-4">Выйти из аккаунта</button>
    </div>
  );
}

export default App;
