import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL, APP_NAME } from "./globals";
// import '../style/MemberSearch.css'; // Import the CSS file
// const user = JSON.parse(localStorage.getItem("user")) || {};

const MemberSearch = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_API_URL + "/members/search", {
        name_mem: name,
      });
      setResults(response.data);
    } catch (error) {
      alert("❌ Search failed");
    }
  };

  const handleSearchReload = async () => {
    try {
      const response = await axios.post(BASE_API_URL + "/members/search", {
        name_mem: name,
      });
      setResults(response.data);
    } catch (error) {
      alert("❌ Search failed");
    }
  };

  useEffect(() => {
    handleSearchReload(); // Trigger search when the component mounts
  }, []);

  const handleEdit = (id_mem) => {
    navigate("/edit", {
      state: { id: id_mem },
    });
  };

  const handleAdd = () => {
    navigate("/insert");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="member-search-container">
      <div className="content-wrapper">
        <h2>{APP_NAME} </h2>
        <p>Welcome, {user?.name_mem || "User"}! 👋</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="search">
            🔍 Search
          </button>
        </form>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID ผู้ใช้</th>
                <th>ชื่อ-นามสกุล</th>
                <th>เบอร์โทร</th>
                <th>E-mail</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((member) => (
                <tr key={member.id_mem}>
                  <td>{member.id_mem}</td>
                  <td>{member.name_mem}</td>
                  <td>{member.phone_mem}</td>
                  <td>{member.email_mem}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(member.id_mem)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-container">
          <button className="add-button" onClick={() => handleAdd()}>
            ➕ Add
          </button>
          <button className="logout-button" onClick={handleLogout}>
            🔑 Logout
          </button>
        </div>
      </div>

      <style jsx>{`
        .member-search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: 
            linear-gradient(rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9)),
            url("https://i.redd.it/n02uwbfazym81.gif") no-repeat center center fixed;
          background-size: cover;
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-blend-mode: multiply;
        }

        .content-wrapper {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 2.5rem;
          border-radius: 25px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
          width: 90%;
          max-width: 1000px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          transition: transform 0.3s ease;
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #fff;
          font-size: 2.8rem;
          text-align: center;
          text-shadow: 0 4px 6px rgba(0,0,0,0.3);
          animation: float 3s ease-in-out infinite;
          background: linear-gradient(45deg, #fff, #89c9f3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.2rem;
          text-align: center;
          margin-bottom: 2rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .search-form {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .search-form input {
          flex: 1;
          padding: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.9);
          color: #2c3e50;
          font-size: 1.1rem;
          transition: all 0.3s ease;
        }

        .search-form input:focus {
          border-color: #4facfe;
          box-shadow: 0 0 20px rgba(79, 172, 254, 0.3);
          transform: scale(1.02);
        }

        .search-form button {
          padding: 1rem 2rem;
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
        }

        .table-container {
          max-height: 500px;
          border-radius: 15px;
          overflow-y: auto;
          margin: 2rem 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          position: relative;
        }

        thead th {
          position: sticky;
          top: 0;
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          padding: 1.2rem;
          color: white;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 1;
        }

        tbody td {
          padding: 1rem;
          color: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        tbody tr {
          transition: all 0.2s ease;
        }

        tbody tr:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(5px);
        }

        .button-container {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .add-button, .logout-button {
          padding: 1rem 2.5rem;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-button {
          background: linear-gradient(45deg, #4facfe, #00f2fe);
        }

        .logout-button {
          background: linear-gradient(45deg, #ff758c, #ff7eb3);
        }

        .add-button:hover, .logout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        &::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 50%, rgba(79, 172, 254, 0.1) 50%);
          animation: backgroundFlow 20s linear infinite;
          z-index: -1;
        }

        @keyframes backgroundFlow {
          0% { transform: translate(-25%, -25%) rotate(0deg); }
          100% { transform: translate(-25%, -25%) rotate(360deg); }
        }

        .edit-button {
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          border: none;
          background: linear-gradient(45deg, #4dff88, #00d4ff);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(77, 255, 136, 0.3);
          z-index: 0;
        }

        .edit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
          animation: buttonShine 1.5s ease-out infinite;
        }

        .edit-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 25%,
            rgba(255,255,255,0.2) 50%,
            transparent 75%
          );
          transform: rotate(45deg);
        }

        .edit-button:hover::before {
          animation: shine 1.5s forwards;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        @keyframes buttonShine {
          0%, 100% { transform: translateY(-2px); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
};

export default MemberSearch;
