import React, { useState } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Tablelist from "./components/Tablelist";
import Form from "./components/Form";

function App() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [userStatus, setUserStatus] = useState([]);
  const [id, setId] = useState(0);
  const [user, setUser] = useState({
    unique: "",
    location: "",
    description: "",
    status: "",
  });

  return (
    <div className="App">
      {open ? (
        <Form
          data={data}
          setData={setData}
          user={user}
          setUser={setUser}
          view={view}
          setView={setView}
          edit={edit}
          setEdit={setEdit}
          setOpen={setOpen}
          id={id}
        />
      ) : (
        <Tablelist
          data={data}
          setData={setData}
          setUser={setUser}
          setOpen={setOpen}
          setView={setView}
          setEdit={setEdit}
          show={show}
          setShow={setShow}
          setId={setId}
          search={search}
          setSearch={setSearch}
          searchData={searchData}
          setSearchData={setSearchData}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          userStatus={userStatus}
          setUserStatus={setUserStatus}
        />
      )}
    </div>
  );
}

export default App;
