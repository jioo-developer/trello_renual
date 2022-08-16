import React, { useCallback, useState } from "react";
import TextArea from "react-textarea-autosize";
import UseInput from "../hook/UseInput";
import Edit from "./Edit";
import { useSelector } from "react-redux";
import { IndexAction, RemoveAction } from "../module/reducer";
function Card({ FontAwesomeIcon, iconObject, value, dispatch, searchDB,index }) {
  const LoadToggle = useSelector((state) => state);
  const [header, setHeader] = UseInput("");
  const [content, setContent] = UseInput("");
  const [conHeight, setHeight] = useState(1);
  const typeIndex = {
    deleteIndex: LoadToggle.deleteIndex.includes(value.id),
    conIndex: LoadToggle.conIndex.includes(value.id),
    addIndex: LoadToggle.addIndex.includes(value.id),
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
    setHeight(5);
  }

  function titleChange(e) {
    e.preventDefault();
    const target = e.target.querySelector("input").getAttribute("data-id");
    searchDB
      .doc(target)
      .update({
        header: header,
      })
      .then(() => {
        e.target.querySelector("input").blur();
      });
  }

  return (
    <article className="list" style={{ order: `${value.order}` }}>
      <form className="list-header" onSubmit={titleChange}>
        <input
          type="text"
          className="title-area"
          data-id={value.id}
          defaultValue={value.header}
          onChange={(e) => {
            onchangeHeader(e);
          }}
        />
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
            {
              value.contents.filter((value,idx,arr)=>{
              return (
                arr.findIndex((item)=>{
                  return (
                    item.content === value.content
                  )
                }) === idx
              )
            }).map((value2)=>{
                return <>
                 <article className="card">
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
                defaultValue={value2.content}
                data-id={value.id}
                name="conIndex"
                onChange={(e) => {
                  if (typeIndex.conIndex) {
                    onchangeContent(e);
                  }
                }}
                minRows={conHeight}
                onBlur={(e) => {
                  setHeight(1);
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
              })
            }
             <>
          {typeIndex.conIndex ? (
            <button type="submit" className="saveBtn">
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
