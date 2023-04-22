import React, { useState } from "react";
import "../style/Formstyle.css";
import EditRecord from "./EditRecord";
import ViewRecord from "./ViewRecord";

const Form = ({
  data,
  setData,
  user,
  setUser,
  setOpen,
  view,
  setView,
  edit,
  setEdit,
  id,
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
      setUser("");
      setData([...data, user]);
    }
  }
  function formAfterSubmit(e) {
    if (user.unique) {
      setuniqueError("");
    }
    if (user.location) {
      setlocationError("");
    }
    if (user.description) {
      setdescError("");
    }
    setUser((props) => ({
      ...props,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <>
      {view ? (
        <ViewRecord
          user={user}
          setUser={setUser}
          setOpen={setOpen}
          setEdit={setEdit}
          setView={setView}
        />
      ) : (
        <>
          {edit ? (
            <EditRecord
              user={user}
              setUser={setUser}
              setOpen={setOpen}
              setEdit={setEdit}
              data={data}
              setData={setData}
              id={id}
              formAfterSubmit={formAfterSubmit}
            />
          ) : (
            <div className="main">
              <form onSubmit={formHandler}>
                <div id="heading">
                  <h2 id="headText"> Add Record </h2>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setOpen(false);
                      setView(false);
                      setEdit(false);
                      setUser("");
                    }}
                    aria-label="Close"
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
                    onChange={formAfterSubmit}
                    autoFocus
                  ></input>
                  <p className="errorMessage">{uniqueError}</p>
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
                  Submit
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Form;
