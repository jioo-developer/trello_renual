import { React, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import "../asset/Edit.scss";
import { EditAction, RemoveAction } from "../module/reducer";
import useInput from "../hook/UseInput";

function Edit({ opener, searchDB, value }) {
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
    const current = e.target.querySelector("button").getAttribute("id");
    if (current === "creator") {
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
        })
        .then(() => {
          dispatch(EditAction());
        });
    } else {
      const target = e.target.querySelector("button").getAttribute("data-id");
      const textArea = e.target.querySelector("textarea").getAttribute("name");
      searchDB.doc(target).collection("article").doc(textArea).update({
        content: text,
      });
    }
  }
  function closeAction(e) {
    const current = e.currentTarget.id;
    if (current === "creator") {
      dispatch(EditAction());
    } else {
      const target = e.currentTarget.getAttribute("data-id");
      const typeName = e.currentTarget.name;
      dispatch(RemoveAction({ target, typeName }));
    }
  }
  return (
    <form
      className="edit_area"
      onSubmit={createCard}
      style={
        opener === "card" && value.content === ""
          ? { paddingTop: 0 }
          : { paddingTop: 15 }
      }
    >
      <ReactTextareaAutosize
        className="board-edit"
        placeholder="Enter a title for this card..."
        minRows={3}
        cacheMeasurements
        onHeightChange={(height) => {}}
        name={opener === "card" ? value.pageId : ""}
        onChange={(e) => onchangeText(e)}
      />
      <div className="edit_btn_wrap">
        <button
          type="submit"
          className="add_btn"
          id={opener}
          data-id={opener === "card" ? value.id : ""}
        >
          POST
        </button>
        <button
          type="button"
          id={opener}
          name="addIndex"
          className="close_btn"
          data-id={opener === "card" ? value.id : ""}
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
