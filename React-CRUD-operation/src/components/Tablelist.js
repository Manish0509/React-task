import React, { useState, useEffect } from "react";
import "../style/Tablestyle.css";

const Tablelist = ({
  data,
  setData,
  setUser,
  setOpen,
  setView,
  setEdit,
  show,
  setShow,
  setId,
  search,
  setSearch,
  searchData,
  showSearch,
  setShowSearch,
  setSearchData,
  userStatus,
  setUserStatus,
}) => {
  const [pageData, setPageData] = useState(0);
  const [page, setPage] = useState([]);
  const [statusData, setStatusData] = useState(0);
  const [statusPage, setStatusPage] = useState([]);
  const [searchUser, setSearchUser] = useState(0);
  const [searchPage, setSearchPage] = useState([]);
  // const [userId, setUserId] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      if (pageData <= 0) {
        const dataPage = data.slice(0, 10);
        setPage(dataPage);
      } else {
        const dataPage = data.slice(pageData * 10, pageData * 10 + 10);
        setPage(dataPage);
      }
    }
    if (userStatus.length > 0) {
      if (statusData <= 0) {
        const statusPage = userStatus.slice(0, 10);
        setStatusPage(statusPage);
      } else {
        const statusPage = userStatus.slice(
          statusData * 10,
          statusData * 10 + 10
        );
        setStatusPage(statusPage);
      }
    }
    if (searchData.length > 0) {
      if (searchUser <= 0) {
        const searchPage = searchData.slice(0, 10);
        setSearchPage(searchPage);
      } else {
        const searchPage = searchData.slice(
          searchUser * 10,
          searchUser * 10 + 10
        );
        setSearchPage(searchPage);
      }
    }
  }, [pageData, statusData, searchUser, data, userStatus, searchData]);

  function viewUserData(i) {
    setOpen(true);
    setView(true);
    const [viewUser] = data.filter((obj) => obj.unique === i);
    setUser({
      unique: viewUser.unique,
      location: viewUser.location,
      description: viewUser.description,
      status: viewUser.status,
    });
  }

  function editUserData(i) {
    setOpen(true);
    setEdit(true);
    const index = data.findIndex((obj) => obj.unique === i);
    setId(index);
    let [editUser] = data.filter((obj) => obj.unique === i);
    setUser({
      unique: editUser.unique,
      location: editUser.location,
      description: editUser.description,
      status: editUser.status,
    });
  }

  function deleteUserData(i) {
    let deleteUser = data.filter((obj) => obj.unique !== i);
    setData(deleteUser);
  }

  function searchUserData() {
    setShowSearch(true);
    let searchedData = data.filter(
      (obj) =>
        obj.location.toLowerCase().includes(search.toLowerCase()) ||
        obj.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchData(searchedData);
  }

  function filterUser(e) {
    setShow(true);
    setShowSearch(false);
    const filterActiveUser = data.filter(
      (obj) => obj.status === e.target.value
    );
    console.log(statusPage);
    setUserStatus(filterActiveUser);
  }

  function alluser() {
    setShowSearch(false);
    setShow(false);
  }

  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="add-btn mt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setOpen(true);
                    setShowSearch(false);
                  }}
                >
                  &#43;&nbsp;Add
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <div id="search" className="form-outline">
                  <input
                    type="search"
                    id="form1"
                    className="form-control"
                    placeholder="search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form1"></label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="searchBtn"
                  onClick={(e) => searchUserData(e)}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-4" id="dataStatus">
              <div className="recordStatus">
                <input
                  type="radio"
                  id="show-inactive"
                  name="Show Active"
                  value="Active"
                  onClick={(e) => filterUser(e)}
                />
                <label htmlFor="show-inactive">Active</label>
                <input
                  type="radio"
                  id="show-active"
                  name="Show Active"
                  value="Inactive"
                  onClick={(e) => filterUser(e)}
                />
                <label htmlFor="show-active">Inactive</label>
                <input
                  type="radio"
                  id="show-all"
                  name="Show Active"
                  onClick={() => alluser()}
                />
                <label htmlFor="show-all">All</label>
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">Sr. No.</th>
                <th scope="col">ID</th>
                <th scope="col">Location Name</th>
                <th scope="col">Location Description</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {data.length === 0 ? (
              <tbody>
                <tr>
                  <th scope="cols" colSpan="6">
                    No data available to show
                  </th>
                </tr>
              </tbody>
            ) : (
              <>
                {showSearch ? (
                  <tbody>
                    {searchPage.map((obj, i) => (
                      <tr key={i}>
                        <td>{searchUser * 10 + (i + 1)}</td>
                        {/* <td>{i + 1}</td> */}
                        <td>{obj.unique}</td>
                        <td>{obj.location}</td>
                        <td>{obj.description}</td>
                        <td>{obj.status}</td>
                        <td className="d-flex justify-content-around">
                          <button
                            className="btn btn-success"
                            onClick={() => viewUserData(obj.unique)}
                          >
                            <i className="fa-solid fa-eye"></i> View
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => editUserData(obj.unique)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i> Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              if (window.confirm("Delete a record ?")) {
                                deleteUserData(obj.unique);
                              }
                            }}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <>
                    {show ? (
                      <>
                        <tbody>
                          {statusPage.map((obj, i) => (
                            <tr key={i}>
                              <td>{statusData * 10 + (i + 1)}</td>
                              <td>{obj.unique}</td>
                              <td>{obj.location}</td>
                              <td>{obj.description}</td>
                              <td>{obj.status}</td>
                              <td className="d-flex justify-content-around">
                                <button
                                  className="btn btn-success"
                                  onClick={() => viewUserData(obj.unique)}
                                >
                                  <i className="fa-solid fa-eye"></i> View
                                </button>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => editUserData(obj.unique)}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>{" "}
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    if (window.confirm("Delete a record ?")) {
                                      deleteUserData(obj.unique);
                                    }
                                  }}
                                >
                                  <i className="fa-solid fa-trash"></i> Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    ) : (
                      <>
                        <tbody>
                          {page.map((obj, i) => (
                            <tr key={i}>
                              <td>{pageData * 10 + (i + 1)}</td>
                              <td>{obj.unique}</td>
                              <td>{obj.location}</td>
                              <td>{obj.description}</td>
                              <td>{obj.status}</td>
                              <td className="d-flex justify-content-around">
                                <button
                                  className="btn btn-success"
                                  onClick={() => viewUserData(obj.unique)}
                                >
                                  <i className="fa-solid fa-eye"></i> View
                                </button>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => editUserData(obj.unique)}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    if (window.confirm("Delete a record ?")) {
                                      deleteUserData(obj.unique);
                                    }
                                  }}
                                >
                                  <i className="fa-solid fa-trash"></i> Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </table>
          <>
            <nav aria-label="Page navigation">
              <>
                {showSearch ? (
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => {
                          if (searchUser <= 1) {
                            setSearchUser(0);
                          } else {
                            setSearchUser(searchUser - 1);
                          }
                        }}
                      >
                        Prev
                      </button>
                    </li>
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => {
                          if (searchUser * 10 > searchData.length - 11) {
                          } else {
                            setSearchUser(searchUser + 1);
                          }
                        }}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                ) : (
                  <>
                    {show ? (
                      <ul className="pagination">
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => {
                              if (statusData <= 1) {
                                setStatusData(0);
                              } else {
                                setStatusData(statusData - 1);
                              }
                            }}
                          >
                            Prev
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => {
                              if (statusData * 10 > userStatus.length - 11) {
                              } else {
                                setStatusData(statusData + 1);
                              }
                            }}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    ) : (
                      <ul className="pagination">
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => {
                              if (pageData <= 1) {
                                setPageData(0);
                              } else {
                                setPageData(pageData - 1);
                              }
                            }}
                          >
                            Prev
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => {
                              if (pageData * 10 > data.length - 11) {
                              } else {
                                setPageData(pageData + 1);
                              }
                            }}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    )}
                  </>
                )}
              </>
            </nav>
          </>
        </div>
      </div>
    </>
  );
};

export default Tablelist;
