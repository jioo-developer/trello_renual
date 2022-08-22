import React, { useEffect, useState } from "react";
import "../reset.css";
import "../asset/Detail.scss";
import TextArea from "react-textarea-autosize";
import { DetailAction } from "../module/reducer";
function Detail({ FontAwesomeIcon, iconObject, dispatch }) {
  return (
    <section className="Detail-page">
      <article className="in-page">
        <FontAwesomeIcon
          icon={iconObject.faXmark}
          size="1x"
          className="page-close"
          onClick={() => {
            dispatch(DetailAction());
          }}
        />
        <div className="page-header">
          <div className="in-wrap">
            <TextArea minRows={1} className="page-title"></TextArea>
          </div>
          <p className="inst">
            in list <span></span>
          </p>
        </div>
        <div className="left_con">
          <article className="des_area">
            <div className="area-header">
              <FontAwesomeIcon icon={iconObject.faList} size="1x" />
              <p>Description</p>
              <button type="button">Edit</button>
            </div>
          </article>
          <TextArea />
        </div>
        <article className="btn-area">
          <p>utility</p>
          <ul className="btns">
            <li>Label</li>
            <li>Delete</li>
          </ul>
        </article>
      </article>
    </section>
  );
}

export default Detail;
