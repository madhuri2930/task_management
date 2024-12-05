import { useState } from "react";
import EditTask from "../modals/EditTask";

const Card = ({
  taskObj,
  index,
  deleteTask,
  updateListArray,
  toggleStatus,
}) => {
  const [modal, setModal] = useState(false);

  const colors = [
    { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
    { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
    { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
    { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
    { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" },
  ];

  const toggle = () => setModal(!modal);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(index);
    }
  };

  return (
    <div
      className="card-wrapper shadow"
      style={{
        background: colors[index % 5].secondaryColor,
        borderRadius: "12px",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "300px",
        position: "relative",
      }}
    >
      {/* Task Header */}
      <div
        className="card-header"
        style={{
          backgroundColor: colors[index % 5].primaryColor,
          color: "white",
          borderRadius: "8px",
          padding: "10px",
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        {taskObj.Name}
      </div>

      {/* Task Details */}
      <div
        className="task-details"
        style={{
          marginTop: "15px",
          lineHeight: "1.6",
          fontSize: "14px",
        }}
      >
        <p style={{ color: "#333", wordBreak: "break-word" }}>
          {taskObj.Description}
        </p>
        <p>
          <strong>Due Date:</strong> {taskObj.DueDate}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: taskObj.Status === "Completed" ? "#28a745" : "#dc3545",
              fontWeight: "bold",
            }}
          >
            {taskObj.Status}
          </span>
        </p>
      </div>

      {/* Actions Section Inside Card */}
      <div
        className="card-actions"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
          paddingTop: "10px",
          borderTop: `1px solid ${colors[index % 5].primaryColor}`,
        }}
      >
        {/* Edit and Delete Icons */}
        <div>
          <i
            className="far fa-edit"
            style={{
              color: colors[index % 5].primaryColor,
              fontSize: "18px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onClick={() => setModal(true)}
          ></i>
          <i
            className="fas fa-trash-alt"
            style={{
              color: "#dc3545",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={handleDelete}
          ></i>
        </div>

        {/* Mark as Button */}
        <button
          className="btn btn-sm"
          style={{
            backgroundColor: colors[index % 5].primaryColor,
            color: "white",
            fontSize: "12px",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={() => toggleStatus(index)}
        >
          Mark as {taskObj.Status === "Pending" ? "Completed" : "Pending"}
        </button>
      </div>

      {/* Modal */}
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateListArray}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
