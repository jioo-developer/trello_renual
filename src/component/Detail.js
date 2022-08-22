import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [labelState, setLabelState] = useState(false);
  const [labels, setLabel] = useState([]);
  const TextRef = useRef();

  let labelColor = [
    "#618d4f",
    "#f2d600",
    "#ff9f1a",
    "#eb5a46",
    "#c377e0",
    "#0079bf",
    "#ff78cb",
    "#344563",
  ];

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

  function deleteFunc() {
    const delCheck = window.confirm("삭제하시겠습니까?");
    if (delCheck) {
      dispatch(DetailAction());
      searchDB.doc(data[0].id).collection("article").doc(data[1]).delete();
    }
  }

  function hoverEvent(e, argument) {
    e.target.style.boxShadow = `-8px 0 ${argument}`;
  }

  function removeHover(e) {
    e.target.style.boxShadow = "";
  }

  function LabelFunc(color) {
    const copyState = [...labels];
    if (copyState.includes(color)) {
    } else {
      copyState.push(color);
      setLabel(copyState);
    }
  }

  useEffect(() => {
    if (descState) {
      TextRef.current.focus();
      TextRef.current.select();
    }
  }, [descState]);

  useEffect(() => {
    if (data[2].label !== undefined) {
      setLabel(data[2].label);
    } else {
      setLabel(labels);
    }
    setTitle(data[2].header);
    setText(data[2].conText);
  }, []);

  useEffect(() => {
    if (labels !== data[2].label && labels.length !== 0) {
      searchDB.doc(data[0].id).collection("article").doc(data[1]).update({
        label: labels,
      });
    }
    console.log(labels);
  }, [labels]);

  return (
    <section className="Detail-page">
      <article className="in-page">
        <FontAwesomeIcon
          icon={iconObject.faXmark}
          size="1x"
          className="page-close"
          onClick={() => {
            dispatch(DetailAction());
            setLabelState(false);
          }}
        />
        <div className="page-header">
          <div className="in-wrap">
            <FontAwesomeIcon icon={iconObject.faCreditCard} size="1x" />
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
        <ul className="label-area">
          <div
            className="label-add"
            onClick={() => {
              setLabelState(!labelState);
            }}
          >
            +
          </div>
          {labels.length !== 0
            ? labels.map((item, indexs) => {
                return (
                  <li
                    style={{ backgroundColor: item, marginLeft: 7 }}
                    key={indexs}
                  ></li>
                );
              })
            : null}
        </ul>
        <div className="left_con">
          <article className="des_area">
            <div className="area-header">
              <FontAwesomeIcon icon={iconObject.faList} size="1x" />
              <p>Description</p>
              <button
                type="button"
                onClick={() => {
                  setDesc(!descState);
                }}
              >
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
          <FontAwesomeIcon
            icon={iconObject.faGear}
            size="1x"
            className="gears"
            style={{ marginBottom: 10 }}
          />
          <p>utility</p>
          <ul className="btns">
            <li
              onClick={() => {
                setLabelState(!labelState);
              }}
            >
              Label
            </li>
            <li onClick={deleteFunc}>Delete</li>
          </ul>
          {labelState ? (
            <div className="label-detail">
              <div className="label-header">
                <p>Labels</p>
                <FontAwesomeIcon
                  icon={iconObject.faXmark}
                  size="1x"
                  className="label-close"
                  onClick={() => {
                    setLabelState(!labelState);
                  }}
                />
              </div>
              <ul>
                {labelColor.map((color, item) => {
                  return (
                    <li
                      key={item}
                      style={{ backgroundColor: color }}
                      onMouseEnter={(e) => {
                        hoverEvent(e, color);
                      }}
                      onMouseLeave={(e) => {
                        removeHover(e);
                      }}
                      onClick={() => {
                        LabelFunc(color);
                      }}
                    ></li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </article>
      </article>
    </section>
  );
}

export default Detail;
