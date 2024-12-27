import React, { useState } from "react";
import "./viewbookmarkquestion.css";
import QuestionIcon from "../../../assets/exam/questions.png";
import addbooked from "../../../assets/exam/addbooked.png";
import AttemptCircle from "../../../assets/exam/attempcircle.png";
import NotAttemptCircle from "../../../assets/exam/notattempcircle.png";
import Feedback from "../BookmarkCards/feedback";
import SolutionByAdmin from "../BookmarkCards/solutionbyadmin";
import CurrectAnswer from "../BookmarkCards/CurrectAnswer";
import PassageIcon from "../../../assets/exam/passageicon.png";
import PassagePreview from "../ExamCards/passagePreview";
import MediaPlayer from "../../../assets/exam/mediaplayer.png";
import MediaPlayerAudio from "../../../assets/exam/mediaplayeraudio.png";
import SingleChoiceOptions from "./SingleChoiceOptions";
import MulitChoice from "./MultipleChoiceOption";
import TrueAndFalseOption from "./TrueAndFalseOption";
import MatchMatrix from "./matchmatrix";
import YourAnswer from "../BookmarkCards/YourAnswer";
import MatchMatrixMul from "./matchmatrixmul";

const ViewBookmarkQuestion = (props) => {
  const [openParagraph, setOpenParagraph] = useState(false);
  return (
    <>
      <div>
        {openParagraph && (
          <PassagePreview
            data={props.questionsData?.[props?.inx]?.description_mathjax}
            close={setOpenParagraph}
          />
        )}

        <div
          style={{
            display: "flex",
            paddingLeft: "32px",
            height: "61px",
            alignItems: "center",
          }}
        >
          <p className="backtext"> Back {`>`}</p>
          <p
            className="bookmarkedqustext"
            onClick={() => props.setViewPage("questionpage")}
          >
            Bookmarked Questions
          </p>
          <p className="viewquestiontext">{`>`} View Questions</p>
        </div>
        <div className="stateline"></div>
        {props.questionsData?.[props?.inx]?.description && (
          <div className="passageMainDiv">
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <img height="20px" width="20px" src={PassageIcon} />
              <p className="passageTitle">Passage</p>
            </div>
            <div className="passageDivField">
              <div
                className="passageText"
                dangerouslySetInnerHTML={{
                  __html: atob(
                    props.questionsData?.[props?.inx]?.description_mathjax
                  ),
                }}
              ></div>

              {/* <p className="passageText">
                {props.questionsData?.[props?.inx]?.description}
              </p> */}
              {props.questionsData?.[props?.inx]?.description.length > 550 && (
                <p onClick={() => setOpenParagraph(true)}> Load more</p>
              )}
            </div>
          </div>
        )}
        <div className="questionHeader">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img height="20px" width="20px" src={QuestionIcon} />
            <p style={{ marginLeft: "10px" }}>Question</p>
          </div>
          <img width="18px" height="24px" src={addbooked} />
        </div>
        <div
          style={{
            marginLeft: "64px",
            marginRight: "64px",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          <div
            className="questionText"
            dangerouslySetInnerHTML={{
              __html: props.questionsData?.[props?.inx]?.is_multi_lingual
                ? props.questionsData?.[props?.inx]?.question
                : atob(props.questionsData?.[props?.inx]?.question_mathjax),
            }}
          ></div>
        </div>
        {props.questionsData?.[props?.inx]?.media_data &&
          (props.questionsData?.[props?.inx]?.media_data).map((item, index) => (
            <div className="mediadiv">
              <div style={{ display: "flex" }}>
                <img
                  height="52px"
                  width="52px"
                  style={{ marginRight: "8px" }}
                  src={
                    item?.media_type == "video" ? MediaPlayer : MediaPlayerAudio
                  }
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="mediaNameText">{item?.source_path}</p>
                  <p className="NoAvalableText">
                    <span className="texttransformation">
                      {item?.media_type}
                    </span>{" "}
                    Preview is not availaible
                  </p>
                </div>
              </div>
            </div>
          ))}
        <div>
          {props.questionsData?.[props?.inx]?.ques_type == 1 &&
            props.questionsData?.[props?.inx]?.options?.map((item, index) => (
              <>
                <SingleChoiceOptions
                  ind={index}
                  multilingual={
                    props.questionsData?.[props?.inx]?.is_multi_lingual
                  }
                  answer_option={item.answer_option}
                  is_correct={item.is_correct}
                  attempt_answer={
                    props.questionsData?.[props?.inx]?.attempt_answer
                  }
                />
              </>
            ))}
          {props.questionsData?.[props?.inx]?.ques_type == 3 &&
            props.questionsData?.[props?.inx]?.options?.map((item, index) => (
              <>
                <MulitChoice
                  ind={index}
                  answer_option={item.answer_option}
                  is_correct={item.is_correct}
                  attempt_answer={
                    props.questionsData?.[props?.inx]?.attempt_answer
                  }
                />
              </>
            ))}
          {props.questionsData?.[props?.inx]?.ques_type == 5 && (
            <TrueAndFalseOption
              option={props.questionsData?.[props?.inx]?.options}
              correct_ans={props.questionsData?.[props?.inx]?.correct_ans}
              attempt_answer={props.questionsData?.[props?.inx]?.attempt_answer}
            />
          )}

          {props.questionsData?.[props?.inx]?.ques_type == 7 && (
            <div>
              <MatchMatrix
                option={props.questionsData?.[props?.inx]?.options}
                attempt_answer={
                  props.questionsData?.[props?.inx]?.attempt_answer
                }
                correct_ans={props.questionsData?.[props?.inx]?.correct_ans}
              />
            </div>
          )}
        </div>
        {/* <div className='currectAnswersection'>

            </div> */}
        {props.questionsData?.[props?.inx]?.ques_type == 6 && (
          <div>
            <MatchMatrixMul
              option={props.questionsData?.[props?.inx]?.options}
              attempt_answer={props.questionsData?.[props?.inx]?.attempt_answer}
              correct_ans={props.questionsData?.[props?.inx]?.correct_ans}
            />
          </div>
        )}
        {(props.questionsData?.[props?.inx]?.ques_type == 1 ||
          props.questionsData?.[props?.inx]?.ques_type == 3 ||
          props.questionsData?.[props?.inx]?.ques_type == 5) &&
          props.questionsData?.[props?.inx]?.attempt_answer && (
            <div className="feedbacksection">
              <CurrectAnswer
                ques_type={props.questionsData?.[props?.inx]?.ques_type}
                correct_ans={props.questionsData?.[props?.inx]?.correct_ans}
              />
            </div>
          )}
        {props.questionsData?.[props?.inx]?.feedback_mathjax !== "" && (
          <div className="feedbacksection">
            <Feedback
              feedback={props.questionsData?.[props?.inx]?.feedback_mathjax}
              feedbackalieas={props.questionsData?.[props?.inx]?.alies_feedback}
              multilingual={props.questionsData?.[props?.inx]?.is_multi_lingual}
            />
          </div>
        )}
        {props.questionsData?.[props?.inx]?.ques_type == 2 &&
          props.questionsData?.[props?.inx]?.attempt_answer && (
            <div className="feedbacksection">
              <YourAnswer
                attempt_answer={
                  props.questionsData?.[props?.inx]?.attempt_answer
                }
              />
            </div>
          )}
        {props.questionsData?.[props?.inx]?.ques_type == 2 &&
          props.questionsData?.[props?.inx]?.answer && (
            <div className="feedbacksection">
              <SolutionByAdmin
                feedback={props.questionsData?.[props?.inx]?.answer}
              />
            </div>
          )}
      </div>
    </>
  );
};
export default ViewBookmarkQuestion;
