import React, { useCallback } from "react";
import TextArea from "react-textarea-autosize";
import Edit from "./Edit";
import UseInput from "../hook/UseInput";
import { useSelector } from "react-redux";
import { DetailAction } from "../module/reducer";
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

  function focusHandler(e) {
    const target = e.currentTarget;
    target.previousElementSibling.focus();
    target.previousElementSibling.select();
  }

  function contentUpdate(e, idx) {
    const target = value.pages[idx];
    searchDB.doc(value.id).collection("article").doc(target).update({
      content: content,
    });
    totalToggle(e);
  }

  return (
    <div className="list-body">
      {value.contents.map((item, index2) => {
        return (
          <article className="card" data-index={index2} key={`card-${index2}`}>
            <ul className="label-wrap">
              <li className="show-label"></li>
            </ul>
            <div
              className="text_wrap"
              style={
                cardIndex.includes(value.pages[index2])
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
                name="cardNum"
                onChange={(e) => {
                  if (cardIndex.includes(value.pages[index2])) {
                    onchangeContent(e);
                  }
                }}
                readOnly={
                  cardIndex.includes(value.pages[index2]) ? false : true
                }
                style={
                  cardIndex.includes(value.pages[index2])
                    ? {
                        width: "99%",
                      }
                    : {
                        outline: "none",
                        background: "transparent",
                      }
                }
                onClick={() => {
                  dispatch(DetailAction());
                }}
              />
              {cardIndex.includes(value.pages[index2]) === false ? (
                <button
                  type="button"
                  name="cardNum"
                  onClick={(e) => {
                    totalToggle(e);
                    focusHandler(e);
                  }}
                >
                  <FontAwesomeIcon icon={iconObject.faPencil} size="1x" />
                </button>
              ) : null}
            </div>

            <div
              className="icon_wrap"
              onClick={() => {
                dispatch(DetailAction());
              }}
            >
              <FontAwesomeIcon icon={iconObject.faList} size="1x" />
            </div>
            {cardIndex.includes(value.pages[index2]) ? (
              <div className="post-wrap" style={{ margin: "15px 0 5px 0" }}>
                <button
                  type="button"
                  name="cardNum"
                  className="saveBtn"
                  style={{ order: 9999 }}
                  onClick={(e) => contentUpdate(e, index2)}
                >
                  POST
                </button>
                <button
                  type="button"
                  name="cardNum"
                  className="saveCancel"
                  onClick={(e) => totalToggle(e)}
                >
                  cencel
                </button>
              </div>
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
