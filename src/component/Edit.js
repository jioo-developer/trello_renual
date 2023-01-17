import { React, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TextArea from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import { EditAction, RemoveAction } from "../module/reducer";
import useInput from "../hook/UseInput";
import { serverTimestamp } from "firebase/firestore";
import "../asset/Edit.scss";
function Edit({ opener, searchDB, value }) {
  const dispatch = useDispatch();
  const [text, setText] = useInput("");

  const onchangeText = useCallback(
    (e) => {
      setText(e);
    },
    [text]
  );

  // 새로운 카드 영역을 만드는 함수

  async function createCard(e) {
    e.preventDefault();
    await searchDB
      .add({
        header: text,
        timeStamp: serverTimestamp(),
      })
      .then(() => {
        dispatch(EditAction());
      });
  }

  // 새로운 카드 영역을 만드는 함수

  // 일정 만드는 폼의 close 함수

  function closeAction(e) {
    const current = e.currentTarget.id;
    if (current === "creator") {
      dispatch(EditAction());
    } else {
      const target = value.id;
      const typeName = e.currentTarget.name;
      dispatch(RemoveAction({ target, typeName }));
    }
  }

  // 일정 만드는 폼의 close 함수

  // 선택된 카드영역 안에 새로운 일정을 만드는 함수
  async function newCard(e) {
    e.preventDefault();
    const target = value.id;
    const typeName = e.target.name;
    const targetDB = searchDB.doc(target).collection("article");
    targetDB
      .add({
        conHeader: text,
        timeStamp: serverTimestamp(),
      })
      .then(() => {
        dispatch(RemoveAction({ target, typeName }));
      });
  }
  // 카드영역안에 새로운 일정을 만드는 함수
  return (
    <form
      name="addIndex"
      className="edit_area"
      onSubmit={opener === "card" ? newCard : createCard}
      style={
        opener === "card" && value.content === ""
          ? { paddingTop: 0 }
          : { paddingTop: 15 }
      }
    >
      <TextArea
        className="board-edit"
        placeholder="Enter a title for this card..."
        minRows={3}
        onHeightChange={(height) => {}}
        name={opener === "card" ? value.pageId : ""}
        onChange={(e) => onchangeText(e)}
      />
      <div className="edit_btn_wrap">
        <button type="submit" className="add_btn" id={opener}>
          POST
        </button>
        <button
          type="button"
          id={opener}
          name="addIndex"
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
