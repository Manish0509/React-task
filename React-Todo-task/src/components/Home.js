import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assigneeList } from "./AddTask";
import { updateTask } from "../redux/action";
import "../style/Homestyle.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusList = ["ToDo", "InProgress", "Done"];
  const state = useSelector((state) => state);

  let data = useSelector((state) => state?.task);
  const [user, setUser] = useState(data);

  const forAssigneeChange = (e, i) => {
    user[i].assignee = e.target.value;
    dispatch(updateTask(user));
  };
  const forStatusChange = (e, i) => {
    user[i].status = e.target.value;
    dispatch(updateTask(user));
  };

  const filterStatusAndAssignee = (e) => {
    const { name, value } = e.target;
    console.log(value, name);
    let tempStatus =
      value === "all"
        ? state.task
        : state.task.filter((obj) => obj[name] === value);

    setUser(tempStatus);
  };

  useEffect(() => {}, [state, user]);

  return (
    <div className="main">
      <div className="formlist" id="formlist">
        <div className="nav-btn">
          <div className="addTask-btn">
            <button
              type="button"
              name="addTask"
              id="addTask-button"
              onClick={() => navigate("newTask")}
            >
              Add task
            </button>
          </div>
          <div className="task-assignee-detail">
            <select
              name="assignee"
              id="assignee-filter"
              onChange={filterStatusAndAssignee}
            >
              <option value="assigneeDefault" disabled selected>
                Assignee
              </option>
              <option value="all">All</option>
              {assigneeList.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="task-status">
            <select
              name="status"
              id="task-status"
              onChange={filterStatusAndAssignee}
            >
              <option value="defaultStatus" disabled selected>
                Status
              </option>
              <option value="all">All</option>
              {statusList.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="assign-task-head" id="assign-task-head">
          <div className="col-md-4" id="styleTodo">
            To Do
          </div>
          <div className="col-md-4" id="styleInprogress">
            In progress
          </div>
          <div className="col-md-4" id="styleDone">
            Done
          </div>
        </div>

        <div id="sectionTask">
          <div className="sectionTask">
            <div id="todoData">
              {user?.map((obj, i) => {
                return (
                  obj.status === "ToDo" && (
                    <>
                      <div className="toDoAddData" key={i}>
                        <div>{obj.title}</div>
                        <div>{obj.description}</div>
                        <select
                          value={obj.assignee}
                          onChange={(e) => forAssigneeChange(e, i)}
                        >
                          {assigneeList.map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                        <select
                          value={obj.status}
                          onChange={(e) => forStatusChange(e, i)}
                        >
                          {statusList.map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </>
                  )
                );
              })}
            </div>
            <div id="inProgress">
              {user.map((obj, i) => {
                return (
                  obj.status === "InProgress" && (
                    <>
                      <div className="inProgressAddData" key={i}>
                        <div>{obj.title}</div>
                        <div>{obj.description}</div>
                        <select
                          value={obj.assignee}
                          onChange={(e) => forAssigneeChange(e, i)}
                        >
                          {assigneeList.map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                        <select
                          value={obj.status}
                          onChange={(e) => forStatusChange(e, i)}
                        >
                          {statusList.map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </>
                  )
                );
              })}
            </div>
            <div id="done">
              {user.map((obj, i) => {
                return (
                  obj.status === "Done" && (
                    <>
                      <div className="toDoAddData" key={i}>
                        <div>{obj.title}</div>
                        <div>{obj.description}</div>
                        <select
                          value={obj.assignee}
                          onChange={(e) => forAssigneeChange(e, i)}
                        >
                          {assigneeList.map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                        <select
                          value={obj.status}
                          onChange={(e) => forStatusChange(e, i)}
                        >
                          {statusList.map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
