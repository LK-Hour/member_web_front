import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_API_URL, APP_NAME } from "./globals";

const MemberEdit = () => {
  const [id_mem, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const fetchMember = async () => {
    try {
      const response = await axios.post(BASE_API_URL + "/members/searchid", {
        id_mem: id,
      });
      setId(response.data.user.id_mem);
      setName(response.data.user.name_mem);
      setEmail(response.data.user.email_mem);
      setPassword(response.data.user.password_mem);
      setSex(response.data.user.sex_mem);
      setBirthday(new Date(response.data.user.birthday_mem));
      setPhone(response.data.user.phone_mem);
      setAddress(response.data.user.address_mem);
      setZipcode(response.data.user.zipcode_mem);
      setCountry(response.data.user.country_mem);
    } catch (error) {
      alert("Failed to fetch member data");
    }
  };
  useEffect(() => {
    fetchMember(); // Trigger search when the component mounts
  }, [id]);
  const handleEdit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("ยืนยันการบันทึกข้อมูล");
    if (userConfirmed) {
      try {
        await axios.put(BASE_API_URL + "/membersedit", {
          id_mem: id_mem,
          name_mem: name,
          email_mem: email,
          password_mem: password,
          sex_mem: sex,
          birthday_mem: birthday
            ? `${birthday.getFullYear()}-${(birthday.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${birthday
                .getDate()
                .toString()
                .padStart(2, "0")}`
            : null,
          phone_mem: phone,
          address_mem: address,
          zipcode_mem: zipcode,
          country_mem: country,
        });
        alert("Member Edited successfully");
        navigate("/search");
      } catch (error) {
        alert("Failed to edit member");
      }
    }
  };
  const handledel = async () => {
    const userConfirmed = window.confirm("ยืนยันการลบข้อมูล");
    if (userConfirmed) {
      try {
        await axios.delete(BASE_API_URL + "/membersdel", {
          data: { id_mem },
        });
        alert("Member Deleted successfully");
        navigate("/search");
      } catch (error) {
        alert("Failed to Delete member data");
      }
    }
  };
  const handlecancel = () => {
    navigate("/search");
  };
  return (
    <div className="member-edit-container">
      <div className="content-wrapper">
        <h2>EDIT MEMBER</h2>
        <form onSubmit={handleEdit}>
          <div className="form-grid">
            <div className="form-group">
              <input
                type="hidden"
                value={id_mem}
                onChange={(e) => setId(e.target.value)}
              />
              <label>Name:</label>
              <input
                type="text"
                placeholder="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🔒"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Sex:</label>
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="1">ชาย</option>
                <option value="2">หญิง</option>
              </select>
            </div>
            <div className="form-group">
              <label>Birthday:</label>
              <DatePicker
                selected={birthday}
                onChange={(date) => setBirthday(date)}
                dateFormat="yyyy-MM-dd"
                isClearable
                placeholderText="Select a date"
                required
                className="date-picker"
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Address:</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label>Zipcode:</label>
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="delete-button" onClick={handledel}>Delete</button>
            <button type="button" className="cancel-button" onClick={handlecancel}>Cancel</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .member-edit-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: 
            linear-gradient(rgba(134, 134, 151, 0.9), rgba(80, 103, 167, 0.9)),
            url("https://i.pinimg.com/originals/95/ef/b8/95efb8425d270933e5e890b33ab5ef70.gif") no-repeat center center fixed;
          background-size: cover;
          overflow: hidden;
          position: relative;
          background-blend-mode: multiply;
        }

        .content-wrapper {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 3rem;
          border-radius: 25px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
          width: 90%;
          max-width: 1200px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #fff;
          font-size: 2.5rem;
          text-align: center;
          text-shadow: 0 4px 6px rgba(0,0,0,0.3);
          animation: float 3s ease-in-out infinite;
          background: linear-gradient(45deg, #fff, #89c9f3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(400px, 1fr));
          column-gap: 4rem;
          row-gap: 1.5rem;
          margin: 0 auto;
          padding: 0 2rem;
          max-width: 1200px;
        }

        .form-group {
          position: relative;
          margin: 0;
          padding: 0.8rem;
          min-width: 400px;
          max-width: 500px;
          width: 100%;
        }

        .form-group input,
        .form-group select,
        .form-group textarea,
        .react-datepicker-wrapper input {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: #2c3e50;
          transition: all 0.3s ease;
          padding: 14px 18px;
          font-size: 1.05rem;
          border-radius: 10px;
          width: 100%;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #4facfe;
          box-shadow: 0 0 15px rgba(79, 172, 254, 0.3);
          transform: scale(1.02);
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 3rem;
          padding: 0 2rem;
        }

        .save-button, .delete-button, .cancel-button {
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          padding: 1.2rem 2.5rem;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .delete-button {
          background: linear-gradient(45deg, #ff758c, #ff7eb3);
        }

        .cancel-button {
          background: linear-gradient(45deg, #ffa500, #ffd700);
        }

        .save-button:hover, 
        .delete-button:hover,
        .cancel-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .password-input {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .password-input input {
          width: 100%;
          padding-right: 45px; /* Space for the toggle button */
        }

        .password-toggle {
          position: absolute;
          right: 8px; /* Reduced from 15px to move closer to the end */
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.2);
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          backdrop-filter: blur(2px);
          z-index: 2;
        }

        .password-toggle:hover {
          transform: scale(1.1);
          background: rgba(255,255,255,0.3);
        }

        .form-group.full-width {
          grid-column: 1 / -1;
          max-width: 100%;
          min-width: auto;
        }

        label {
          display: block;
          margin-bottom: 0.4rem;
          color: #fff;
          font-weight: 500;
          font-size: 0.95rem;
          transition: transform 0.3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes backgroundFlow {
          0% { transform: translate(-25%, -25%) rotate(0deg); }
          100% { transform: translate(-25%, -25%) rotate(360deg); }
        }

        @media (max-width: 968px) {
          .form-grid {
            grid-template-columns: 1fr;
            padding: 0;
          }
          
          .content-wrapper {
            padding: 2rem;
            width: 90%;
          }
          
          .form-group.full-width {
            grid-column: 1;
          }
        }

        .form-group select {
          width: 100%;
          appearance: none;
          padding-right: 2rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.7rem center;
        }

        .react-datepicker-wrapper {
          width: 100%;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #a0a0a0;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default MemberEdit;