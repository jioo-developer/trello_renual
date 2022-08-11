import { React, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useSelector, useDispatch } from "react-redux";
import "../asset/Edit.scss";
import { EditAction, RemoveAction } from "../module/reducer";
import useInput from "../hook/UseInput";

function Edit({ id, index, searchDB }) {
  const dispatch = useDispatch();
  const [text, setText] = useInput("");

  const onchangeText = useCallback(
    (e) => {
      setText(e);
    },
    [text]
  );

  async function createCard(e) {
    e.preventDefault();
    const length = await searchDB.get().then((data) => {
      return data.docs.length + 1;
    });
    await searchDB
      .doc(text)
      .set({
        header: text,
        order: length,
      })
      .then(() => {
        searchDB.doc(text).collection("article").add({ content: "" });
      });
  }

  function closeAction(e) {
    const current = e.currentTarget.id;
    if (current === "creator") {
      dispatch(EditAction());
    } else {
      const target = parseInt(e.currentTarget.getAttribute("data-index"));
      const typeName = e.currentTarget.name;
      dispatch(RemoveAction({ target, typeName }));
    }
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
          id={id}
          name="addIndex"
          data-index={index}
          className="close_btn"
          onClick={(e) => {
            closeAction(e);
          }}
        >
          <FontAwesomeIcon icon={faXmark} size="1x" />
        </button>
      </div>
    </form>
  );
}

export default Edit;
