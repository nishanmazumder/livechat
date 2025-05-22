import { useState, useContext } from 'react';
import AuthContext from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const redirectTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (response) return redirectTo('/chat');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        required
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        required
      />
      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginForm;
