import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addTask } from "../redux/action";
import "../style/Formstyle.css";

export const assigneeList = [
  "Deep",
  "Manish",
  "Parth",
  "Rutvik",
  "Shiv",
  "Shivansh",
  "Viren",
  "Yash",
  "Nikhil Singh",
  "Raj Bhatt",
  "Dinesh Kachhot",
  "Jagat Vasveliya",
  "Mihir Prajapati",
  "Krupesh Joshi",
  "Kinjal Patel",
];

export const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [usertask, setUserTask] = useState({
    title: "",
    description: "",
    assignee: "",
    status: "ToDo",
  });

  const error = {
    title: "Task title cannot be blank",
    description: "Task description cannot be blank",
  };

  const inputHandler = (e) => {
    setUserTask({
      ...usertask,
      [e.target.name]: e.target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!usertask.title || !usertask.description) {
      setIsError(true);
    } else {
      dispatch(addTask(usertask));
      navigate("/");
    }
  };

  return (
    <div className="main-form">
      <form className="form" id="form">
        <div id="heading">
          <h2>Add Task</h2>
          <Link
            type="button"
            to="/"
            className="btn-close"
            aria-label="Close"
          ></Link>
        </div>
        <div className="form-title">
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title of task"
            onChange={inputHandler}
            autoFocus
          />
          {isError && !usertask.title && (
            <p className="errorMessage">{error.title}</p>
          )}
        </div>
        <div className="form-desc">
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="desc"
            name="description"
            placeholder="Description of task"
            rows="5"
            onChange={inputHandler}
          ></textarea>
          {isError && !usertask.description && (
            <p className="errorMessage">{error.description}</p>
          )}
        </div>
        <div className="task-assignee" onChange={inputHandler}>
          <label htmlFor="assignee">Assignee</label>
          <select name="assignee" className="assignee" id="assignee">
            <option value="select" disabled selected>
              Assignee
            </option>
            {assigneeList.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <button
          type="submit"
          className="submit-btn"
          id="submit"
          onClick={onFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
