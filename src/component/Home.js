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
            id: data.id
          };
        });
        conneting(header);
    });
  }, []);

  const conneting = (arr) => {
    let arr2 = [];
    arr.map((value,index) => {
      value.contents = []
      value.pages = []
      return searchDB
        .doc(value.id)
        .collection("article")
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((data) => {
            value.contents.push(data.data())
            value.pages.push(data.id)
          });
            arr2.push(value);
          const result = arr2.filter((value, idx, arr) => {
            return (
              arr.findIndex(
                (item) => {
                return (
                item.order === value.order && item.id === value.id && item.contents === value.contents && item.pages === value.pages 
                 )
               }) === idx
          );
          });
          if (list.length < arr2.length) {
            setList(result)
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
                key={`key-${index}`}
                index={index}
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
