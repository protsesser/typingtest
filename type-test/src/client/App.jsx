import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import Attempts from "./components/Attempts";
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
    <div className="App">
      <button onClick={handleLogout}>Выйти из аккаунта</button>
      <UserAttempts openResults={openResults}/>
      <Test setOpenResults={setOpenResults} setLastAttemptId={setLastAttemptId}/>
      {openResults && <Results openResults={openResults} onClose={()=>setOpenResults(false)} lastAttemptId={lastAttemptId}/>}
      {(logReg ? (
        <Login setOpenLogin={setOpenLogin} openLogin={openLogin} setLogReg={setLogReg}/>
      ) : (
        <Register setOpenLogin={setOpenLogin} openLogin={openLogin} setLogReg={setLogReg}/>
      ))}
      <Leaderboard openResults={openResults}/>
    </div>
  );
}

export default App;
