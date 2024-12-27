import React from "react";
import "./viewbookmarkquestion.css";
import attemptCircle from "../../../assets/exam/attempcircle.png";
import unattemptCircle from "../../../assets/exam/notattempcircle.png";
const SingleChoiceOptions = (props) => {
  const setAnswerTitle = (curr, attempt, ind) => {
    if (curr == 1 && attempt == ind + 1) {
      return "Your Answer";
    } else if (curr == 1 && attempt != ind + 1) {
      return "Currect Answer";
    } else {
      return "Your Answer";
    }
  };
  return (
    <>
      <div
        className={
          props?.is_correct == 1
            ? "currectAnswer"
            : props?.attempt_answer == props?.ind + 1
            ? "yourAnswer"
            : "unselectAnswer"
        }
      >
        <div
          style={{
            display: "flex",
            flexDireaction: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingRight: "32px",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", height: "" }}>
            <img
              height="15px"
              width="15px"
              src={
                props?.attempt_answer == props?.ind + 1
                  ? attemptCircle
                  : unattemptCircle
              }
            />
            <div
              className="ansoption"
              style={{ marginLeft: "8px" }}
              dangerouslySetInnerHTML={{ __html: props?.answer_option }}
            ></div>
            {/* <p >{props?.answer_option}</p> */}
          </div>
          {(props?.is_correct == 1 ||
            props?.attempt_answer == props?.ind + 1) && (
            <p>
              {setAnswerTitle(
                props?.is_correct,
                props?.attempt_answer,
                props?.ind
              )}{" "}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleChoiceOptions;
