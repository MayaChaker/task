import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    FirstName: "",
    username: "",
    email: "eve.holt@reqres.in",
    password: "pistol",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://reqres.in/api/register",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", data.email);
      navigate("/home");
    } catch (error) {
      setError("Failed to register");
      console.log(error);
    }
    setLoading(false);
  }

  function handleDataChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form_front">
          <div className="form_details">Register</div>

          <input
            name="FirstName"
            type="text"
            placeholder="FirstName"
            className="input"
            value={data.FirstName}
            onChange={handleDataChange}
            required
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="input"
            value={data.username}
            onChange={handleDataChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            value={data.email}
            onChange={handleDataChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input"
            value={data.password}
            onChange={handleDataChange}
            required
          />

          <button type="submit" className="btn" disabled={loading}>
            Register
          </button>

          <span className="switch">
            Already have an account?
            <Link to="/login" className="signup_tog">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
