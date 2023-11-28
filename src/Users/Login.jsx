import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  function Submit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3005/api/login", {
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/users");
      })
      .catch((error) => {
        console.error(error.response);
        setErrorMessage(error.response.data.message);
      });
  }
  return (
    <div>
      <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
        <div className="w-25 bg-white rounded p-3">
          <h2>Login</h2>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={Submit}>
            <div className="mb-2">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label">Show Password</label>
            </div>

            <Link
              to="/register"
              className="btn btn-danger"
              style={{ margin: 5 }}
            >
              SignUp
            </Link>
            <button className="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
