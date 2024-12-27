import React, { useState } from "react";
import "./bookmarks.css";
import eye from "../../../assets/exam/eye.png";
import bookmarkicon from "../../../assets/exam/booked.png";
import resetIcon from "../../../assets/document/reset.png";
import RemovePopUp from "../Bookmarkremovepopup";
import ViewBookmarkQuestion from "../viewbookmarkquestion";
import img7 from "../../../assets/liveclass/img7.png";
import { connect } from "react-redux";
import api from "../../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchImg from "../../../assets/search/searchbar.png";

import { useEffect } from "react";
const Bookmarked = (props) => {
  var regex = /(<([^>]+)>)/gi;
  const [questionsData, setQuestionsData] = useState([]);
  const [viewPage, setViewPage] = useState("questionpage");
  const [inx, setInd] = useState(0);
  const [removeTestId, setRemoveTestId] = useState(-1);
  const [filterQues, setFilterQues] = useState([]);
  const [sorting, SetSorting] = useState(1);

  useEffect(() => {
    BookMarkApi();
  }, []);

  useEffect(() => {
    if (sorting == 1) {
      const sortedDates = questionsData
        ?.map((obj) => {
          return { ...obj, date_time: new Date(obj.date_time) };
        })
        .sort((a, b) => b.date_time - a.date_time);
      setFilterQues(sortedDates);
    } else {
      const sortedDates = questionsData
        ?.map((obj) => {
          return { ...obj, date_time: new Date(obj.date_time) };
        })
        .sort((a, b) => a.date_time - b.date_time);
      setFilterQues(sortedDates);
    }
  }, [JSON.stringify(sorting)]);

  const BookMarkApi = () => {
    let request = {
      url: `/student/testLabels/bookmark/${props.auth.user_id}`,
      token: props.auth.examdesk_auth_token,
    };
    api.getAuthExamW(request).then((data) => {
      setQuestionsData(data.data.data);
      setFilterQues(data.data.data);
    });
  };

  function Search(dataa) {
    let data = [];
    questionsData?.forEach((element) => {
      if (
        atob(element?.question)
          ?.toString()
          ?.toLowerCase()
          ?.includes(dataa.toString().toLowerCase())
      ) {
        data.push(element);
      }
    });
    setFilterQues(data);
  }

  const onClickQuestion = (inx) => {
    setInd(inx);
    setViewPage("questionDetails");
  };

  return (
    <>
      <div className="containerdiv">
        {removeTestId !== -1 && (
          <RemovePopUp
            stuId={props.auth.user_id}
            quesId={removeTestId}
            examdesk_auth_token={props.auth.examdesk_auth_token}
            BookMarkApi={BookMarkApi}
            setRemoveTestId={setRemoveTestId}
          />
        )}
        {viewPage == "questionpage" ? (
          <>
            <div className="header">
              <div className="headerleft">
                <button
                  className="backbutton"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    props.openBookmark();
                  }}
                >
                  back >{" "}
                </button>
                <span
                  className="bookmarkQuestionTitle"
                  style={{ cursor: "pointer" }}
                >
                  Bookmarked Questions
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginLeft: "24px" }}>
                  <select
                    className="dropDown"
                    onChange={(e) => {
                      SetSorting(e.target.value);
                    }}
                  >
                    <option value="someOption">Select</option>
                    <option value="someOption" value="1">
                      Latest
                    </option>
                    <option value="otherOption" value="2">
                      Oldest{" "}
                    </option>
                  </select>
                </span>
              </div>
            </div>
            <div className="stateline"></div>
            {filterQues.length > 0 ? (
              filterQues?.map((item, index) => (
                <div className="cardmaindiv">
                  <div className="cardstyle">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="borderline"></div>
                      <div style={{ marginLeft: "20px", width: "95%" }}>
                        <p
                          title={item.question}
                          style={{
                            minHeight: "38px",
                            overflow: "auto",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "18px",
                              paddingRight: "10px",
                              whiteSpace: "pre",
                              fontWeight: 500,
                            }}
                          >
                            {" "}
                            Q.{index + 1}{" "}
                          </span>

                          <span>
                            {" "}
                            {item.question
                              .substr(0, 220)
                              ?.replace(/<[^>]*>/g, "")}
                            {item.question.length > 220 && " ..."}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        marginRight: "28px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        height="26px"
                        width="18px"
                        style={{ marginRight: "54px", cursor: "pointer" }}
                        src={bookmarkicon}
                        onClick={() => setRemoveTestId(item.ques_id)}
                      />
                      <img
                        width="28px"
                        height="28px"
                        style={{ cursor: "pointer" }}
                        src={eye}
                        onClick={() => {
                          onClickQuestion(index);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="noBookmarkdiv">
                <p className="noBookmarkLable">
                  {" "}
                  No Bookmark Question Available{" "}
                </p>
                <img src={img7} />
              </div>
            )}
          </>
        ) : (
          <ViewBookmarkQuestion
            setViewPage={setViewPage}
            questionsData={filterQues}
            inx={inx}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(Bookmarked);
