import React, { useState, useCallback, useEffect } from "react";
import TextArea from "react-textarea-autosize";
import UseInput from "../hook/UseInput";
import Edit from "./Edit";
import { useSelector } from "react-redux";
import { IndexAction, RemoveAction } from "../module/reducer";
function Card({
  FontAwesomeIcon,
  iconObject,
  value,
  index,
  dispatch,
  searchDB,
}) {
  const LoadToggle = useSelector((state) => state);
  const [header, setHeader] = UseInput("");
  const [content, setContent] = UseInput("");

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

  function totalToggle(e) {
    const target = parseInt(e.currentTarget.getAttribute("data-index"));
    const typeName = e.currentTarget.name;
    const examination = LoadToggle[typeName].indexOf(target);
    if (examination === -1) {
      dispatch(IndexAction({ target, typeName }));
    } else {
      dispatch(RemoveAction({ target, typeName }));
    }
  }

  return (
    <article className="list" style={{ order: `${value.order}` }}>
      <div className="list-header">
        <TextArea
          className="title-area"
          defaultValue={value.header}
          onChange={(e) => {
            onchangeHeader(e);
          }}
        />
        {LoadToggle.deleteIndex.includes(index) ? (
          <button
            type="button"
            className="submit"
            data-index={index}
            name="deleteIndex"
            onClick={(e) => totalToggle(e)}
          >
            <FontAwesomeIcon icon={iconObject.faTrashRestore} size="1x" />
          </button>
        ) : (
          <button
            type="button"
            data-index={index}
            className="changer"
            name="deleteIndex"
            onClick={(e) => totalToggle(e)}
          >
            <FontAwesomeIcon icon={iconObject.faEllipsis} size="1x" />
          </button>
        )}
      </div>
      <div className="list-body">
        {value.content !== "" ? (
          <article className="card">
            <ul className="label-wrap">
              <li className="show-label"></li>
            </ul>
            {LoadToggle.conIndex.includes(index) ? (
              <div
                className="text_wrap"
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <TextArea
                  className={`card-text`}
                  defaultValue={value.content}
                  name="conIndex"
                  onChange={(e) => onchangeContent(e)}
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
                  style={{
                    outline: "none",
                    background: "transparent",
                    cursor: "default",
                  }}
                />
                <button
                  type="button"
                  data-index={index}
                  name="conIndex"
                  onClick={(e) => totalToggle(e)}
                >
                  <FontAwesomeIcon icon={iconObject.faPencil} size="1x" />
                </button>
              </div>
            )}

            <div className="icon_wrap">
              <FontAwesomeIcon icon={iconObject.faList} size="1x" />
            </div>
          </article>
        ) : null}
        {LoadToggle.addIndex.includes(index) ? (
          <Edit opener={"card"} index={index} searchDB={searchDB} />
        ) : (
          <button
            className="board-add"
            name="addIndex"
            data-index={index}
            onClick={(e) => {
              totalToggle(e);
            }}
          >
            <FontAwesomeIcon icon={iconObject.faPlus} size="1x" />
            Add a card
          </button>
        )}
      </div>
    </article>
  );
}

export default Card;