import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/tasks")
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3005/api/sprints")
      .then((result) => setSprints(result.data))
      .catch((err) => console.log(err));
  }, []);

function addTaskToSprint(sprintId, taskId) {
    axios
      .post(`http://localhost:3005/api/sprints/${sprintId}/tasks/${taskId}`)
      .then((result) => {
        console.log(result)
        navigate('/sprints/:id');
      })
      .catch((error) => {
        console.error(error.response);
        setErrorMessage(error.response.data.message);
      });
  }

  function handleDelete(id) {
    axios
      .delete("http://localhost:3005/api/tasks/" + id)
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/createTask" className="btn btn-success">
          Add +
        </Link>
        {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Status</th>
              <th>Add task to Sprint</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return (
                <tr>
                  <td>{task.description}</td>
                  <td>{task.status}</td>

                  <td key={sprints._id}>
                    <div className="mb-2">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          addTaskToSprint(e.target.value,task._id)
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
                    <Link
                      to={`/updateTasks/${task._id}`}
                      className="btn btn-success"
                      style={{ margin: 5 }}
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(task._id)}
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

export default Tasks;
