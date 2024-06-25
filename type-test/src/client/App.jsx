import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import Attempts from "./components/Attempts";
import Test from "./components/Test";
import Register from "./components/Register";
import Leaderboard from "./components/Leaderboard";
import UserAttempts from "./components/UserAttempts";


function App() {
  const [openLogin, setOpenLogin] = useState(true);
  const [logReg, setLogReg] = useState(true);

  const [testFinished, setTestFinished] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setOpenLogin(false);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('user');
    //setIsLogged(false);  
    setOpenLogin(true);  
  };

  return (
    <div className="App">
      <button onClick={handleLogout}>Выйти из аккаунта</button>
      <UserAttempts/>
      <Test/>

      {(logReg ? (
        <Login setOpenLogin={setOpenLogin} openLogin={openLogin} setLogReg={setLogReg}/>
      ) : (
        <Register setOpenLogin={setOpenLogin} openLogin={openLogin} setLogReg={setLogReg}/>
      ))}
      <Leaderboard/>
    </div>
  );
}

export default App;
