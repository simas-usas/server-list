import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

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
    <div className="flex flex-col shrink w-96 m-4 p-4 bg-slate-50	rounded ">
      <Input
        id="username"
        label="Username"
        placeholder="Enter username here..."
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2"
      />
      <Input
        id="password"
        label="Password"
        placeholder="Enter password here..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="mb-10"
      />
      <Button onClick={handleLogin}>Sign in</Button>
    </div>
  );
};

export default Login;
