import React, { useEffect, useState } from "react";
import Calender from "../../../../assets/dashboard/calenderwhite.png";
import ClockImg from "../../../../assets/dashboard/timewhite.png";
import AnnouncmentImg from "../../../../assets/dashboard/Announcments.png";
import SearchImg from "../../../../assets/search/searchbar.png";
import Png from "../../../../assets/dashboard/png.png";
import Download from "../../../../assets/dashboard/download.png";
import NoDataFound from "../../../../assets/dashboard/noDatafound.png";
import "./announcmentmsg.css";

const AnnouncementMsg = (props) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [data, setData] = useState(props.dat);
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

  function Search(dataa) {
    let data = [];
    props?.dat?.forEach((element) => {
      if (
        element?.ancmnt_title
          .toString()
          .toLowerCase()
          .includes(dataa.toString().toLowerCase()) ||
        element?.description
          .toString()
          .toLowerCase()
          .includes(dataa.toString().toLowerCase()) ||
        element?.updated_by
          .toString()
          .toLowerCase()
          .includes(dataa.toString().toLowerCase()) ||
        element?.announced_date
          .toString()
          .toLowerCase()
          .includes(dataa.toString().toLowerCase()) ||
        formatAMPM(element?.updated_date).includes(
          dataa.toString().toLowerCase()
        )
      ) {
        data.push(element);
      }
    });
    setData(data);
  }

  const returnDayName = (date) => {
    let day = new Date(date).getDay();
    let today = new Date().getDay();
    if (
      day == today &&
      new Date().toLocaleDateString() == new Date(date).toLocaleDateString()
    ) {
      return "Today";
    } else {
      return days[day];
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ display: "none" }}>
        <span id="hour" class="hour-student-homepage-announcment"></span>
        <span class="minute-student-homepage-announcment" id="minute"></span>
        <span class="second-student-homepage-announcment " id="second"></span>
      </div>

      <div className="msgHeader">
        <p>
          {props.propsdata.is_institute_type_school
            ? "NOTICE BOARD"
            : "ANNOUNCEMENT"}
        </p>
        <div className="Searchbar">
          <form className="form_Style" onSubmit={(e) => e.preventDefault()}>
            <input
              className="Search_Input"
              type="text"
              placeholder="Search"
              onChange={(e) => Search(e.target.value)}
            />
            <button className="Searchbutton">
              <img src={SearchImg} />
            </button>
          </form>
        </div>
      </div>
      <div className="mainDiv">
        <div className="leftDivAnnouncmetMsg">
          {data?.length == 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <p style={{ marginBottom: "35px" }}>No Record found !</p>
              <img style={{ height: "30vh", width: "30%" }} src={NoDataFound} />
            </div>
          )}
          {data?.length > 0 &&
            data?.map((item, index) => (
              <div>
                <div className="msgdateborder">
                  <div className="msg_days_label_announcmentmsg">
                    <div className="msg_days_label_days">
                      <p>{returnDayName(item?.announced_date)}</p>
                    </div>
                    <div className="verticalline"></div>
                    <div style={{ marginLeft: "8px", marginRight: "8px" }}>
                      <img height={12} width={12} src={Calender} />
                    </div>
                    <div className="msg_days_label_dates">
                      <p>{formatDate(item?.announced_date)}</p>
                    </div>
                    <p
                      style={{
                        marginRight: "11px",
                        marginTop: "-3px",
                        fontStyle: "bold",
                        color: "#FAFAFA",
                      }}
                    >
                      •
                    </p>
                    <div style={{ marginRight: "8px" }}>
                      <img height={12} width={12} src={ClockImg} />
                    </div>

                    <div className="msg_days_label_dates">
                      <p>{item?.announced_time}</p>
                    </div>
                  </div>
                  <div className="line_div"></div>
                </div>
                <div>
                  {item?.batch_sec_names?.split(",")?.map((itemdata, ind) => (
                    <p className="batchName">{itemdata}</p>
                  ))}
                </div>
                <div>
                  <p className="msgtitle">{item?.ancmnt_title}</p>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <p className="msgByAdmin"> by {item?.updated_by}</p>
                </div>
                <div className="stateLine"></div>
                <div
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></div>
                {item?.announcement_img_url && (
                  <div
                    className="ImageDiv"
                    onClick={() => window.open(item?.announcement_img_url)}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img height={16} width={13} src={Png} />
                      <p> {item.file_name}</p>
                    </div>
                    <img
                      style={{ marginLeft: "8px" }}
                      height={16}
                      width={13}
                      src={Download}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="rightDivAnnouncmentMsg">
          <div className="announcmentTitle">
            <p>
              {props.propsdata.is_institute_type_school
                ? "NOTICE BOARD"
                : "ANNOUNCEMENT"}
            </p>
          </div>
          <div className="announcmentDesc">
            <p>
              Be like an announcement, <br></br>Stick to a thing untill you are
              there.
            </p>
          </div>
          <div className="announcmentDiv">
            <img height={215} width={215} src={AnnouncmentImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementMsg;
