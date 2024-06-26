import React, { useState } from 'react';

const Register = ({setOpenLogin, openLogin, setLogReg}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const data = await response.json();
      setMessage(`User registered successfully: ${data.username}`);
      localStorage.setItem('user', JSON.stringify(data));
      setOpenLogin(false);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${openLogin ? "visible bg-black/40" : "invisible"}`}>
      <div className={`bg-zinc-700 rounded-lg shadow p-6
      transition-all max-w-md`}>
        <form onSubmit={handleRegister}>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Register</h1>
          <input            
            type="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            className="h-12 w-full border-white border-2 rounded-lg p-2 bg-zinc-700" placeholder="Username">
          </input>
          <input            
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="h-12 w-full border-white border-2 rounded-lg p-2 bg-zinc-700" placeholder="Your email">
          </input>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="h-12 w-full border-white border-2 rounded-lg p-2 bg-zinc-700" placeholder="Password">
          </input>
          <button className=" w-full rounded-lg py-2 px-10 bg-sky-400 hover:bg-sky-600 text-black font-bold text-2xl" type="submit">
            Зарегистрироваться
          </button>
          {message && <p>{message}</p>}
          <p onClick={() => setLogReg(true)} className='cursor-pointer text-sky-400'><u>Уже есть аккаунт?</u></p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Register;


/*<form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>*/