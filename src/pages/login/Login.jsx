import axios from "axios";
// import { useContext, useState } from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
// import Footer from "../../assets/components/footer/Footer";
// import Navb from "./nav/Navb";
// import Navb from "../../assets/components/nav/Navb";
// import Navtop from "../../assets/components/navtop/Navtop";
// import Navtop from "./navtop/Navtop";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isStudent) {
        // dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/dashboard");
       
      } else {
        // dispatch({
        //   type: "LOGIN_FAILURE",
        //   payload: { message: "You are not allowed!" },
        // });
      }
    } catch (err) {
      // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <>
      {/* <div >
        <Navtop />
        <Navb />
      </div> */}
      <div className="login">
        <div className="lContainer">
          <h3>Login</h3>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
