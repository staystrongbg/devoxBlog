import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../config/supabase';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    setUsername(formRef.current[0].value);
    setPassword(formRef.current[2].value);
    e.preventDefault();
  };

  const handleLogin = async () => {
    setUsername(formRef.current[0].value);
    setPassword(formRef.current[2].value);
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ username, password });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth white-grdient'>
      <h1>Login</h1>
      <div className='bline' />
      <form ref={formRef}>
        <input type='text' placeholder='Username' required />
        <input type='password' placeholder='Password' required />
        <button className='btn' onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register here</Link>{' '}
      </p>
    </div>
  );
};

export default Login;
