import React, { useState, useEffect } from "react";
import "../style/Tablestyle.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDeleted, showViewData } from "../reducers/FormData";

const Tablelist = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pageData, setPageData] = useState(0);
  const data = useSelector((state) => state.data.user);
  const [user, setUser] = useState(data);
  const dispatch = useDispatch();
  const recordDelete = (unique) => {
    dispatch(userDeleted({ unique }));
  };

  function searchUser(e) {
    e.preventDefault();
    let searchedData = data.filter(
      (obj) =>
        obj.location.toLowerCase().includes(search.toLowerCase()) ||
        obj.description.toLowerCase().includes(search.toLowerCase())
    );
    setUser(searchedData);
    setPageData(0);
  }

  function filterUser(e) {
    const filterActiveUser = data.filter(
      (obj) => obj.status === e.target.value
    );
    setUser(filterActiveUser);
    setPageData(0);
  }

  function pagination() {
    if (user.length > 0) {
      if (pageData <= 0) {
        const dataPage = data.slice(0, 10);
        setUser(dataPage);
      } else {
        const dataPage = data.slice(pageData * 10, pageData * 10 + 10);
        setUser(dataPage);
      }
    }
  }

  const pageNext = () => {
    if (pageData * 10 > data.length - 11) {
    } else {
      setPageData(pageData + 1);
    }
  };

  const pagePrev = () => {
    pageData <= 1 ? setPageData(0) : setPageData(pageData - 1);
  };
  useEffect(() => {
    pagination();
  }, [data, pageData]);

  return (
    <>
      <div className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="add-btn mt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("form")}
                >
                  &#43;&nbsp;Add
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <div id="search-autocomplete" className="form-outline">
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
                  className="btn btn-outline-success fs-7"
                  type="submit"
                  onClick={(e) => searchUser(e)}
                >
                  Search
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
                  value="All"
                  onClick={pagination}
                  defaultChecked
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
            {user.length === 0 ? (
              <tbody>
                <tr>
                  <th scope="cols" colSpan="6">
                    No data available to show
                  </th>
                </tr>
              </tbody>
            ) : (
              <>
                <tbody>
                  {user.map(({ unique, location, description, status }, i) => (
                    <tr key={i}>
                      <td>{pageData * 10 + (i + 1)}</td>
                      <td>{unique}</td>
                      <td>{location}</td>
                      <td>{description}</td>
                      <td>{status}</td>
                      <td className="d-flex justify-content-around">
                        <Link
                          to={`./view/${unique}`}
                          className="btn btn-success"
                          onClick={() => dispatch(showViewData())}
                        >
                          <i className="fa-solid fa-eye"></i> View
                        </Link>
                        <Link
                          to={`./edit/${unique}`}
                          className="btn btn-primary"
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            if (window.confirm("Delete a record ?")) {
                              recordDelete(unique);
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
          </table>
          <>
            {user.length > 0 ? (
              <>
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li className="page-item">
                      <button className="page-link" onClick={pagePrev}>
                        Prev
                      </button>
                    </li>
                    <li
                      className="d-flex justify-content-center align-items-center"
                      id="PageData"
                    >
                      You are at Page : <div id="PageNo">{pageData + 1}</div>
                    </li>
                    <li className="page-item">
                      <button className="page-link" onClick={pageNext}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </>
            ) : null}
          </>
        </div>
      </div>
    </>
  );
};

export default Tablelist;
