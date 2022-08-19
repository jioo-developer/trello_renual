import React from "react";
import { useSelector } from "react-redux";
import { addIndexAction, RemoveAction } from "../module/reducer";
import CardTitleArea from "./CardTitleArea";
import CardBody from "./CardBody";
function Card({ FontAwesomeIcon, iconObject, value, dispatch, searchDB }) {
  const LoadToggle = useSelector((state) => state);
  const typeIndex = {
    deleteIndex: LoadToggle.deleteIndex.includes(value.id),
    addIndex: LoadToggle.addIndex.includes(value.id),
  };

  function totalToggle(e) {
    let target = value.id;
    const current = e.currentTarget;
    const typeName = current.getAttribute("name");
    let examination = LoadToggle[typeName].indexOf(target);

    if (typeName === "deleteIndex") {
      dispatcher(examination, typeName, target);
      //
    } else if (typeName === "cardNum") {
      let num = current.closest(".card").getAttribute("data-index");
      target = value.pages[num];
      examination = LoadToggle[typeName].indexOf(target);
      dispatcher(examination, typeName, target);
      //
    } else if (typeName === "addIndex") {
      dispatcher(examination, typeName, target);
    }
  }

  function dispatcher(examination, typeName, target) {
    if (examination === -1) {
      dispatch(addIndexAction({ target, typeName }));
    } else {
      dispatch(RemoveAction({ target, typeName }));
    }
  }

  return (
    <article className="list">
      <CardTitleArea
        value={value}
        searchDB={searchDB}
        typeIndex={typeIndex}
        totalToggle={totalToggle}
        FontAwesomeIcon={FontAwesomeIcon}
        iconObject={iconObject}
      />
      <CardBody
        value={value}
        typeIndex={typeIndex}
        totalToggle={totalToggle}
        searchDB={searchDB}
        FontAwesomeIcon={FontAwesomeIcon}
        iconObject={iconObject}
        dispatch={dispatch}
      />
    </article>
  );
}

export default Card;
