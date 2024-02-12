import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
// import Navb from "../../assets/components/nav/Navb";
// import Navtop from "../../assets/components/navtop/Navtop";
// import Footer from "../../assets/components/footer/Footer";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    country: "",
    phone: "",
    grade: "",
    section: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Check if required fields are empty
      if (
        !credentials.username ||
        !credentials.email ||
        !credentials.country ||
        !credentials.phone ||
        !credentials.grade ||
        !credentials.section ||
        !credentials.password
      ) {
        throw new Error("Please fill in all required fields.");
      }

      const res = await axios.post("/auth/register", credentials);
      if (!res.data.isAdmin) {
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
        setError("You are not allowed!");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || "An error occurred");
    }
  };

  const handleRegisterLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <div >
        {/* <Navtop />
        <Navb /> */}
      </div>
      <div className="register">
        <div className="rContainer">
          {!success && (
            <>
              <h3>Register</h3>
              <input
                type="text"
                placeholder="username"
                id="username"
                value={credentials.username}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="text"
                placeholder="email"
                id="email"
                value={credentials.email}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="text"
                placeholder="country"
                id="country"
                value={credentials.country}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="text"
                placeholder="phone"
                id="phone"
                value={credentials.phone}
                onChange={handleChange}
                className="rInput"
                required
              />
              <input
                type="text"
                placeholder="grade"
                id="grade"
                value={credentials.grade}
                onChange={handleChange}
                className="rInput"
                required
              />
              <select
                id="section"
                placeholder="section select One('A','B','C')"
                value={credentials.section}
                onChange={handleChange}
                className="rInputsection"
                required
              >
                <option value="" disabled>
                  Select a batch as per your Time
                </option>
                <option value="A">6:00pm - 7:00pm</option>
                <option value="B">7:00pm - 8:00pm</option>
                <option value="C">8:00pm - 9:00pm</option>
              </select>
              <input
                type="password"
                placeholder="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                className="rInput"
                required
              />

              <button
                disabled={loading}
                type="submit"
                onClick={handleRegister}
                className="rButton"
              >
                Register
              </button>
            </>
          )}
          {error && <span>{error}</span>}
          {success && <span>Successfully Registered</span>}
          {success && (
            <button onClick={handleRegisterLogin} className="rButton">
              Go To Login
            </button>
          )}
        </div>
        <button onClick={handleRegisterLogin} className="rButton">
              Go Direct to Login
            </button>
      {/* <a href="/login">login</a> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Register;
