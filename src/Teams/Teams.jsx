import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Teams() {
  const [teams, setTeams] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/teams")
      .then((result) => {
        setTeams(result.data.team);
        console.log(result.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3005/api/sprints")
      .then((result) => setSprints(result.data))
      .catch((err) => console.log(err));
  }, []);

  function handleDelete(id) {
    axios
      .delete("http://localhost:3005/api/teams/" + id)
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function assignSprintToTeam(sprintId, teamId) {
    axios
      .post(`http://localhost:3005/api/teams/${teamId}/sprints/${sprintId}`)
      .then((result) => {
        window.location.reload();
        console.log(result);
      })
      .catch((error) => {
        console.error(error.response);
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Team Members</th>
              <th>Sprint</th>
              <th>Assign Sprint To Team</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => {
              return (
                <tr>
                  <td>{team.teamName}</td>
                  <td>
                    {team.teamMembers.map((member) => (
                      <div>
                        {member.name}
                        <hr style={{ width: "50%", borderColor: "#B6BBC4" }} />
                      </div>
                    ))}
                  </td>
                  <td>
                    {team.sprints.map((s) => (
                      <div>
                        <Link
                          to={`/sprints/${s._id}`}
                          style={{ color: "black" }}
                        >
                          {s.name}
                        </Link>
                        <hr style={{ width: "50%", borderColor: "#B6BBC4" }} />
                      </div>
                    ))}
                  </td>

                  <td>
                    <div className="mb-2">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          assignSprintToTeam(e.target.value, team._id)
                        }
                      >
                        <option value="">Open this select menu</option>
                        {sprints.map((sprint) => (
                          <option value={sprint._id}>{sprint.name}</option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        handleDelete(team._id);
                      }}
                    >
                      Delete
                    </button>
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

export default Teams;
