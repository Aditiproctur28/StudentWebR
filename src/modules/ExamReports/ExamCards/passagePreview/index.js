import React from "react";
import cancelIcon from "../../../../assets/exam/cancel.png";

import "./passagePreview.css";

const PassagePreview = (props) => {
  return (
    <>
      <div className="preview-popup-box">
        <div className="preview-box">
          <div
            style={{
              display: "flex",
              flexDireaction: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              borderBottom: "1px solid red",
            }}
          >
            <p className="passageTitle"> Passage Preview</p>
            <img
              width="24px"
              height="24px"
              src={cancelIcon}
              onClick={() => {
                props.close(false);
              }}
            />
          </div>
          <div style={{ height: "250px", overflow: "auto", margin: "22px" }}>
            <div
              className="questionText"
              dangerouslySetInnerHTML={{
                __html: atob(props.data),
              }}
            ></div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <div className="closeButtondiv">
              <p
                onClick={() => {
                  props.close(false);
                }}
                className="closebuttonTitle"
              >
                Close
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PassagePreview;
