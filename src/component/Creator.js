import React from "react";
import { useSelector } from "react-redux";
import { EditAction } from "../module/reducer";
import Edit from "./Edit";
function Creator({ FontAwesomeIcon, iconObject, dispatch, searchDB }) {
  const create = useSelector((state) => state.EditToggle);
  return (
    <>
      {create ? (
        <Edit opener="creator" searchDB={searchDB} />
      ) : (
        <article
          className="another-list"
          onClick={() => {
            dispatch(EditAction());
          }}
        >
          <button type="button" className="another-add">
            <FontAwesomeIcon icon={iconObject.faPlus} size="1x" />
            Add Another List
          </button>
        </article>
      )}
    </>
  );
}

export default Creator;
