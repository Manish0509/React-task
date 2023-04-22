import React from "react";

const ViewRecord = ({ user, setUser, setOpen, setView }) => {
  return (
    <>
      <div className="main">
        <form>
          <div id="heading">
            <h2 id="headText"> Added Data </h2>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setOpen(false);
                setView(false);
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
              value={user.unique}
              readOnly
            ></input>
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
              readOnly
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
              value={user.description}
              readOnly
            ></textarea>
          </div>
          <div className="formStatus">
            <label htmlFor="status" id="statusText">
              <strong>Status:</strong>
            </label>
            <div id="statusBtn">
              <input
                type="radio"
                id="Active"
                name="status"
                value="Active"
                defaultChecked={user.status === "Active"}
                disabled
              />
              <label htmlFor="Active">Active</label>
              <input
                type="radio"
                id="Inactive"
                name="status"
                value="Inactive"
                defaultChecked={user.status === "Inactive"}
                disabled
              />
              <label htmlFor="Inactive">Inactive</label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ViewRecord;
