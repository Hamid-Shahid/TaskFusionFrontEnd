import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3005/api/users")
    .then((result) => setUsers(result.data))
    .catch((err) => console.log(err))
  },[])

  function calculateAge(dateOfBirthString) {
    const dateOfBirth = new Date(dateOfBirthString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    if (
      currentDate.getMonth() === dateOfBirth.getMonth() ||
        currentDate.getDate() < dateOfBirth.getDate()
    ) {
      age--;
    }
    return age;
  }  

  function handleDelete(id){
    axios
      .delete("http://localhost:3005/api/users/" + id)
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        {/* <Link to="/create" className="btn btn-success">Add +</Link> */}
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{calculateAge(user.dateOfBirth)}</td>
                  <td>{user.role}</td>
                  <td>
                  <Link
                      to={`/updateUser/${user._id}`}
                      className="btn btn-success"
                      style={{ margin: 5 }}
                    >
                      Edit
                    </Link>
                    <button className="btn btn-danger" onClick={(e)=>{handleDelete(user._id)}}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
