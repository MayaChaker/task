import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [users, setUser] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      const storedUser = JSON.parse(localStorage.getItem("users"));
      setUser(storedUser);
    }
  }, [isAdmin]);
  if (isAdmin) {
    <div>
      <h2>Welcome Admin</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.FirstName}</li>
        ))}
      </ul>
    </div>;
  }
  return (
    <div className="outer">
      <div className="dot"></div>
      <div className="card">
        <div className="ray"></div>
        <div className="text">WELCOME</div>
        <div className="user-email">{email}</div>
        <button className="elegant-btn" onClick={() => navigate("/login")}>
          Go to Login
        </button>
        <div className="line topl"></div>
        <div className="line leftl"></div>
        <div className="line bottoml"></div>
        <div className="line rightl"></div>
      </div>
    </div>
  );
}
export default Home;
