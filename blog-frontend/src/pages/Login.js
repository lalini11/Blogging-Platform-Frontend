import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Login = () => {
const [form, setForm] = useState({email:'', password: ''});
const [error, setError] =useState('');
const navigate = useNavigate();

const handleSubmit = async(e) => {
    e.preventDefault();

    if(!form.email || !form.password){
      setError('Please Enter Both email and password.');
      return;
    }

    try {
      const response =  await API.post('/auth/login', form);
      localStorage.setItem('token', response.data.token);
      setError('');
      navigate('/dashboard');
    } catch(err) {
      setError(err.response?.data?.message || 'Login failed, Please try again.');
    }
   
};

  return (
    <div className='container'>
       <div className='row justify-content-center'>
        <div className='col-md-6'>
            <h3 className="text-center mb-4">Login</h3>

            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={handleSubmit}>

                <input 
                className='form-control mb-2' 
                type='email'
                placeholder='Email'
                value={form.email} 
                onChange={e => setForm({
                    ...form, email: e.target.value
                    })}
                />

                <input  
                type='password'
                className='form-control mb-2' 
                placeholder='Password' 
                value={form.password}
                onChange={e => setForm({
                    ...form, password: e.target.value
                    })}
                />

                <button type='submit' className='btn btn-primary w-100' >
                  Login
                </button>            
            </form>
        </div>
       </div>
    </div>
  )
}

export default Login;