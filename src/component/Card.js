import React from "react";
import { useSelector } from "react-redux";
import { IndexAction, RemoveAction } from "../module/reducer";
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
    const check = "-btn";
    let target = e.currentTarget.getAttribute("data-id");
    if (target === null) {
      const num = e.currentTarget.closest(".card").getAttribute("data-index");
      target = value.pages[num];
    } else {
      if (target.includes(check)) {
        target = target.replace("-btn", "");
      }
    }
    const typeName = e.currentTarget.name;
    const examination = LoadToggle[typeName].indexOf(target);
    if (examination === -1 && type === undefined) {
      dispatch(IndexAction({ target, typeName }));
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
