import React, { useState, useCallback, useRef, useEffect } from "react";
import TextArea from "react-textarea-autosize";
import UseInput from "../hook/UseInput";
import Edit from "./Edit";
import { useSelector } from "react-redux";
import { CardAction } from "../module/reducer";
function Card({ FontAwesomeIcon, iconObject, value, index, dispatch }) {
  const AddCard = useSelector((state) => state.CardToggle);
  const [header, setHeader] = UseInput("");
  const [content, setContent] = UseInput("");
  const [toggle, setToggle] = useState({
    toggleArray: [],
    conToggle: [],
    addCard: [],
  });
  const [conHeight, setConHeight] = useState(1);
  const inputFocus = useRef();
  const conFocus = useRef();

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

  function TotalToggle(e, typeState) {
    const target = parseInt(e.currentTarget.getAttribute("data-index"));
    const typeName = e.currentTarget.name;

    return new Promise(function (resolve) {
      if (!typeState.includes(target)) {
        resolve({ target, typeName });
      }
    }).then(({ target, typeName }) => {
      setToggle((prev) => {
        return {
          ...prev,
          addCard: prev.addCard.push(target),
        };
      });
      // setToggle((prev) => {
      //   if (typeName === "toggleArray") {
      //     return {
      //       toggleArray: prev.toggleArray.push(CopyArray),
      //       conToggle: prev.conToggle,
      //       conFocus: prev.addCard,
      //     };
      //   } else if (typeName === "conToggle") {
      //     return {
      //       toggleArray: prev.toggleArray,
      //       conToggle: prev.conToggle.push(CopyArray),
      //       conFocus: prev.addCard,
      //     };
      //   } else {
      //     return {
      //       toggleArray: prev.toggleArray,
      //       conToggle: prev.conToggle,
      //       conFocus: prev.addCard.push(CopyArray),
      //     };
      //   }
      // });
    });
  }

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  return (
    <article className="list">
      <div className="list-header">
        {/* {toggle.toggleArray.includes(index) ? (
          <>
            <TextArea
              className="title-area"
              defaultValue={value.header}
              ref={inputFocus}
              onChange={(e) => {
                onchangeHeader(e);
              }}
            />
            <button
              type="button"
              className="submit"
              data-index={index}
              name="toggleArray"
              onClick={(e) => TotalToggle(e, toggle.toggleArray)}
            >
              <FontAwesomeIcon icon={iconObject.faCheck} size="1x" />
            </button>
          </>
        ) : (
          <>
            <TextArea
              className="title-area"
              defaultValue={value.header}
              readOnly={true}
              style={{
                outline: "none",
                background: "transparent",
                cursor: "default",
              }}
            />
            <button
              type="button"
              data-index={index}
              className="changer"
              name="toggleArray"
              onClick={(e) => TotalToggle(e, toggle.toggleArray)}
            >
              <FontAwesomeIcon icon={iconObject.faEllipsis} size="1x" />
            </button>
          </>
        )} */}
      </div>
      <div className="list-body">
        <article className="card">
          <ul className="label-wrap">
            <li className="show-label"></li>
          </ul>
          {/* {toggle.conToggle.includes(index) ? (
            <div
              className="text_wrap"
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <TextArea
                className={`card-text`}
                defaultValue={value.content}
                ref={conFocus}
                name="conToggle"
                onChange={(e) => onchangeContent(e)}
                minRows={conHeight}
                style={{
                  outline: "none",
                  width: "99%",
                }}
              />
            </div>
          ) : (
            <div className="text_wrap">
              <TextArea
                className={`card-text`}
                defaultValue={value.content}
                readOnly={true}
                minRows={conHeight}
                style={{
                  outline: "none",
                  background: "transparent",
                  cursor: "default",
                }}
              />
              <button
                type="button"
                data-index={index}
                name="conToggle"
                onClick={(e) => TotalToggle(e, toggle.conToggle)}
              >
                <FontAwesomeIcon icon={iconObject.faPencil} size="1x" />
              </button>
            </div>
          )} */}

          <div className="icon_wrap">
            <FontAwesomeIcon icon={iconObject.faList} size="1x" />
          </div>
        </article>

        <button
          type="button"
          className="board-add"
          name="addCard"
          data-index={index}
          onClick={(e) => {
            dispatch(CardAction());
            TotalToggle(e, toggle.addCard);
          }}
        >
          <FontAwesomeIcon icon={iconObject.faPlus} size="1x" />
          Add a card
        </button>
      </div>
    </article>
  );
}

export default Card;
