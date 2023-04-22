import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate, closeViewData } from "../reducers/FormData";
import { useParams, useNavigate } from "react-router-dom";

const EditRecord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const user = useSelector((state) =>
    state.data.user.find((user) => user.unique === param.id)
  );
  const view = useSelector((state) => state.data.view);
  const [editUser, setEditUser] = useState({
    unique: user.unique,
    location: user.location,
    description: user.description,
    status: user.status,
  });

  const formAfterSubmit = (e) => {
    setEditUser((props) => ({
      ...props,
      [e.target.name]: e.target.value,
    }));
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(userUpdate(editUser));
    navigate("/");
  };

  return (
    <div className="main">
      <form onSubmit={onFormSubmit}>
        <div id="heading">
          {view ? (
            <h2 id="headText"> View Record </h2>
          ) : (
            <h2 id="headText"> Edit Record </h2>
          )}
          <Link
            to="/"
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => dispatch(closeViewData())}
          ></Link>
        </div>
        <div className="idSection">
          <label htmlFor="id" id="idText">
            <strong>ID </strong>
            <b> &nbsp; &#42;</b>
          </label>
          <input
            type="number"
            id="id"
            name="unique"
            placeholder=" Enter your ID number"
            onChange={formAfterSubmit}
            value={user.unique}
            readOnly
          ></input>
          {/* <p className="errorMessage">{uniqueError}</p> */}
        </div>
        <div className="locationSection">
          <label htmlFor="location" id="locText">
            <strong>Location Name</strong>
            <b>&nbsp;&#42;</b>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder=" Enter your city name"
            value={editUser.location}
            onChange={formAfterSubmit}
            required={!view}
            readOnly={view}
            autoFocus
          ></input>
        </div>
        <div className="descSection">
          <label htmlFor="description" id="descText">
            <strong>Location Description </strong>
            <b>&nbsp; &#42;</b>
          </label>
          <textarea
            id="description"
            name="description"
            rows="6"
            cols="40"
            placeholder=" Write one thing about your city "
            value={editUser.description}
            onChange={formAfterSubmit}
            required={!view}
            readOnly={view}
          ></textarea>
          {/* <p className="errorMessage">{descriptionError}</p> */}
        </div>
        <div className="formStatus">
          <label htmlFor="status" id="statusText">
            <strong>Status:</strong>
          </label>
          <div id="statusBtn" onChange={formAfterSubmit}>
            <input
              type="radio"
              id="Active"
              name="status"
              value="Active"
              defaultChecked={editUser.status === "Active"}
              disabled={view}
            />
            <label htmlFor="Active">Active</label>
            <input
              type="radio"
              id="Inactive"
              name="status"
              value="Inactive"
              defaultChecked={editUser.status === "Inactive"}
              disabled={view}
            />
            <label htmlFor="Inactive">Inactive</label>
          </div>
        </div>
        {!view && (
          <button type="submit" name="Add" id="addBtn">
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default EditRecord;
