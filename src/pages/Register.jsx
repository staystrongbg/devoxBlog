import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../config/supabase';
import Axios from 'axios';
const Login = () => {
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password && password.length < 8) {
      setError('Paswords do not match');
      return;
    } else {
      const { data, error } = await supabase.auth().signup({ email, password });
      setError(error);
    }
  };

  return (
    <div className='auth white-gradient'>
      <h1>Register</h1>
      <div className='bline' />
      <form>
        {/* <input type='text' placeholder='Username' /> */}
        <input
          type='email'
          placeholder='Email'
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          placeholder='Password'
          pattern='\w{8}'
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button type='submit' className='btn' onClick={handleSubmit}>
          Register
        </button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to='/login'>Login here</Link>{' '}
      </p>
    </div>
  );
};

export default Login;
