import { React, useCallback} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TextArea from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import { EditAction, RemoveAction } from "../module/reducer";
import useInput from "../hook/UseInput";
import "../asset/Edit.scss";
function Edit({opener,searchDB,value}) {
  const dispatch = useDispatch();
  const [text,setText] = useInput("");

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
          dispatch(EditAction());
        });
    } else {
      const targetid = e.target.querySelector("button").getAttribute("data-id");
      const target =  e.target.querySelector(".close_btn").getAttribute("data-id")
      const typeName = e.target.querySelector(".close_btn").getAttribute("name")
      searchDB.doc(targetid).collection("article").add({
        content : text
      }).then((()=>{
        dispatch(RemoveAction({target,typeName}))
      }))
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
      <TextArea
        className="board-edit"
        placeholder="Enter a title for this card..."
        minRows={3}
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
  )
}

export default Edit
