import React, { useCallback, useRef, useState } from "react";
import "../reset.css";
import "../asset/Detail.scss";
import TextArea from "react-textarea-autosize";
import { DetailAction } from "../module/reducer";
import { useSelector } from "react-redux";
function Detail({ FontAwesomeIcon, iconObject, dispatch, searchDB }) {
  const data = useSelector((state) => state.DetailData);
  const [back, setBack] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [descState, setDesc] = useState(false);
  const TextRef = useRef();

  const onChangeTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [title]
  );

  const onChangeText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );

  function Save() {
    searchDB.doc(data[0].id).collection("article").doc(data[1]).update({
      conHeader: title,
      conText: text,
    });
  }

  function focusState() {
    setDesc(!descState);
    if (descState) {
      TextRef.current.focus();
      TextRef.current.select();
    }
  }

  return (
    <section className="Detail-page">
      <article className="in-page">
        <FontAwesomeIcon
          icon={iconObject.faXmark}
          size="1x"
          className="page-close"
          onClick={() => {
            dispatch(DetailAction());
          }}
        />
        <div className="page-header">
          <div className="in-wrap">
            <TextArea
              minRows={1}
              className="page-title"
              defaultValue={data[2].conHeader}
              onChange={(e) => onChangeTitle(e)}
              style={{
                paddingLeft: 10,
                boxSizing: "border-box",
                background: back === false ? "transparent" : "#fff",
              }}
              onFocus={(e) => {
                e.target.focus();
                e.target.select();
                setBack(true);
              }}
              onBlur={() => {
                setBack(false);
              }}
            ></TextArea>
          </div>
          <p className="inst">
            in list <span>{data[0].header}</span>
          </p>
        </div>
        <div className="left_con">
          <article className="des_area">
            <div className="area-header">
              <FontAwesomeIcon icon={iconObject.faList} size="1x" />
              <p>Description</p>
              <button type="button" onClick={focusState}>
                Edit
              </button>
            </div>
            <TextArea
              className="description"
              defaultValue={data[2].conText}
              readOnly={descState === false ? true : false}
              onChange={(e) => onChangeText(e)}
              ref={TextRef}
              minRows={5}
              style={{
                background: descState === false ? "transparent" : "#fff",
                outline: descState === false ? "none" : "#333",
              }}
            />
            <button type="button" className="savePost" onClick={Save}>
              저장
            </button>
          </article>
        </div>
        <article className="btn-area">
          <p>utility</p>
          <ul className="btns">
            <li>Label</li>
            <li>Delete</li>
            <li>CheckList</li>
          </ul>
        </article>
      </article>
    </section>
  );
}

export default Detail;
