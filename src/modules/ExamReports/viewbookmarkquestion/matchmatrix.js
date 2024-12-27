import React from "react";
import YourAnswer from "../../../assets/exam/youranswer.png";
import AnswerIcon from "../../../assets/exam/answer.png";
import unattemptCircle from "../../../assets/exam/notattempcircle.png";
import attempted from "../../../assets/exam/youranswered.png";
import CurrectIcon from "../../../assets/exam/currecttick.png";
import "./viewbookmarkquestion.css";

const MatchMatrix = (props) => {
  const alph = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
  ];
  return (
    <>
      <div
        style={{
          marginLeft: "64px",
          marginRight: "64px",
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        {props?.option?.map((item, index) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              ({index + 1}){" "}
              <div
                style={{ paddingLeft: "8px" }}
                dangerouslySetInnerHTML={{
                  __html: item.answer_option,
                }}
              ></div>
            </div>

            <div
              style={{ width: "45%", display: "flex", alignItems: "center" }}
            >
              ({alph[index]}){" "}
              <div
                style={{ paddingLeft: "8px" }}
                dangerouslySetInnerHTML={{
                  __html: item.answer_choice_option,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "32px",
          paddingRight: "72px",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <div style={{ width: "50%" }}>
          <div style={{ display: "flex" }}>
            <img height={20} width={20} src={YourAnswer} />
            <p className="answerTitle">Your Answers</p>
          </div>
          <div style={{ paddingLeft: "24px", paddingRight: "35%" }}>
            {props?.option?.map((item, index1) => (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                }}
              >
                ({index1 + 1})
                {props?.correct_ans.split(",")?.map((item2, index2) => (
                  <>
                    <div>
                      <img
                        height={12}
                        width={12}
                        src={
                          props?.attempt_answer
                            ?.split(",")
                            [index1]?.slice(-1) ==
                          index2 + 1
                            ? attempted
                            : unattemptCircle
                        }
                      />
                      {"  "} {"  "} ({alph[index2]})
                    </div>
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: "43%" }}>
          <div style={{ display: "flex" }}>
            <img height={20} width={20} src={AnswerIcon} />
            <p className="answerTitle"> Correct Answers</p>
          </div>
          <div style={{ paddingLeft: "24px", paddingRight: "35%" }}>
            {props?.option?.map((item, index1) => (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                }}
              >
                ({index1 + 1})
                {props?.correct_ans.split(",")?.map((item2, index2) => (
                  <>
                    <div>
                      <img
                        height={12}
                        width={12}
                        src={
                          props?.correct_ans.split(",")[index1].slice(-1) ==
                          index2 + 1
                            ? CurrectIcon
                            : unattemptCircle
                        }
                      />
                      {"  "} {"  "} ({alph[index2]})
                    </div>
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default MatchMatrix;
