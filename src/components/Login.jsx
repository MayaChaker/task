import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleDataChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (data.email === "admin@example.com") {
      const res = await axios.get("https://reqres.in/api/users");
      localStorage.setItem("users", JSON.stringify(res.data.data));
      localStorage.setItem("email", data.email);
    }

    try {
      setLoading(true);
      const res = await axios.post("https://reqres.in/api/login", {
        email: data.email,
        password: data.password,
      });
      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", data.email);
      navigate("/home");
    } catch (error) {
      setError("Failed to login");
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form_front">
          <div className="form_details">Login</div>
          <input
            name="email"
            placeholder="email"
            className="input"
            type="text"
            value={data.email}
            onChange={handleDataChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            className="input"
            type="password"
            value={data.password}
            onChange={handleDataChange}
            required
          />
          <button className="btn" type="submit" disabled={loading}>
            Login
          </button>
          <span className="switch">
            Don't have an account?
            <Link to="/register" className="signup_tog">
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
export default Login;
