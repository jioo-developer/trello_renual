import React from "react";
import { useSelector } from "react-redux";
import { CardAction } from "../module/reducer";
import Edit from "./Edit";

function Add({ dispatch, FontAwesomeIcon, iconObject }) {
  const AddCard = useSelector((state) => state.CardToggle);
  return (
    <>
      {AddCard ? (
        <Edit ID={"add"} />
      ) : (
        <div
          className="board-add"
          onClick={() => {
            dispatch(CardAction());
          }}
        >
          <FontAwesomeIcon icon={iconObject.faPlus} size="1x" />
          Add a card
        </div>
      )}
    </>
  );
}

export default Add;
