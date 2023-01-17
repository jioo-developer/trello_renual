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
  faCreditCard,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import "./asset/App.scss";
import "./reset.css";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
function App() {
  const [init, setInit] = useState(false);
  // init 상태
  const [DBNAME, setDBNAME] = useState("");
  // DB저장STATE
  const iconObject = {
    faCheck,
    faEllipsis,
    faList,
    faPencil,
    faPlus,
    faXmark,
    faTrashRestore,
    faCreditCard,
    faGear,
  };

  const storageName = "dbName";

  useEffect(() => {
    loadCookie();
  }, []);

  // 이미 사용중인 DB가 있다면 localStorage에서 가져오는 함수
  function loadCookie() {
    const load = JSON.parse(localStorage.getItem(storageName));
    if (load !== null) {
      setDBNAME(load);
      setInit(true);
    }
  }
  // 이미 사용중인 DB가 있다면 localStorage에서 가져오는 함수

  // DB 접근하거나 없다면 생성하는 함수
  async function LoginDB(e) {
    e.preventDefault();
    const dbValue = await db.collection(DBNAME);
    dbValue.get().then((data) => {
      if (data.docs.length === 0) {
        window.alert("검색되는 DB가 없습니다. 새로 만드는 중입니다");
        localStorage.setItem(storageName, JSON.stringify(DBNAME));
        dbValue
          .doc("todo")
          .set({
            header: "todo",
          })
          .then(() => {
            dbValue.doc("todo").collection("article").add({ content: "" });
          })
          .then(() => {
            window.location.reload();
          });
      }
    });
  }
  // DB 접근하거나 없다면 생성하는 함수

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
