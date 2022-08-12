import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Creator from "./Creator";
import Card from "./Card";
function Home({ FontAwesomeIcon, iconObject, db, DBNAME }) {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const searchDB = db.collection(DBNAME);

  useEffect(() => {
    searchDB.onSnapshot((snapshot) => {
      const header = snapshot.docs.map((data, index) => {
        return {
          ...data.data(),
          id: data.id,
        };
      });
      conneting(header);
    });
  }, []);

  const conneting = (arr) => {
    let arr2 = [];
    arr.map((value) => {
      return searchDB
        .doc(value.id)
        .collection("article")
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((data) => {
            let key = Object.assign(value, data.data());
            key.pageId = data.id;
            arr2.push(key);
          });
          if (list.length < arr2.length) {
            let copyArray = [...list];
            copyArray.push(...arr2);
            setList(copyArray);
          }
        });
    });
  };

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
                key={index}
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
    </section>
  );
}

export default Home;
