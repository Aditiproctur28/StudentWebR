import React, { useState } from "react";
import "./examScoreCard.css";
import block2 from "../../assets/products/block2.png";
import ghadi from "../../assets/products/ghadi.png";
import people from "../../assets/products/people.png";
import tick from "../../assets/products/tick.png";
import cloud from "../../assets/products/cloud.png";
import tv from "../../assets/products/tv.png";
import Wrong from "../../assets/exam/wrong.svg";
import { connect } from "react-redux";
import ViewExam from "./viewExam.js";
import config from "../../config";
import URL from "../../api/url";
var base64 = require("base-64");

let testpurl = URL[config.env].REPORT_DOWNLOAD_URL;

function ExamScoreCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const FindTotalTime = (seconds) => {
    var p1 = seconds % 60;
    var p2 = seconds / 60;
    var p3 = p2 % 60;
    p2 = p2 / 60;
    return (
      parseInt(p2) +
      " hr" +
      " " +
      parseInt(p3) +
      " min" +
      " " +
      parseInt(p1) +
      " sec"
    );
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  let authToken =
    props.auth.account_id +
    "/" +
    props.auth.user_id +
    "/" +
    props.online_element_card_test_id +
    "/-1";
  return (
    <>
      {isOpen && (
        <ViewExam
          subject_wise_distribution={props.subject_wise_distribution}
          handleClose={togglePopup}
        />
      )}
      <div className="score-card-container">
        <div className="score-card-container2" id="score-card-container2">
          <div className="exam-score">
            <div className="exam-score-div">
              <div className="exam-score-div2">
                <div className="dot-exam"></div>
                <div className="rank-div-head">Exam Score</div>
              </div>
              {props.element_object &&
              props.element_object.is_result_published &&
              props.element_object.is_download_solution ? (
                <div style={{ alignSelf: "flex-end" }}>
                  <button
                    className="exam-view-button"
                    onClick={() =>
                      window.open(
                        `${URL[config.env].REPORT_PREVIEW_URL}${authToken}`
                      )
                    }
                  >
                    Preview
                  </button>
                  <button
                    style={{ marginLeft: 10 }}
                    className="exam-view-button"
                    onClick={() =>
                      window.open(
                        `${URL[config.env].REPORT_PREVIEW_URL}${authToken}/1`
                      )
                    }
                  >
                    Download
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="details-exam">
              <div className="rank-div">
                <div className="rank-heading">
                  <span>Rank</span>
                  <div className="rank-partition"></div>
                </div>
                <div className="image-div2-exam">
                  <img src={block2}></img>
                  <span className=""> {props.test_report.rank}</span>
                </div>
              </div>
              <div className="rank-div">
                <div className="rank-heading">
                  <span>Marks</span>
                  <div className="rank-partition"></div>
                </div>
                <div className="image-div2-exam">
                  <span>
                    {" "}
                    {props.test_report.total_score}/
                    {props.test_report.total_marks}
                  </span>
                </div>
              </div>

              <div className="rank-div">
                <div className="rank-heading">
                  <span>Percentile</span>
                  <div className="rank-partition"></div>
                </div>
                <div className="image-div2-exam">
                  <span className="image-heading2-exam">
                    {props.test_report.total_students > 1
                      ? (
                          ((props.test_report.total_students -
                            props.test_report.rank) /
                            props.test_report.total_students) *
                          100
                        ).toFixed(2)
                      : 99}
                  </span>
                </div>
              </div>

              <div className="rank-div">
                <div className="rank-heading">
                  <span>Question Attempted</span>
                  <div className="rank-partition"></div>
                </div>
                <div className="image-div2-exam">
                  <span className="image-heading2-exam">
                    {props.test_report.right_ques_count +
                      props.test_report.wrong_ques_count}
                    /
                    {props.test_report.right_ques_count +
                      props.test_report.wrong_ques_count +
                      props.test_report.left_ques_count}
                  </span>
                </div>
              </div>
              <div className="rank-div">
                <div className="rank-heading">
                  <span>Correct Answer</span>
                  <div className="rank-partition"></div>
                </div>
                <div className="image-div2-exam">
                  <span className="">
                    {props.test_report.right_ques_count}/
                    {props.test_report.right_ques_count +
                      props.test_report.wrong_ques_count}
                  </span>
                </div>
              </div>
              <div className="rank-div">
                <div className="rank-heading">
                  <span>Incorrect Answer</span>
                  <div className="rank-partition"></div>
                </div>
                <div className="image-div2-exam">
                  <span className="image-heading2-exam">
                    {props.test_report.wrong_ques_count}/
                    {props.test_report.right_ques_count +
                      props.test_report.wrong_ques_count}
                  </span>
                </div>
              </div>
              <div className="rank-div">
                <div className="rank-heading">
                  <span>Student Appeared</span>
                  <div className="rank-partition"></div>
                </div>
                <div className="image-div2-exam">
                  <img src={people}></img>
                  <span className=""> {props.test_report.total_students}</span>
                </div>
              </div>
              <div className="rank-div">
                <div className="rank-heading">
                  <span>Total Time Taken</span>
                  <div className="rank-partition"></div>
                </div>
                <div className="image-div2-exam" style={{ display: "flex" }}>
                  <img className="ghadi" src={ghadi}></img>
                  <span className="image-heading2-exam">
                    <p style={{ fontSize: "14px", fontWeight: 500 }}>
                      {FindTotalTime(props.test_report.total_attempted_time)}
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="table-div">
              <table id="customers">
                <tr>
                  <th>Subject</th>
                  <th>T.S</th>
                  <th>A.T</th>
                  <th>R.Q</th>
                  <th>W.Q</th>
                  <th>L.Q</th>
                  <th>R.M</th>
                  <th>W.M</th>
                </tr>
                {props.subject_wise_distribution &&
                  props.subject_wise_distribution.map((data, index) => {
                    return (
                      <tr>
                        <td>{data.subject_name.substr(0, 30)}</td>
                        <td>{data.total_score}</td>
                        <td>{parseInt(data.total_attempted_time / 60000)}</td>
                        <td>{data.right_ques_count}</td>
                        <td>{data.wrong_ques_count}</td>
                        <td>{data.left_ques_count}</td>
                        <td>{data.right_ques_marks}</td>
                        <td>{data.wrong_ques_marks}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>

            <div className="initial-name">
              <font style={{ fontSize: "20px" }}>**</font>
              <span> &#8226; T.S-Total Score</span>
              <span> &#8226;W.M-Wrong Marks</span>
              <span> &#8226;A.T-Total Attempt Time</span>
              <span> &#8226;L.Q-Left Question Count</span>
              <span> &#8226;R.Q-Right Ouestion Count</span>
              <span>&#8226;R.M-Right Marks</span>
              <span>&#8226;W.Q-Wrong Question Count</span>
            </div>

            <div className="question-report"></div>
          </div>

          <div className="exam-score2">
            <div className="exam-score-div">
              <div className="exam-score-div2">
                <div className="dot-exam"></div>
                <div className="rank-div-head">Questions Report</div>
              </div>
              <div className="opposite-heading">
                <span className="exam-view-img">
                  <img src={tv} />
                </span>
                <span className="exam-view-heading">
                  Here You can check Graphical subject wise representation{" "}
                </span>
                <button className="exam-view-button" onClick={togglePopup}>
                  View
                </button>
              </div>
            </div>

            <div className="table-div" id="table-div">
              <div id="table-div-div">
                <table id="exam">
                  <tr>
                    <th>Q.No</th>
                    <th>Status</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                    <th style={{ width: "80px" }}>You Scored</th>
                  </tr>
                  {props?.question_wise_distribution?.map((data, index) => (
                    <tr>
                      <td>{data.question_order}</td>
                      {data.is_correct ? (
                        <td>
                          <img src={tick} />
                        </td>
                      ) : (
                        <td>
                          <img src={Wrong} />
                        </td>
                      )}
                      <td
                        dangerouslySetInnerHTML={{
                          __html: data.student_answer,
                        }}
                      ></td>
                      <td>
                        {data.ques_type == 2
                          ? base64.decode(data.correct_answer)
                          : data.correct_answer}
                      </td>
                      <td style={{ width: "80px" }}>{data.total_score}</td>
                    </tr>
                  ))}
                </table>
              </div>
              <div className="total-marks">
                <div className="marks-exam">
                  <span className="score-exam">Total Marks Scored</span>
                </div>
                <div
                  className="marks-got"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <p className="your-marks" style={{ width: "121px" }}>
                    {" "}
                    {props.test_report.total_score}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(ExamScoreCard);
