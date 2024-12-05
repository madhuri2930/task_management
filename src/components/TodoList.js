import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [view, setView] = useState("grid"); // Track current view: grid or list
  const [filter, setFilter] = useState("All"); // Track current filter: All, Pending, Completed

  useEffect(() => {
    let arr = localStorage.getItem("taskList");
    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = [...taskList];
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  // const updateListArray = (obj, index) => {
  //   let tempList = [...taskList];
  //   tempList[index] = obj;
  //   localStorage.setItem("taskList", JSON.stringify(tempList));
  //   setTaskList(tempList);
  // };
  const updateTask = (updatedTask, taskObj) => {
    let tempList = [...taskList];
    const index = tempList.findIndex((task) => task.Name === taskObj.Name); // Find task by unique identifier (adjust accordingly)
    if (index !== -1) {
      tempList[index] = updatedTask; // Replace task with updated task
      localStorage.setItem("taskList", JSON.stringify(tempList));
      setTaskList(tempList); // Update state
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    if (!taskObj.Name || !taskObj.Description || !taskObj.DueDate) {
      alert("All fields are required!");
      return;
    }
    let tempList = [...taskList];
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
  };

  const toggleStatus = (index) => {
    let tempList = [...taskList];
    tempList[index].Status =
      tempList[index].Status === "Pending" ? "Completed" : "Pending";
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const filteredTasks =
    filter === "All"
      ? taskList
      : taskList.filter((task) => task.Status === filter);

  return (
    <>
      <div className="header text-center ">
        <h2 className="taskText">Task Management System</h2>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
        <div className="mt-3">
          <button className=" viewBtn">View Tasks</button>
          <select
            className="ml-2"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className={`task-container ${view === "list" ? "list-view" : ""}`}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((obj, index) => (
            <Card
              key={index}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateTask}
              toggleStatus={toggleStatus}
            />
          ))
        ) : (
          <div className="noviewText">
            <h3>No tasks available.</h3>
            <p>Create tasks to manage your work!</p>
          </div>
        )}
      </div>

      <CreateTask toggle={toggleModal} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
