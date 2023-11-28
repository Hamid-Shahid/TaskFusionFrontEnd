import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTeam() {
  const [teamName, setteamName] = useState();
  const [teamMembers, setTeamMembers] = useState([]);

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/users")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  function Submit(e) {
    e.preventDefault();
    console.log("Form submitted");
    axios
      .post("http://localhost:3005/api/createTeam", { teamName, teamMembers })
      .then((result) => {
        console.log(result);
        navigate("/teams");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
        <div className="w-25 bg-white rounded p-3">
          <h2>Create Team</h2>
          <form onSubmit={Submit}>
            <div className="mb-2">
              <label>Team Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setteamName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Add Team Members</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) =>
                  setTeamMembers([...teamMembers, e.target.value])
                }
              >
                <option value="">Open this select menu</option>
                {users.map((user) => {
                  return <option value={user.email}>{user.email}</option>;
                })}
              </select>
            </div>
            <button className="btn btn-success">Submit</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
