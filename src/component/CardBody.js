import React, { useCallback } from "react";
import TextArea from "react-textarea-autosize";
import Edit from "./Edit";
import UseInput from "../hook/UseInput";
import { eachAction, RemoveEach } from "../module/reducer";
import { useSelector } from "react-redux";
function CardBody({
  value,
  typeIndex,
  totalToggle,
  searchDB,
  FontAwesomeIcon,
  iconObject,
  dispatch,
}) {
  const [content, setContent] = UseInput("");
  const cardIndex = useSelector((state) => state.cardNum);

  const onchangeContent = useCallback(
    (e) => {
      setContent(e);
    },
    [content]
  );

  function CardEach(e, type) {}

  function focusHandler(e) {
    const target = e.currentTarget;
    target.previousElementSibling.focus();
    target.previousElementSibling.select();
  }

  function contentUpdate(e) {
    const target = e.target.getAttribute("data-id");
    searchDB
      .doc(value.id)
      .collection("article")
      .doc(target)
      .update({
        content: content,
      })
      .then(() => {
        totalToggle(e);
      });
  }

  return (
    <div className="list-body">
      {value.contents.map((item, index) => {
        return (
          <article
            className="card"
            style={{ order: item.order }}
            data-index={index}
            key={`card-${index}`}
          >
            <ul className="label-wrap">
              <li className="show-label"></li>
            </ul>
            <div
              className="text_wrap"
              style={
                typeIndex.conIndex
                  ? {
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }
                  : null
              }
            >
              <TextArea
                className="card-text"
                defaultValue={item.content}
                name="conIndex"
                onChange={(e) => {
                  if (typeIndex.conIndex) {
                    onchangeContent(e);
                  }
                }}
                onBlur={(e) => {
                  totalToggle(e, "blur");
                }}
                readOnly={typeIndex.conIndex ? false : true}
                style={
                  typeIndex.conIndex
                    ? {
                        width: "99%",
                      }
                    : {
                        outline: "none",
                        background: "transparent",
                        cursor: "default",
                      }
                }
              />
              {typeIndex.conIndex === false ? (
                <button
                  type="button"
                  name="conIndex"
                  onClick={(e) => {
                    totalToggle(e);
                    focusHandler(e);
                    CardEach(e);
                  }}
                >
                  <FontAwesomeIcon icon={iconObject.faPencil} size="1x" />
                </button>
              ) : null}
            </div>

            <div className="icon_wrap">
              <FontAwesomeIcon icon={iconObject.faList} size="1x" />
            </div>
            {typeIndex.conIndex && cardIndex.includes(value.pages[index]) ? (
              <button
                type="button"
                className="saveBtn"
                style={{ order: 9999 }}
                onClick={(e) => contentUpdate(e)}
              >
                POST
              </button>
            ) : null}
          </article>
        );
      })}
      <>
        {typeIndex.addIndex ? (
          <Edit opener="card" searchDB={searchDB} value={value} />
        ) : (
          <button
            className="board-add"
            name="addIndex"
            onClick={(e) => {
              totalToggle(e);
            }}
          >
            <FontAwesomeIcon icon={iconObject.faPlus} size="1x" />
            Add a card
          </button>
        )}
      </>
    </div>
  );
}

export default CardBody;
