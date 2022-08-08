import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { db } from "../Firebase";
import Add from "./Add";
import Creator from "./Creator";
import TextArea from "react-textarea-autosize";
import UseInput from "../hook/UseInput";
function Home({ FontAwesomeIcon, iconObject }) {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [header, setHeader] = UseInput("");
  const [content, setContent] = UseInput("");
  const searchDB = db.collection("section");
  const [changeTitle, setChange] = useState(false);

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

  const onchangeHeader = useCallback(
    (e) => {
      setHeader(e);
    },
    [header]
  );

  const onchangeContent = useCallback(
    (e) => {
      setContent(e);
    },
    [content]
  );

  return (
    <section className="board_wrap">
      {list.map(function (value, index) {
        return (
          <article className="list">
            <div className="list-header">
              <TextArea
                className="title-area"
                defaultValue={value.header}
                onChange={(e) => {
                  onchangeHeader(e);
                }}
              />
              <button type="button">
                <FontAwesomeIcon icon={iconObject.faEllipsis} size="1x" />
              </button>
              <button type="button" className="submit">
                <FontAwesomeIcon icon={iconObject.faCheck} size="1x" />
              </button>
            </div>
            <div className="list-body">
              <article className="card">
                <ul className="label-wrap">
                  <li className="show-label"></li>
                </ul>
                <div className="text_wrap">
                  <TextArea
                    className={`card-text`}
                    defaultValue={value.content}
                    onChange={(e) => {
                      onchangeContent(e);
                    }}
                  />
                  <FontAwesomeIcon icon={iconObject.faPencil} size="1x" />
                </div>

                <div className="icon_wrap">
                  <FontAwesomeIcon icon={iconObject.faList} size="1x" />
                </div>
              </article>
              <Add
                FontAwesomeIcon={FontAwesomeIcon}
                iconObject={iconObject}
                dispatch={dispatch}
              />
            </div>
          </article>
        );
      })}
      <Creator
        FontAwesomeIcon={FontAwesomeIcon}
        iconObject={iconObject}
        dispatch={dispatch}
      />
    </section>
  );
}

export default Home;
