import React from "react";
import multiselect from "../../../assets/exam/multi.png";
import multiselected from "../../../assets/exam/multicheck.png";
import Rectselect from "../../../assets/exam/rectselect.png";
import "./viewbookmarkquestion.css";

const MulitChoice = (props) => {
  const setAnswerTitle = (curr, attempt, ind) => {
    if (curr == 1 && attempt.includes(ind + 1)) {
      return "Your Answer";
    } else if (curr == 1 && !attempt.includes(ind + 1)) {
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
            : props?.attempt_answer.includes(props?.ind + 1)
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              height="15px"
              width="15px"
              src={
                props?.attempt_answer.includes(props?.ind + 1)
                  ? multiselected
                  : props?.is_correct == 1
                  ? multiselect
                  : Rectselect
              }
            />
            <p style={{ marginLeft: "8px" }}>
              {
                <span
                  dangerouslySetInnerHTML={{
                    __html: props?.answer_option,
                  }}
                ></span>
              }
            </p>
          </div>
          {(props?.is_correct == 1 ||
            props?.attempt_answer.includes(props?.ind + 1)) && (
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

export default MulitChoice;
