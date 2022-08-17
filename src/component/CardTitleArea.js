import React, { useCallback, useEffect, useState } from "react";

function CardTitleArea({
  value,
  searchDB,
  typeIndex,
  totalToggle,
  FontAwesomeIcon,
  iconObject,
}) {
  const [header, setHeader] = useState("");

  useEffect(() => {
    setHeader(value.header);
  }, []);

  const onchangeHeader = useCallback(
    (e) => {
      setHeader(e.target.value);
    },
    [header]
  );

  async function titleEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      const target = e.target.getAttribute("data-id");
      await searchDB
        .doc(target)
        .update({
          header: header,
        })
        .then(() => {
          e.target.blur();
        });
    }
  }

  function deleteHandler(e) {
    const deleteTarget = e.currentTarget.getAttribute("data-id");
    const delCheck = window.confirm("정말 삭제하시겠습니까?");
    if (delCheck) {
      searchDB.doc(deleteTarget).delete();
    }
    totalToggle(e);
  }

  return (
    <form className="list-header">
      <input
        type="text"
        className="title-area"
        data-id={value.id}
        value={header}
        onKeyDown={(e) => titleEnter(e)}
        onChange={(e) => {
          onchangeHeader(e);
        }}
      />
      <input type="text" style={{ display: "none" }} />
      <button
        type="button"
        className={typeIndex.deleteIndex ? "submit" : "changer"}
        name="deleteIndex"
        data-id={value.id}
        onClick={(e) => {
          if (typeIndex.deleteIndex) {
            deleteHandler(e);
          } else {
            totalToggle(e);
          }
        }}
      >
        {typeIndex.deleteIndex ? (
          <FontAwesomeIcon icon={iconObject.faTrashRestore} size="1x" />
        ) : (
          <FontAwesomeIcon icon={iconObject.faEllipsis} size="1x" />
        )}
      </button>
    </form>
  );
}

export default CardTitleArea;
