import React from "react";
import { useSelector } from "react-redux";
import {
  addIndexAction,
  eachAction,
  RemoveAction,
  RemoveEach,
} from "../module/reducer";
import CardTitleArea from "./CardTitleArea";
import CardBody from "./CardBody";
function Card({ FontAwesomeIcon, iconObject, value, dispatch, searchDB }) {
  const LoadToggle = useSelector((state) => state);
  const typeIndex = {
    deleteIndex: LoadToggle.deleteIndex.includes(value.id),
    conIndex: LoadToggle.conIndex.includes(value.id),
    addIndex: LoadToggle.addIndex.includes(value.id),
  };
  function totalToggle(e, type) {
    let target = value.id;
    const current = e.currentTarget;
    const typeName = current.getAttribute("name");
    const examination = LoadToggle[typeName].indexOf(target);

    if (typeName === "deleteIndex") {
      dispatcher(examination, type, typeName, target);
    } else if (typeName === "conIndex") {
      dispatcher(examination, type, typeName, target);
      let num = current.closest(".card").getAttribute("data-index");
      target = value.pages[num];
      //
      if (examination === -1 && type === undefined) {
        dispatch(eachAction(target, typeName));
      } else {
        dispatch(RemoveEach(target, typeName));
      }
      //
    } else if (typeName === "addIndex") {
      dispatcher(examination, type, typeName, target);
    }
  }

  function dispatcher(examination, type, typeName, target) {
    if (examination === -1 && type === undefined) {
      dispatch(addIndexAction({ target, typeName }));
    } else {
      dispatch(RemoveAction({ target, typeName }));
    }
  }

  return (
    <article className="list" style={{ order: `${value.order}` }}>
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
