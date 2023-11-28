import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const {id} = useParams();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [dateOfBirth, setDateOfBirth] = useState();
    const [role, setRole] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3005/api/users/"+id)
        .then((result) => {
            setName(result.data.name)
            setEmail(result.data.email)
            setPassword(result.data.password)
            // setDateOfBirth(result.data.dateOfBirth)
            setRole(result.data.role)
        })
        .catch((err) => console.log(err))
      },[id])
  
    function Submit(e) {
      e.preventDefault();
      axios
        .put("http://localhost:3005/api/users/"+id, {
          name,
          email,
          password,
        //   dateOfBirth,
          role,
        })
        .then((result) => {
          console.log(result);
          navigate("/users");
        })
        .catch((err) => console.log(err));
    }
    return (
      <div>
        <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
          <div className="w-25 bg-white rounded p-3">
            <h2>Edit User</h2>
            <form onSubmit={Submit}>
              <div className="mb-2">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
  
              <div className="mb-2">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
  
              <div className="mb-2">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
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
  
              {/* <div className="mb-2">
                <label>Date Of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div> */}
  
              <div className="mb-2">
                <label>Role</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {/* <option value="">Open this select menu</option> */}
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <button className="btn btn-success">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Update
