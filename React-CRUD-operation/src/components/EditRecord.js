import React, { useState } from "react";

const EditRecord = ({
  user,
  setUser,
  setOpen,
  setEdit,
  data,
  id,
  formAfterSubmit,
}) => {
  const [uniqueError, setuniqueError] = useState("");
  const [locationError, setlocationError] = useState("");
  const [descriptionError, setdescError] = useState("");
  function formHandler(e) {
    e.preventDefault();
    if (!user.unique || !user.location || !user.description) {
      if (!user.unique) {
        setuniqueError("User ID cannot be blank");
      }
      if (!user.location) {
        setlocationError("Location city cannot be blank");
      }
      if (!user.description) {
        setdescError("Location description cannot be blank");
      }
    } else {
      setOpen(false);
      setEdit(false);
      setUser("");
      data.splice(id, 1, user);
    }
  }
  return (
    <>
      <div className="main">
        <form onSubmit={formHandler}>
          <div id="heading">
            <h2 id="headText"> Edit Data </h2>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setOpen(false);
                setEdit(false);
                setUser("");
              }}
            ></button>
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
            <p className="errorMessage">{uniqueError}</p>
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
              value={user.location}
              onChange={formAfterSubmit}
              autoFocus
            ></input>
            <p className="errorMessage">{locationError}</p>
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
            <p className="errorMessage">{descriptionError}</p>
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
                defaultChecked={user.status === "Active"}
              />
              <label htmlFor="Active">Active</label>
              <input
                type="radio"
                id="Inactive"
                name="status"
                value="Inactive"
                defaultChecked={user.status === "Inactive"}
              />
              <label htmlFor="Inactive">Inactive</label>
            </div>
          </div>
          <button type="submit" name="Add" id="addBtn">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditRecord;
