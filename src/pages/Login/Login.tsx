import { useState } from 'react';
import { useAuthContext } from '#contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Button, Spinner, Input } from '#components';

const Login = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const { getToken, isPending } = useAuthContext();
  const navigate = useNavigate();

  const onLoginClick = async () => {
    setError(false);

    if (!username) {
      setUsername('');
      document.getElementById('username')?.focus();
      return;
    }

    if (!password) {
      setPassword('');
      document.getElementById('password')?.focus();
      return;
    }

    try {
      await getToken({ username, password });
      navigate('/');
    } catch (e) {
      setError(true);
    }
  };

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col shrink w-96 m-4 p-4 bg-slate-50	rounded">
      {error && <div className="text-red-500 text-center mb-2">Incorrect username or password – please try again.</div>}
      <div className="mb-2">
        <Input
          id="username"
          label="Username"
          inputProps={{
            placeholder: 'Enter username here...',
            type: 'text',
            onChange: (e) => setUsername(e.target.value),
            className: twMerge('mb-1', username === '' && ' border-red-500'),
          }}
        />
        {username === '' && <div className="text-red-500">Please enter a valid username.</div>}
      </div>
      <div className="mb-2">
        <Input
          id="password"
          label="Password"
          inputProps={{
            placeholder: 'Enter password here...',
            type: 'password',
            onChange: (e) => setPassword(e.target.value),
            className: twMerge('mb-1', password === '' && ' border-red-500'),
          }}
        />
        {password === '' && <div className="text-red-500">Please enter a valid password.</div>}
      </div>
      <Button onClick={onLoginClick} aria-label="sign in">
        Sign in
      </Button>
    </div>
  );
};

export default Login;
