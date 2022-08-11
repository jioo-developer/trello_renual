import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "./Firebase";
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
  const [init, setInit] = useState(false);
  const [DBNAME, setDBNAME] = useState("");
  const iconObject = {
    faCheck,
    faEllipsis,
    faList,
    faPencil,
    faPlus,
    faXmark,
    faTrashRestore,
  };

  async function LoginDB(e) {
    e.preventDefault();
    const dbValue = await db.collection(DBNAME);

    dbValue.get().then((data) => {
      if (data.docs.length === 0) {
        window.confirm("검색되는 DB가 없습니다. 새로 만드시겠습니까?");
        dbValue.doc("todo").set({
          header: "todo",
        });
      } else {
        setInit(true);
      }
    });
  }

  return (
    <div className="App">
      <header>Trello Clone Coding</header>
      <Routes>
        <Route
          path="/"
          element={
            init === false ? (
              <form onSubmit={LoginDB}>
                <input
                  type="text"
                  className="login"
                  placeholder="사용중인 DB명을 입력해주세요."
                  onChange={(e) => setDBNAME(e.target.value)}
                />
              </form>
            ) : (
              <Home
                FontAwesomeIcon={FontAwesomeIcon}
                iconObject={iconObject}
                db={db}
                DBNAME={DBNAME}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
