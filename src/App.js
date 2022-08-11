import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faEllipsis,
  faList,
  faPencil,
  faPlus,
  faXmark,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";

import "./asset/App.scss";
import "./reset.css";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";

function App() {
  const iconObject = {
    faCheck,
    faEllipsis,
    faList,
    faPencil,
    faPlus,
    faXmark,
    faTrashRestore,
  };
  return (
    <div className="App">
      <header>Trello Clone Coding</header>
      <Routes>
        <Route
          path="/"
          element={
            <Home FontAwesomeIcon={FontAwesomeIcon} iconObject={iconObject} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
