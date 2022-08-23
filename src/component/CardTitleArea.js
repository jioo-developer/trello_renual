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
    console.log(e.target);
    if (e.keyCode === 13) {
      e.preventDefault();
      await searchDB
        .doc(value.id)
        .update({
          header: header,
        })
        .then(() => {
          e.target.blur();
        });
    }
  }

  function deleteHandler(e) {
    const delCheck = window.confirm("정말 삭제하시겠습니까?");
    if (delCheck) {
      searchDB
        .doc(value.id)
        .collection("article")
        .get()
        .then((result) => {
          if (result.docs.length !== 0) {
            result.docs.map((values) => {
              searchDB.doc(value.id).collection("article").doc(values).delete();
            });
          }
        })
        .then(() => {
          searchDB.doc(value.id).delete();
        });
    }
    totalToggle(e);
  }

  return (
    <form className="list-header">
      <input
        type="text"
        className="title-area"
        value={header}
        onKeyDown={(e) => titleEnter(e)}
        onChange={(e) => {
          onchangeHeader(e);
        }}
      />
      <input type="text" style={{ display: "none" }} />
      <button
        type="button"
        className="submit"
        name="deleteIndex"
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
