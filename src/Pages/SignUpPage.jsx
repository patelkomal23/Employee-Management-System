import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'

const SignUpPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
  const navigate = useNavigate();

  const handleRegister = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === form.email)) {
      alert("User already exists!");
      return;
    }
    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input className="form-control" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="form-control mt-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="form-control mt-2" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select className="form-control mt-2" onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>
      <button className="btn btn-success mt-3" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default SignUpPage;
