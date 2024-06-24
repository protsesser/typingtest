import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import Attempts from "./components/Attempts";
import Test from "./components/Test";
import Register from "./components/Register";


function App() {
  //const [isLogged, setIsLogged] = useState(false);
  const [openLogin, setOpenLogin] = useState(true);
  const [logReg, setLogReg] = useState(true);

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
      <Test/>

      {(logReg ? (
        <Login setOpenLogin={setOpenLogin} openLogin={openLogin} setLogReg={setLogReg}/>
      ) : (
        <Register setOpenLogin={setOpenLogin} openLogin={openLogin} setLogReg={setLogReg}/>
      ))}
    </div>
  );
}

export default App;
