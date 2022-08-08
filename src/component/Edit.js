import { React, useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../Firebase";
import "../asset/Edit.scss";
import { CardAction, EditAction } from "../module/reducer";
import useInput from "../hook/UseInput";
const searchDB = db.collection("section");

function Edit({ ID }) {
  const dispatch = useDispatch();
  const [text, setText] = useInput("");

  function CloseAction(e) {
    const target = e.currentTarget;
    if (target.id === "creator") {
      dispatch(EditAction());
    } else {
      dispatch(CardAction());
    }
  }

  const onchangeText = useCallback(
    (e) => {
      setText(e);
    },
    [text]
  );

  async function createCard(e) {
    e.preventDefault();
    await searchDB
      .doc(text)
      .set({
        header: text,
      })
      .then(() => {
        searchDB.doc(text).collection("article").add({ content: "" });
      });
  }
  return (
    <form className="edit_area" onSubmit={createCard}>
      <ReactTextareaAutosize
        className="board-edit"
        placeholder="Enter a title for this card..."
        minRows={3}
        cacheMeasurements
        onHeightChange={(height) => {}}
        onChange={(e) => onchangeText(e)}
      />
      <div className="edit_btn_wrap">
        <button type="submit" className="add_btn">
          POST
        </button>
        <button
          type="button"
          className="close_btn"
          id={ID}
          onClick={(e) => CloseAction(e)}
        >
          <FontAwesomeIcon icon={faXmark} size="1x" />
        </button>
      </div>
    </form>
  );
}

export default Edit;
