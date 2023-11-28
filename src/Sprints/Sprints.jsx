import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Sprints() {
  const [sprints, setSprints] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const apiUrl =
      id !== "all"
        ? `http://localhost:3005/api/sprints/${id}`
        : "http://localhost:3005/api/sprints";

    axios
      .get(apiUrl)
      .then((result) => {
        const sprintsData = id !== "all" ? [result.data] : result.data;
        setSprints(sprintsData);
        // console.log([result.data]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleDelete(id) {
    axios
      .delete("http://localhost:3005/api/sprints/" + id)
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  function progress(startDateString, endDateString) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const currentDate = new Date();
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const daysLeft = (endDate - currentDate) / (1000 * 60 * 60 * 24);
    const percentageDaysLeft = Math.floor((daysLeft / totalDays) * 100);
    return percentageDaysLeft;
  }

  return (
    <div>
      {id === "all" && (
        <div>
          <Link
            to="/createSprint"
            className="btn btn-success"
            style={{ margin: "10px" }}
          >
            Add new sprint
          </Link>

          <Link to="/tasks" className="btn btn-success">
            Add task to sprint
          </Link>
        </div>
        
      )}

      <div
        style={{
          display: "flex",
          padding: "20px",
        }}
      >
        {sprints.map((sprint) => (
          <div
            className="card"
            style={{
              width: "18rem",
              margin: "20px",
            }}
            key={sprint._id}
          >
            <div className="card-body">
              <div style={{ height: "80px", borderRadius: "7px" }}>
                <h4 className="card-title">{sprint.name}</h4>
              </div>
              <h6>Tasks</h6>
              <ul className="list-group list-group-flush">
                {sprint.tasks.map((task) => (
                  <React.Fragment key={task._id}>
                    <li className="list-group-item d-flex justify-content-between">
                      <div>{task.description}</div>
                      <div
                        style={{
                          color: task.status === "pending" ? "red" : "green",
                        }}
                      >
                        {task.status}
                      </div>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
              <hr style={{ marginTop: 0 }} />
              <h6>Start Date</h6>
              <p>{new Date(sprint.startDate).toLocaleDateString()}</p>
              <h6>End Date</h6>
              <p>{new Date(sprint.endDate).toLocaleDateString()}</p>

              <h6>Time Line</h6>

              <div
                className="progress"
                role="progressbar"
                aria-label="Info example"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="progress-bar bg-info"
                  style={{
                    width: `${
                      100 - progress(sprint.startDate, sprint.endDate)
                    }%`,
                  }}
                ></div>
              </div>
              <div style={{ marginTop: "3rem" }}>
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleDelete(sprint._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sprints;
