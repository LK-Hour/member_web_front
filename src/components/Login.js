import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL, APP_NAME } from "./globals";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_API_URL + "/login", {
        email_mem: email,
        password_mem: password,
      });
      alert("🎉 Login Successful");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/search");
    } catch (error) {
      alert(error.response?.data || "❌ Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="content-wrapper">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>🔑 Login to {APP_NAME}</h2>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: url("https://blenderartists.org/uploads/default/original/4X/f/8/1/f8111174602cd0503151e3cacac9ba84393b4540.gif"),
            linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1));
          background-blend-mode: overlay;
          background-size: cover;
          overflow: hidden;
          background-attachment: fixed;
        }

        .content-wrapper {
          background: rgba(170, 170, 170, 0.51);
          padding: 2.3rem;
          border-radius: 50px;
          box-shadow: 0 4px 6px rgba(255, 255, 255, 0.6);
          width: 100%;
          max-width: 400px;
          text-align: center;
          overflow-y: auto;
          max-height: 90vh;
        }

        .login-form {
          animation: float 3s ease-in-out infinite;
        }

        .login-form h2 {
          margin-bottom: 1.5rem;
          color: rgb(0, 0, 0);
        }

        .login-form label {
          display: block;
          margin-bottom: 0.5rem;
          color: rgb(0, 0, 0);
        }

        .login-form input {
          width: calc(100% - 1.5rem);
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #444;
          border-radius: 5px;
          font-size: 1rem;
          background: rgba(207, 207, 207, 0.51);
          color: rgb(0, 0, 0);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .login-form input:focus {
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
        }

        .login-form button {
          width: calc(50% - 1.5rem);
          padding: 0.75rem;
          background: rgb(49, 210, 221);
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }

        .login-form button:hover {
          background: rgb(34, 110, 116);
          transform: scale(1.05);
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes backgroundMotion {
          0% {
            background-position: center;
          }
          100% {
            background-position: top;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
