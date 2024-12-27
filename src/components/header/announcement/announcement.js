import React from "react";
import "./announcement.css";
import { connect } from "react-redux";
import ClockImg from "../../../assets/dashboard/clockimg.png";
import Announce from "../../../assets/dashboard/announce.png";
import Calender from "../../../assets/dashboard/calender.png";
import Header from "../../header";
import attach from "../../../assets/dashboard/attach.png";
import timeIcon from "../../../assets/dashboard/time.png";
import Noannouncment from "../../../assets/dashboard/noAnnouncment.png";
import Nonotice from "../../../assets/dashboard/noNotice.png";
import AnnouncementMsg from "./announcmentmsg";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../api/api";
import { useEffect, useState } from "react";
import Banner from "./banner";
import Promo from "./promo";

const Announcement = (props) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const openUserUrl = `/api/v1/announcementBannerPromotion/fetchAnnouncementForStudent/${props.institute_id}?is_active=true`;
  const normalUserUrl = `/api/v1/announcementBannerPromotion/fetchAnnouncementForStudent/${
    props.institute_id
  }${props.student_id && `?student_id=${props.student_id}`}&is_active=true`;
  var today = new Date();
  var date =
    today.getDate() +
    "-" +
    monthNames[today.getMonth()] +
    "-" +
    today.getFullYear();
  let [time, setTime] = useState("");
  let [ampm, setAmpm] = useState("AM");
  const [data, setData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [showPromo, setShowPromo] = useState(false);
  const [promoData, setPromoData] = useState([]);
  const [openDetail, setOpenDetails] = useState(false);
  useEffect(() => {
    const timeout = setInterval(() => {
      let d = new Date(); //object of date()
      let hr = d.getHours();
      let min = d.getMinutes();
      let sec = d.getSeconds();
      let hr_rotation = 30 * hr + min / 2; //converting current time
      let min_rotation = 6 * min;
      let sec_rotation = 6 * sec;
      document.getElementById(
        "hour"
      ).style.transform = `rotate(${hr_rotation}deg)`;
      document.getElementById(
        "minute"
      ).style.transform = `rotate(${min_rotation}deg)`;
      document.getElementById(
        "second"
      ).style.transform = `rotate(${sec_rotation}deg)`;
      let hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
      let minn = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      let secc = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      var ampm = today.getHours() >= 12 ? "PM" : "AM";
      let time = hour + ":" + minn + ":" + secc;
      setTime(time);
      setAmpm(ampm);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    getAnnoucementData();
    if (props.auth?.inst_set_up?.is_marketing_and_banner) {
      getBannerPromoData();
    }
  }, []);

  const getBannerPromoData = () => {
    const isAlreadyLogin = localStorage.getItem("isAlreadyLogin");
    let request = {
      url: `/api/v1/banner-prom/for_student/${props.user_type}`,
      token: props.student_auth,
    };
    api
      .getAuth(request)
      .then((data) => {
        if (!isAlreadyLogin && data?.data.result.prom.length) {
          setShowPromo(true);
          localStorage.setItem("isAlreadyLogin", "true");
        }
        setBannerData(data?.data.result.banner?.slice(0, 5));
        setPromoData(data?.data.result.prom);
      })
      .catch((err) => {
        if (err && err.response && err.response.status == 403) {
          props.dispatch({ type: "LOGOUT", msg: err.response.data.message });
        }
      });
  };

  const getAnnoucementData = () => {
    let request = {
      url: props.user_type == 99 ? openUserUrl : normalUserUrl,
      token: props.student_auth,
    };
    api
      .getAuth(request)
      .then((data) => {
        setData(data?.data?.result);
        // setflag(false)
      })
      .catch((err) => {
        // setflag(false)

        if (err && err.response && ((err.response.status == 403)||(err.response.status == 400))) {
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
          // toast.error(err.response.data.message)
        } else {
          // toast.error(ErrorMessageHandling(err));
        }
      });
  };

  const formatAMPM = (data) => {
    let dateloc = new Date(data);
    let hours = dateloc.getHours();
    let minutes = dateloc.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  };

  function formatDate(da) {
    let date = new Date(da);
    return (
      date.getDate() +
      "-" +
      parseInt(date.getMonth() + 1) +
      "-" +
      date.getFullYear()
    );
  }

  return (
    <>
      <div className="Header-div">
        <Header />
      </div>
      {openDetail == false && (
        <div className="mainDiv">
          <div className="leftDiv">
            {props.auth?.inst_set_up?.is_marketing_and_banner &&
              bannerData?.length > 0 && (
                <div className="contentBox mb-10">
                  <div className="bannerBox">
                    <Banner bannerData={bannerData} />
                  </div>
                </div>
              )}
            {props.auth?.inst_set_up?.is_marketing_and_banner && (
              <Promo
                showPromo={showPromo}
                setShowPromo={setShowPromo}
                promoData={promoData}
              />
            )}

            <div
              className="contentBox"
              style={
                bannerData?.length > 0 ? { height: "44vh" } : { height: "72vh" }
              }
            >
              <div className="clockmain">
                <div className="clock-student-homepage-announcment">
                  <div className="wrap-student-homepage-announcment">
                    <span
                      id="hour"
                      className="hour-student-homepage-announcment"
                    ></span>
                    <span
                      className="minute-student-homepage-announcment"
                      id="minute"
                    ></span>
                    <span
                      className="second-student-homepage-announcment "
                      id="second"
                    ></span>
                    <span className="dot-student-homepage"></span>
                    <span className="mark-time-6-student-homepage"></span>
                    <span className="mark-time-12-student-homepage"></span>
                    <span className="mark-time-3-student-homepage"></span>
                    <span className="mark-time-9-student-homepage"></span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "-84px" }}>
                <img height={150} width={350} src={ClockImg} />
              </div>
              {bannerData?.length < 1 && (
                <div className="timeDiv">
                  <div style={{ display: "flex" }}>
                    <h3>{time}</h3> <sup className="subdata">{ampm}</sup>
                  </div>
                  <p className="dateandtime">{date}</p>
                </div>
              )}
            </div>
          </div>
          <div className="rightDiv">
            <div className="announsmenttop">
              <div>
                <p className="announsmenttitle ">
                  {" "}
                  {props.is_institute_type_school
                    ? "Notice Board"
                    : "Announcement"}
                </p>
                <p className="announsmentdiscription">
                  Spread the word to Users
                </p>
              </div>
              <img width={120} src={Announce} />
            </div>
            <div className="divider"></div>
            {data.length > 0 && (
              <div className="containMaindiv">
                {data?.map((item, index) => (
                  <div className="containDiv">
                    <div style={{ width: "100%" }}>
                      <div>
                        {item?.batch_sec_names?.split(",")?.map((item, ind) => (
                          <p className="batchName">{item}</p>
                        ))}
                      </div>

                      <div>
                        <p className="title">{item?.ancmnt_title} </p>
                        <p className="admintype">{item?.updated_by}</p>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></div>
                      <div style={{ display: "flex", marginTop: "11px" }}>
                        <div
                          style={{
                            display: "flex",
                            width: "40%",
                            alignItems: "center",
                          }}
                        >
                          <img height={12} width={12} src={Calender} />
                          <p className="datetime">
                            {formatDate(item?.announced_date)}
                          </p>
                        </div>
                        <p
                          style={{
                            marginRight: "11px",
                            display: "flex",
                            alignItems: "center",
                            fontStyle: "bold",
                          }}
                        >
                          •
                        </p>
                        <div
                          style={{
                            display: "flex",
                            width: "45%",
                            alignItems: "center",
                          }}
                        >
                          <img height={12} width={12} src={timeIcon} />
                          <p className="datetime">{item?.announced_time}</p>
                        </div>
                        {item?.announcement_img_url !== null && (
                          <div>
                            <img
                              className="attachimgdiv"
                              src={attach}
                              onClick={() => {
                                window.open(item?.announcement_img_url);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data.length == 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "43vh",
                }}
              >
                <img
                  style={{ height: "30vh", width: "100%" }}
                  src={
                    props.is_institute_type_school ? Nonotice : Noannouncment
                  }
                />
              </div>
            )}
            {data.length > 0 && (
              <div className="buttombutton">
                <button
                  onClick={() => {
                    setOpenDetails(true);
                  }}
                >
                  {" "}
                  View All
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {openDetail == true && (
        <div>
          <AnnouncementMsg dat={data} propsdata={props} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    institute_id,
    student_id,
    user_type,
    student_auth,
    is_institute_type_school,
  } = state.auth;
  return {
    institute_id,
    student_id,
    user_type,
    student_auth,
    is_institute_type_school,
  };
};
export default connect(mapStateToProps)(Announcement);
