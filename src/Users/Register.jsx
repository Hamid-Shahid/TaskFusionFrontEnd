import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [role, setRole] = useState();
  const navigate = useNavigate();

  function Submit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3005/api/register", {
        name,
        email,
        password,
        dateOfBirth,
        role,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
        <div className="w-25 bg-white rounded p-3">
          <h2>Register</h2>
          <form onSubmit={Submit}>
            <div className="mb-2">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label>Date Of Birth</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label>Role</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Open this select menu</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <Link
              to="/"
              className="btn btn-danger"
              style={{ margin: 5 }}
            >
              Back
            </Link>
            <button className="btn btn-success">SignUp</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
