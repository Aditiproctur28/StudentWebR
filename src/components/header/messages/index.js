import React, { useState, useEffect } from "react";
import Header from ".././../header";
import { connect } from "react-redux";
import api from "../../../api/api";
import Loader from "../../loader";
import moment from "moment";
import "./messages.css";
import MessagesImg from "../../../assets/header/messagesImg.svg";
import NoMessages from "../../../assets/header/nomessages.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessageHandling } from "../../../components/error";
import MessageList from "./messageList";
import Alert from "../../../services/Alert";

const Messages = (props) => {
  const [flag, setflag] = useState(true);
  const [Data, setData] = useState([]);
  const [alertPop, setAlertPop] = useState(false);
  const [applink, setApplink] = useState("");
  var Allmessage = [];

  const addingMessages = (data) => {
    let t = [];
    data.map((data, index) => {
      let date = moment(data.createdDateTime).format("DD-MM-YYYY");
      let tym = moment(data.createdDateTime).format("hh:mm A");
      let cindex = t.findIndex((pdata) => pdata.date == date);
      let day = moment(date, "DD-MM-YYYY").format("dddd");
      let messages = {
        msg: data.message,
        time: tym,
      };

      if (cindex == -1) {
        t = [...t, { day, date, message: [messages] }];
      } else {
        t[cindex].message.push(messages);
      }
    });
    return t;
  };
  const alertToggleFunc = () => {
    setAlertPop(false);
  };

  useEffect(() => {
    let request = {
      url: `/api/v1/alerts/config/messagesByPhoneNo/${
        props.auth.institute_id
      }/${
        "+" + props.auth.country_calling_code + "-" + props.auth.student_phone
      }?start_index=0&batch_size=1000`,
      token: props.auth.student_auth,
    };
    api
      .getAuth(request)
      .then((data) => {
        let t = addingMessages(data.data);
        setData([...t]);
        setflag(false);
      })
      .catch((err) => {
        setflag(false);

        if (err && err.response && err.response.status == 403) {
          // if(err.response.data.message.includes("You Do not have permission to log in from the Website.")){
          // setAlertPop(true)
          // setApplink(err.response.data.message)
          // }
          // else{
          props.dispatch({ type: "LOGOUT", msg: err.response.data.message });
          // }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error(ErrorMessageHandling(err));
        }
      });
  }, []);

  return (
    <>
      <div>
        {flag && <Loader />}
        {alertPop && (
          <Alert alertToggleFunc={alertToggleFunc} error_msg={applink} />
        )}
      </div>
      <div className="Header-div">
        <Header />
        <div className="Message-title">
          <p>Messages</p>
        </div>
      </div>

      <div className="Main-Container">
        <div className="messages-side">
          {Data.length > 0 ? (
            Data.map((data, index) => {
              return (
                <>
                  <div>
                    <div className="msgdateborder">
                      <div className="msg_days_label">
                        <div className="msg_days_label_days">
                          <p>{data.day}</p>
                        </div>
                        <div className="verticalline"></div>
                        <div className="msg_days_label_dates">
                          <p>{data.date}</p>
                        </div>
                      </div>
                      <div className="line_div"></div>
                    </div>
                    <div>
                      <MessageList message={data.message} />
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="nomessagesyet">
              <p>No Messages Yet!</p>
              <img src={NoMessages} />
            </div>
          )}
        </div>
        <div className="messages-img">
          <div>
            <p className="msg-ti"> Messages</p>
          </div>
          <div>
            <p className="fix-msg">
              {" "}
              I notice everything but I just don't speak on it!
            </p>
          </div>
          <div>
            <img
              style={{ width: "335px", height: "231px" }}
              src={MessagesImg}
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(Messages);
