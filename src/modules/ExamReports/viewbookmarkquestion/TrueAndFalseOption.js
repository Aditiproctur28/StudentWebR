import React from "react";
import attemptCircle from "../../../assets/exam/attempcircle.png";
import unattemptCircle from "../../../assets/exam/notattempcircle.png";
const TrueAndFalseOption = (props) => {
  const setAnswerTitle = (curr, attempt, status) => {
    let locAttemt = attempt == 2 ? 0 : attempt;
    if ((parseInt(curr) === parseInt(locAttemt)) === parseInt(status)) {
      return "Your Answer";
    } else if (curr == status) {
      return "Currect Answer";
    } else {
      return "Your Answer";
    }
  };
  return (
    <>
      <div
        className={
          props?.correct_ans == 1
            ? "currectAnswer"
            : props?.attempt_answer == 1
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
              src={props?.attempt_answer == 1 ? attemptCircle : unattemptCircle}
            />
            <p style={{ marginLeft: "8px" }}>True</p>
          </div>
          {(props?.attempt_answer == 1 || props?.correct_ans == 1) && (
            <p>
              {setAnswerTitle(props?.correct_ans, props?.attempt_answer, 0)}{" "}
            </p>
          )}
        </div>
      </div>
      <div
        className={
          props?.correct_ans == 0
            ? "currectAnswer"
            : props?.attempt_answer == 2
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
              src={props?.attempt_answer == 2 ? attemptCircle : unattemptCircle}
            />
            <p style={{ marginLeft: "8px" }}>False</p>
          </div>
          {(props?.attempt_answer == 2 || props?.correct_ans == 0) && (
            <p>
              {setAnswerTitle(props?.correct_ans, props?.attempt_answer, 1)}{" "}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default TrueAndFalseOption;
