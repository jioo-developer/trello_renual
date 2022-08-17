import React, { useCallback, useEffect, useRef, useState } from "react";
import TextArea from "react-textarea-autosize";
import UseInput from "../hook/UseInput";
import Edit from "./Edit";
import { useSelector } from "react-redux";
import { IndexAction, RemoveAction } from "../module/reducer";
function Card({ FontAwesomeIcon, iconObject, value, dispatch, searchDB }) {
  console.log(value);
  const LoadToggle = useSelector((state) => state);
  const [header, setHeader] = useState("");
  const [content, setContent] = UseInput("");

  useEffect(() => {
    setHeader(value.header);
  }, []);

  const typeIndex = {
    deleteIndex: LoadToggle.deleteIndex.includes(value.id),
    conIndex: LoadToggle.conIndex.includes(value.id),
    addIndex: LoadToggle.addIndex.includes(value.id),
  };
  const onchangeHeader = useCallback(
    (e) => {
      setHeader(e.target.value);
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
    const target = e.currentTarget.getAttribute("data-id");
    const typeName = e.currentTarget.name;
    const examination = LoadToggle[typeName].indexOf(target);
    if (examination === -1) {
      dispatch(IndexAction({ target, typeName }));
    } else {
      dispatch(RemoveAction({ target, typeName }));
    }
  }

  function deleteHandler(e) {
    const deleteTarget = e.currentTarget.getAttribute("data-id");
    const delCheck = window.confirm("정말 삭제하시겠습니까?");
    if (delCheck) {
      totalToggle(e);
      searchDB.doc(deleteTarget).delete();
    }
  }

  function focusHandler(e) {
    const target = e.currentTarget;
    target.previousElementSibling.focus();
    target.previousElementSibling.select();
  }

  async function titleChange(e) {
    e.preventDefault();
    const target = e.target.getAttribute("data-id");
    await searchDB
      .doc(target)
      .update({
        header: header,
      })
      .then(() => {
        e.target.blur();
      });
  }

  function titleEnter(e) {
    if (e.keyCode === 13) {
      titleChange(e);
    }
  }

  return (
    <article className="list" style={{ order: `${value.order}` }}>
      <form className="list-header">
        <input
          type="text"
          className="title-area"
          data-id={value.id}
          value={header}
          onKeyDown={(e) => titleEnter(e)}
          onChange={(e) => {
            onchangeHeader(e);
          }}
        />
        <input type="text" style={{ display: "none" }} />
        <button
          type="button"
          className={typeIndex.deleteIndex ? "submit" : "changer"}
          name="deleteIndex"
          data-id={value.id}
          onClick={(e) => {
            if (typeIndex.deleteIndex) {
              deleteHandler(e);
            } else {
              totalToggle(e);
            }
          }}
        >
          {typeIndex.deleteIndex ? (
            <FontAwesomeIcon icon={iconObject.faTrashRestore} size="1x" />
          ) : (
            <FontAwesomeIcon icon={iconObject.faEllipsis} size="1x" />
          )}
        </button>
      </form>
      <div className="list-body">
        {value.contents.map((item) => {
          return (
            <>
              <article className="card" style={{ order: item.order }}>
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
            </>
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
