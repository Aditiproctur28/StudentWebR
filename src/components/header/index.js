import React, { useState, useEffect } from "react";
import Notification from "../../assets/header/msg.svg";
import Dasboard from "../../assets/header/dasboard.svg";
import MyExam from "../../assets/header/myexam.svg";
import StudyMaterial from "../../assets/header/Study Material.svg";
import Help from "../../assets/header/help.svg";
import Linkdin from "../../assets/header/linkdin.svg";
import LiveClass from "../../assets/header/Live_Classes.svg";
import Assignment from "../../assets/header/Assingment.svg";
import TimeTable from "../../assets/header/Time Table.svg";
import Document from "../../assets/header/documents.svg";
import Products from "../../assets/header/products.svg";
import Facebook from "../../assets/header/Facebook.svg";
import Whatsapp from "../../assets/header/whatsapp.svg";
import Youtube from "../../assets/header/youtube.svg";
import instagram from "../../assets/header/instagram.svg";
import ExamReport from "../../assets/header/examreportimg.svg";
import Twitter from "../../assets/header/twitter.png";
import Event from "../../assets/header/Event.png";
import Profile_page from "./profile";
import { connect } from "react-redux";
import imgprofile from "../../assets/profile/profile_image2.png";
import filter from "../../assets/header/filter.png";
import config from "../../config";
import "./header.css";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [FilterAcdmicYr, setFilterAcdmicYr] = useState([]);
  const {
    user_type,
    inst_set_up,
    parentslogin,
    enable_eLearn_feature,
    enable_online_assignment_feature,
    is_institute_type_school,
    institute_name,
    help_url,
    photo_url,
    fg_page_url,
    linkedin_url,
    whatsapp_url,
    youtube_url,
    instagram_url,
    acad_year_list,
    student_acad_year,
    selectedAcadYear,
    selectedAcadYrId,
    dispatch,
  } = props;
  let path = "";
  if (window.location.host == "localhost:3000") {
    path = `http://localhost:3000`;
  } else {
    // path = `https://` + window.location.host;
    path = `https://` + window.location.host;
  }

  const list =
    user_type == 99
      ? [
          {
            link: "/dashboard",
            text: "Home",
            icon: Dasboard,
            show: true,
          },
          {
            link: "/timetable",
            text: "Time Table",
            icon: TimeTable,
            show: true,
          },
          {
            link: "/studymaterial",
            text: "Study Materials",
            icon: StudyMaterial,
            show:
              (inst_set_up.file_manager_study_material == "STUDY_MATERIAL" ||
                inst_set_up.file_manager_study_material == "BOTH") &&
              !parentslogin,
          },

          {
            link: "/live",
            text: "Live Classes",
            icon: LiveClass,
            show:
              inst_set_up.classes == "ONLINE" ||
              inst_set_up.classes == "HYBRID_BLENDED",
          },
          {
            link: "/exam",
            text: "My Exam",
            icon: MyExam,
            show:
              inst_set_up.exam == "ONLINE" ||
              inst_set_up.exam == "HYBRID_BLENDED",
          },
          {
            link: "/report",
            text: "Exam Reports",
            icon: ExamReport,
            show:
              inst_set_up.exam == "ONLINE" ||
              inst_set_up.exam == "OFFLINE" ||
              inst_set_up.exam == "HYBRID_BLENDED",
          },
          {
            link: "/document",
            text: "Documents",
            icon: Document,
            show:
              (inst_set_up.file_manager_study_material == "FILE_MANEGER" ||
                inst_set_up.file_manager_study_material == "BOTH") &&
              !parentslogin,
          },

          {
            link: "/product",
            text: "My Products",
            icon: Products,
            show: props.inst_set_up.store,
          },
        ]
      : [
          {
            link: "/dashboard",
            text: "Home",
            icon: Dasboard,
            show: true,
          },
          {
            link: "/timetable",
            text: "Time Table",
            icon: TimeTable,
            show: true,
          },

          {
            link: "/studymaterial",
            text: "Study Materials",
            icon: StudyMaterial,
            show:
              (inst_set_up.file_manager_study_material == "STUDY_MATERIAL" ||
                inst_set_up.file_manager_study_material == "BOTH") &&
              !parentslogin,
          },

          {
            link: "/live",
            text: "Live Classes",
            icon: LiveClass,
            show:
              inst_set_up.classes == "ONLINE" ||
              inst_set_up.classes == "HYBRID_BLENDED",
          },

          {
            link: "/exam",
            text: "My Exam",
            icon: MyExam,
            show:
              inst_set_up.exam == "ONLINE" ||
              inst_set_up.exam == "HYBRID_BLENDED",
          },
          {
            link: "/report",
            text: "Exam Reports",
            icon: ExamReport,
            show:
              inst_set_up.exam == "ONLINE" ||
              inst_set_up.exam == "OFFLINE" ||
              inst_set_up.exam == "HYBRID_BLENDED",
          },

          {
            link: "/document",
            text: "Documents",
            icon: Document,
            show:
              (inst_set_up.file_manager_study_material == "FILE_MANEGER" ||
                inst_set_up.file_manager_study_material == "BOTH") &&
              !parentslogin,
          },

          {
            link: "/assignment",
            text: is_institute_type_school ? "Homework" : "Assignments",
            icon: Assignment,
            show: enable_online_assignment_feature,
          },

          {
            link: "/product",
            text: "My Products",
            icon: Products,
            show: props.inst_set_up.store,
          },

          {
            link: "/eventCalender",
            text: "Event Calender",
            icon: Event,
            show: is_institute_type_school,
          },
        ];

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const checkURL = (url) => {
    if (url.includes("http") || url.includes("https")) {
      return url;
    } else {
      return "https://" + url;
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    try {
      if (config.env == "prod") {
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-SYMKRC0C5B";
        script.async = true;
        document.head.appendChild(script);
        eval(
          "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}  gtag('js', new Date()); gtag('config', 'G-SYMKRC0C5B');"
        );
      } else {
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-7NENVW1MR5";
        script.async = true;
        document.head.appendChild(script);
        eval(
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-7NENVW1MR5');"
        );
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const studentAcadYears = student_acad_year.map((item) => item.acad_yr_name);
    const filteredAcadYears = acad_year_list.filter((year) =>
      studentAcadYears.includes(year.inst_acad_year)
    );

    setFilterAcdmicYr(filteredAcadYears);
  }, [acad_year_list]);

  const SetAcdmicYr = () => {
    let getObject = acad_year_list?.find((item, ind) => {
      return item.inst_acad_year_id == selectedAcadYrId;
    });

    dispatch({
      type: "SWITCH_ACAD_YEAR",
      acadYearObj: getObject,
      dashNavigate: () => ({}),
    });
  };

  useEffect(() => {
    if (Boolean(is_institute_type_school)) {
      SetAcdmicYr();
    }
  }, []);

  return (
    <>
      <div className="header_container">
        <div className="header_top">
          <div className="header_top_left">
            <div className="header_top_left_text">
              <p style={{ fontWeight: "bold" }}>{institute_name}</p>
            </div>
          </div>
          <div className="header_top_right">
            {Boolean(is_institute_type_school) && FilterAcdmicYr.length > 0 && (
              <div className="header_doc-filter-dropdown">
                <img src={filter} height={15} width={15} />
                <select
                  name="academic year"
                  onChange={(e) => {
                    if (selectedAcadYrId != 0) {
                      dispatch({
                        type: "UNSET_ACAD_YEAR_ID",
                      });
                    }
                    dispatch({
                      type: "SWITCH_ACAD_YEAR",
                      acadYearObj: JSON.parse(e.target.value),
                      dashNavigate: () =>
                        (window.location.href = `${path}/dashboard`),
                    });
                  }}
                  value={JSON.stringify(selectedAcadYear)}
                >
                  {FilterAcdmicYr.map((item, ind) => (
                    <option key={ind} value={`${JSON.stringify(item)}`}>
                      {item.inst_acad_year}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div style={{ marginRight: "26px", cursor: "pointer" }}>
              {help_url && (
                <a
                  onClick={() => {
                    window.open(checkURL(help_url));
                  }}
                >
                  <img style={{ height: "35px", width: "35px" }} src={Help} />
                </a>
              )}
            </div>
            <div className="notification_div">
              <a
                style={{
                  border: "0",
                  outline: "0",
                  backgroundColor: "none",
                  cursor: "pointer",
                }}
                href={path + `/messages`}
              >
                <img
                  style={{ backgroundColor: "#fafafa" }}
                  src={Notification}
                />
              </a>
            </div>
            <div className="profile_div">
              <button onClick={togglePopup}>
                <img
                  style={{
                    border: "1px solid #0976B7",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    outline: "0",
                    backgroundColor: "0",
                  }}
                  src={photo_url ? photo_url : imgprofile}
                  width="20px"
                  height="15px"
                />
              </button>
              {isOpen && (
                <Profile_page setIsOpen={setIsOpen} handleClose={togglePopup} />
              )}
            </div>
          </div>
        </div>
        <div className="header_menubar">
          <div className="header_menu">
            {list.map((objLink, i) => {
              let current_url = window.location.href;
              const urlMatch = new RegExp(`^${path + objLink.link}`, "i");
              if (urlMatch.test(current_url)) {
                return (
                  objLink.show && (
                    <div className="menu_button_on_click" key={i}>
                      <a href={path + objLink.link}>
                        <div>
                          {" "}
                          <img src={objLink.icon} />
                        </div>
                        {objLink.text}{" "}
                      </a>{" "}
                    </div>
                  )
                );
              } else {
                return (
                  objLink.show && (
                    <div className="menu_button" key={i}>
                      <a href={path + objLink.link}>
                        <div>
                          {" "}
                          <img src={objLink.icon} />
                        </div>
                        {objLink.text}{" "}
                      </a>{" "}
                    </div>
                  )
                );
              }
            })}
          </div>
          <div className="header_social_icon">
            <div style={{ display: "flex", alignItems: "center" }}>
              {inst_set_up.twitter_url && (
                <a
                  onClick={() => {
                    window.open(checkURL(inst_set_up.twitter_url));
                  }}
                >
                  <img
                    style={{
                      height: "26px",
                      width: "26px",
                      background: "#FAFAFA",
                      borderRadius: "55%",
                    }}
                    src={Twitter}
                  />
                </a>
              )}
            </div>
            <div>
              {fg_page_url && (
                <a
                  onClick={() => {
                    window.open(checkURL(fg_page_url));
                  }}
                >
                  <img
                    style={{ height: "35px", width: "35px" }}
                    src={Facebook}
                  />
                </a>
              )}
            </div>
            <div>
              {linkedin_url && (
                <a
                  onClick={() => {
                    window.open(checkURL(linkedin_url));
                  }}
                >
                  <img
                    style={{ height: "35px", width: "35px" }}
                    src={Linkdin}
                  />
                </a>
              )}
            </div>
            <div>
              {whatsapp_url && (
                <a
                  onClick={() => {
                    window.open(checkURL(whatsapp_url));
                  }}
                >
                  <img
                    style={{ height: "35px", width: "35px" }}
                    src={Whatsapp}
                  />
                </a>
              )}
            </div>
            <div>
              {youtube_url && (
                <a
                  onClick={() => {
                    window.open(checkURL(youtube_url));
                  }}
                >
                  <img
                    style={{ height: "35px", width: "35px" }}
                    src={Youtube}
                  />
                </a>
              )}
            </div>
            <div>
              {instagram_url && (
                <a
                  onClick={() => {
                    window.open(checkURL(instagram_url));
                  }}
                >
                  <img
                    style={{ height: "35px", width: "35px" }}
                    src={instagram}
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  const {
    user_type,
    inst_set_up,
    parentslogin,
    enable_eLearn_feature,
    enable_online_assignment_feature,
    is_institute_type_school,
    institute_name,
    help_url,
    photo_url,
    fg_page_url,
    linkedin_url,
    whatsapp_url,
    youtube_url,
    instagram_url,
    acad_year_list,
    selectedAcadYear,
    selectedAcadYrId,
    student_acad_year,
  } = state.auth;
  return {
    user_type,
    inst_set_up,
    parentslogin,
    enable_eLearn_feature,
    enable_online_assignment_feature,
    is_institute_type_school,
    institute_name,
    help_url,
    photo_url,
    fg_page_url,
    linkedin_url,
    whatsapp_url,
    youtube_url,
    instagram_url,
    acad_year_list,
    selectedAcadYear,
    student_acad_year,
    selectedAcadYrId,
  };
};
const memoizedHeader = React.memo(Header);
export default connect(mapStateToProps)(memoizedHeader);
