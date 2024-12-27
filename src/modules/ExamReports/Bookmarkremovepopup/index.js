import React from "react";
import "./removepopup.css";
import removeIcon from "../../../assets/exam/removeicon.png";
import cancelIcon from "../../../assets/exam/cancel.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api/api";

const RemovePopUp = (props) => {
  const deleteBookmark = (stuId, qusId) => {
    let request = {
      url: `/student/testLabels/deleteBookmark`,
      token: props.examdesk_auth_token,
      data: {
        student_id: stuId,
        question_id: qusId,
      },
    };
    api.postAuthExamW(request).then((data) => {
      props.setRemoveTestId(-1);
      if (data.data.validate == true) {
        toast.success(data.data.message);
        props.BookMarkApi();
      }
    });
  };

  return (
    <>
      <div className="popup-box">
        <div className="popmsgdiv">
          <div className="canceldiv">
            <img
              height="24px"
              width="24px"
              style={{ paddingTop: "8px", paddingRight: "8px" }}
              src={cancelIcon}
              onClick={() => {
                props.setRemoveTestId(-1);
              }}
            />
          </div>
          <div className="msgdivmain">
            <div className="imgdiv">
              <img height="40px" width="40px" src={removeIcon} />
            </div>
            <p className="msg">Are sure you want to remove bookmark?</p>
          </div>
          <div className="buttondiv">
            <button
              className="canclebutton"
              onClick={() => {
                props.setRemoveTestId(-1);
              }}
            >
              Cancel
            </button>
            <button
              className="yesconfirm"
              onClick={() => {
                deleteBookmark(props.stuId, props.quesId);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default RemovePopUp;
