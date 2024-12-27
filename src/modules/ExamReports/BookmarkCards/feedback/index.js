import React from "react";
import "./feedback.css";
import feedbackIcon from "../../../../assets/exam/feedback.png";

const Feedback = (props) => {
  var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  return (
    <>
      <div style={{ marginTop: "32px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={feedbackIcon} height={24} width={24} />
          <p className="feedbacktitle" style={{ width: "75px" }}>
            Feedback
          </p>
          <div className="stateLine"></div>
        </div>
        <div>
          {props?.multilingual ? (
            <p className="feedbackmsg">
              {props.feedbackalieas.replace(htmlRegexG, "")}{" "}
            </p>
          ) : (
            <div
              className="feedback"
              dangerouslySetInnerHTML={{ __html: atob(props.feedback) }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feedback;
