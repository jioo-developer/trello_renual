import React, { useCallback, useRef } from "react";
import TextArea from "react-textarea-autosize";
import UseInput from "../hook/UseInput";
import Edit from "./Edit";
import { useSelector } from "react-redux";
import { IndexAction, RemoveAction } from "../module/reducer";
import CardTitleArea from "./CardTitleArea";
function Card({
  FontAwesomeIcon,
  iconObject,
  value,
  dispatch,
  searchDB,
  index,
}) {
  const LoadToggle = useSelector((state) => state);
  const [content, setContent] = UseInput("");
  const typeIndex = {
    deleteIndex: LoadToggle.deleteIndex.includes(value.id),
    conIndex: LoadToggle.conIndex.includes(value.id),
    addIndex: LoadToggle.addIndex.includes(value.id),
  };

  const onchangeContent = useCallback(
    (e) => {
      setContent(e);
    },
    [content]
  );

  function totalToggle(e) {
    if (!e.target.type === "textarea") {
      const target = e.currentTarget.getAttribute("data-id");
      const typeName = e.currentTarget.name;
      const examination = LoadToggle[typeName].indexOf(target);
      if (examination === -1) {
        dispatch(IndexAction({ target, typeName }));
      } else {
        dispatch(RemoveAction({ target, typeName }));
      }
    } else {
      console.log("textarae");
    }
  }

  function focusHandler(e) {
    const target = e.currentTarget;
    target.previousElementSibling.focus();
    target.previousElementSibling.select();
  }

  return (
    <article className="list" style={{ order: `${value.order}` }}>
      <CardTitleArea
        value={value}
        searchDB={searchDB}
        typeIndex={typeIndex}
        totalToggle={totalToggle}
        FontAwesomeIcon={FontAwesomeIcon}
        iconObject={iconObject}
      />
      <div className="list-body">
        {value.contents.map((item, index) => {
          return (
            <article
              className="card"
              style={{ order: item.order }}
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
                  data-id={value.id}
                  name="conIndex"
                  onChange={(e) => {
                    if (typeIndex.conIndex) {
                      onchangeContent(e);
                    }
                  }}
                  onBlur={(e) => {
                    totalToggle(e);
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
                    data-id={value.id}
                    name="conIndex"
                    onClick={(e) => {
                      totalToggle(e);
                      focusHandler(e);
                    }}
                  >
                    <FontAwesomeIcon icon={iconObject.faPencil} size="1x" />
                  </button>
                ) : null}
              </div>

              <div className="icon_wrap">
                <FontAwesomeIcon icon={iconObject.faList} size="1x" />
              </div>
            </article>
          );
        })}
        <>
          {typeIndex.conIndex ? (
            <button type="submit" className="saveBtn" style={{ order: 9999 }}>
              POST
            </button>
          ) : typeIndex.addIndex ? (
            <Edit opener="card" searchDB={searchDB} value={value} />
          ) : (
            <button
              className="board-add"
              name="addIndex"
              data-id={value.id}
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
    </article>
  );
}

export default Card;
