import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const apiUrl =
      id !== "all"
        ? `http://localhost:3005/api/projects/${id}`
        : "http://localhost:3005/api/projects";

    axios
      .get(apiUrl)
      .then((result) => {
        const sprintsData = id !== "all" ? [result.data] : result.data;
        setProjects(sprintsData);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleDelete(id) {
    axios
      .delete("http://localhost:3005/api/projects/" + id)
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
            to="/createProject"
            className="btn btn-success"
            style={{ margin: "10px" }}
          >
            Add new Project +
          </Link>

          <Link to="/tasks" className="btn btn-success">
            Add task to Project
          </Link>
        </div>
        
      )}

      <div
        style={{
          display: "flex",
          padding: "20px",
        }}
      >
        {projects.map((project) => (
          <div
            className="card"
            style={{
              width: "18rem",
              margin: "20px",
            }}
            key={project._id}
          >
            <div className="card-body">
              <div style={{ height: "80px", borderRadius: "7px" }}>
                <h4 className="card-title">{project.name}</h4>
              </div>
              <h6>Description</h6>
              <p>{project.description}</p>
              <h6>Start Date</h6>
              <p>{new Date(project.startDate).toLocaleDateString()}</p>
              <h6>End Date</h6>
              <p>{new Date(project.endDate).toLocaleDateString()}</p>

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
                      100 - progress(project.startDate, project.endDate)
                    }%`,
                  }}
                ></div>
              </div>
              <div style={{ marginTop: "3rem" }}>
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleDelete(project._id)}
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

export default Projects;
