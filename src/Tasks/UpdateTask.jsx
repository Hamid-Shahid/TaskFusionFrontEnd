import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateTask() {
  const { id } = useParams();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3005/api/tasks/" + id)
      .then((result) => {
        setDescription(result.data.description);
        setStatus(result.data.status);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function Submit(e) {
    e.preventDefault();
    axios
      .put("http://localhost:3005/api/tasks/" + id, { description, status })
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
          <h2>Update Task</h2>
          <form onSubmit={Submit}>
            <div className="mb-2">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="mb-2">
              <label>Status</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                {/* <option value="">Open this select menu</option> */}
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
            </div>
            <button className="btn btn-success">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTask;
