import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Creator from "./Creator";
import Card from "./Card";
import Page from "./Detail";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
function Home({ FontAwesomeIcon, iconObject, db, DBNAME }) {
  const dispatch = useDispatch();
  const [connectArray, setConnet] = useState([]);
  const [list, setList] = useState([]);
  const pageState = useSelector((state) => state.DetailToggle);
  const searchDB = db.collection(DBNAME);
  const timeDB = collection(db, DBNAME);

  useEffect(() => {
    const dataQuery = query(timeDB, orderBy("timeStamp", "asc"));

    const data = onSnapshot(dataQuery, (snapshot) => {
      const header = snapshot.docs.map((data) => {
        return {
          ...data.data(),
          id: data.id,
          contents: [],
          pages: [],
        };
      });
      setConnet(header);
    });

    return data;
  }, []);

  useEffect(() => {
    if (connectArray !== 0) {
      request();
    }
  }, [connectArray]);

  async function request() {
    await Promise.all(connectArray.map((item) => connecting(item))).then(
      (result) => {
        setList(result);
      }
    );
  }

  function connecting(item) {
    const collectionRef = searchDB.doc(item.id).collection(db, "article");
    const dataQuery = query(collectionRef, orderBy("timeStamp", "asc"));

    return new Promise(function (resolve) {
      let result = onSnapshot(dataQuery, (snapshot) => {
        console.log(snapshot);
        item.contents = [];
        snapshot.docs.forEach((value) => {
          item.contents.push(value.data());
          item.pages.push(value.id);
        });
        resolve(item);
      });
      return result;
    });
  }

  return (
    <section className="board_wrap">
      {list.length !== 0
        ? list.map(function (value, index) {
            return (
              <Card
                value={value}
                FontAwesomeIcon={FontAwesomeIcon}
                iconObject={iconObject}
                dispatch={dispatch}
                searchDB={searchDB}
                key={`key-${index}`}
              />
            );
          })
        : null}
      <Creator
        FontAwesomeIcon={FontAwesomeIcon}
        iconObject={iconObject}
        dispatch={dispatch}
        searchDB={searchDB}
      />
      <button
        type="button"
        className="logout"
        onClick={() => {
          localStorage.removeItem("dbName");
          window.location.reload();
        }}
      >
        로그아웃
      </button>
      {pageState ? (
        <Page
          FontAwesomeIcon={FontAwesomeIcon}
          iconObject={iconObject}
          dispatch={dispatch}
          searchDB={searchDB}
        />
      ) : null}
    </section>
  );
}

export default Home;
