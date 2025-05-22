import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Signup = () => {
    const [form, setForm] = useState({ username: '', email: '', password: ''});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await API.post('auth/signup', form);
        navigate('/login');
    };

   return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center mb-4">Signup</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              placeholder="UserName"
              onChange={e => setForm({ ...form, username: e.target.value })}
            />

            <input
              className="form-control mb-2"
              placeholder="Email"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />

            <button className="btn btn-primary w-100">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;