import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  function Submit(e) {
    e.preventDefault();
    console.log("Form submitted");
    axios
      .post("http://localhost:3005/api/createTask", { description, status })
      .then((result) => {
        console.log(result);
        navigate("/tasks");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
        <div className="w-25 bg-white rounded p-3">
          <h2>Create Task</h2>
          <form onSubmit={Submit}>
            <div className="mb-2">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Status</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Open this select menu</option>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
