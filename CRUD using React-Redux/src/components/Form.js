import React, { useState } from "react";
import "../style/Formstyle.css";
import { addUser } from "../reducers/FormData";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    unique: "",
    location: "",
    description: "",
    status: "",
  });
  const formAfterSubmit = (e) => {
    setUser((props) => ({
      ...props,
      [e.target.name]: e.target.value,
    }));
  };
  const [isError, setIsError] = useState(false);
  const error = {
    unique: "User ID cannot be blank",
    location: "Location city cannot be blank",
    description: "Location description cannot be blank",
    status: "Form status is required",
  };

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!user.unique || !user.location || !user.description || !user.status) {
      setIsError(true);
      navigate("/form");
    } else {
      dispatch(addUser(user));
      navigate("/");
    }
  };

  return (
    <>
      <div className="main">
        <form>
          <div id="heading">
            <h2 id="headText"> Add Record </h2>
            <Link
              to="/"
              type="button"
              className="btn-close"
              aria-label="Close"
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
              value={user.unique}
              onChange={formAfterSubmit}
              autoFocus
            ></input>
            {isError && !user.unique && (
              <p className="errorMessage">{error.unique}</p>
            )}
          </div>
          <div className="locationSection">
            <label htmlFor="location" id="locText">
              <strong>Location Name</strong>
              <b>&nbsp; &#42;</b>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder=" Enter your city name"
              value={user.location}
              onChange={formAfterSubmit}
            ></input>
            {isError && !user.location && (
              <p className="errorMessage">{error.location}</p>
            )}
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
              value={user.description}
              onChange={formAfterSubmit}
            ></textarea>
            {isError && !user.description && (
              <p className="errorMessage">{error.description}</p>
            )}
          </div>
          <div className="formStatus" onChange={formAfterSubmit}>
            <label htmlFor="status" id="statusText">
              <strong>Status:</strong>
            </label>
            <div id="statusBtn">
              <input type="radio" id="Active" name="status" value="Active" />
              <label htmlFor="Active">Active</label>
              <input
                type="radio"
                id="Inactive"
                name="status"
                value="Inactive"
              />
              <label htmlFor="Inactive">Inactive</label>
            </div>
            {isError && !user.status && (
              <p className="errorMessage">{error.status}</p>
            )}
          </div>
          <button type="submit" name="Add" id="addBtn" onClick={onFormSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
