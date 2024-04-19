import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { getToken } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await getToken({ username, password });
    navigate('/');
  };

  return (
    <div className=" bg-blue-200 flex flex-col p-4">
      <label htmlFor="username">Username</label>
      <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="username">Password</label>
      <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
