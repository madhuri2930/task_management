import React, { useState } from "react";

const CreateTask = ({ toggle, modal, save }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  //
  const handleSave = () => {
    // Validation logic
    if (!taskName.trim() || !description.trim() || !dueDate.trim()) {
      alert("Please fill out all fields before saving.");
      return; // Exit the function if validation fails
    }
    let taskObj = {
      Name: taskName,
      Description: description,
      DueDate: dueDate,
      Status: status,
    };
    save(taskObj);
    resetForm(); // Reset the form after saving
  };

  const resetForm = () => {
    setTaskName("");
    setDescription("");
    setDueDate("");
    setStatus("Pending");
  };

  const handleClose = () => {
    resetForm(); // Reset form when closing the modal
    toggle(); // Close the modal
  };

  return (
    modal && (
      <div className="modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Task</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label>Description</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group mt-2">
                <label>Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label>Status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateTask;
