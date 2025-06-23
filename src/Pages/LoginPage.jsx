import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './auth.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      dispatch(loginSuccess(user));
      user.role === "admin" ? navigate("/admin/dashboard") : navigate("/employee/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="form-control mt-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary mt-3" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
