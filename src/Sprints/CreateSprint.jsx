import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

function CreateSprint() {
    const [name, setName] = useState();
    const [tasks, setTasks] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const navigate = useNavigate();
  
    function Submit(e) {
      e.preventDefault();
      axios
        .post("http://localhost:3005/api/createSprint", {
          name,
          tasks,
          startDate,
          endDate,
        })
        .then((result) => {
          console.log(result);
          navigate("/sprints");
        })
        .catch((err) => console.log(err));
    }
    return (
      <div>
        <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
          <div className="w-25 bg-white rounded p-3">
            <h2>Create Sprint</h2>
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
                <label>Start Ddate</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
  
              <div className="mb-2">
                <label>End Ddate</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
  
              
              <Link
                to="/sprints"
                className="btn btn-danger"
                style={{ margin: 5 }}
              >
                Back
              </Link>
              <button className="btn btn-success">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CreateSprint
