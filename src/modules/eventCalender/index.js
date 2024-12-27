import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Calender from "./calender";
import { connect } from "react-redux";
import api from "../../api/api";
import Loader from "../../components/loader";
import EventPopup from "./eventPopup";
import MorePopup from "./morePopup";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { ErrorMessageHandling } from "../../components/error";
import moment from "moment";

const EventCalender = (props) => {
  const { start_date, end_date } = props.selectedAcadYear ?? {};
  const isInCurrentAcademicYear = props.selectedAcadYear
    ? moment(new Date()).isBetween(start_date, end_date)
    : true;
  const [status, setstatus] = useState("My Event");
  const [loaderflag, setloaderflag] = useState(false);
  const [calData, setCaldata] = useState({});
  const [date, setdate] = useState("");
  const [dateindex, setdateindex] = useState("");

  const [monthinit, setmonthinit] = useState(
    isInCurrentAcademicYear
      ? new Date().getMonth()
      : new Date(start_date).getMonth()
  );
  const [yearinit, setyearinit] = useState(
    isInCurrentAcademicYear
      ? new Date().getFullYear()
      : new Date(start_date).getFullYear()
  );
  const [dataDateWise, setDataDateWise] = useState([]);
  const [weeklyoff, setweeklyoff] = useState("");
  const [isopenPopup, closeisopenPopup] = useState(false);
  const [morePopup, setmorePopup] = useState(false);
  const [itemdata, setitemdata] = useState([]);

  useEffect(() => {
    fetchCalendarData(monthinit, yearinit);
  }, [status]);

  const fetchCalendarData = (month, year) => {
    setloaderflag(true);
    let request = {
      url: "/api/v1/holiday_manager/getDetail",
      token: props.student_auth,
      data: {
        institution_id: props.institute_id,
        month: month + 1,
        year: year,
        student_id: props.student_id,
        is_all_event_for_student: status == "My Event" ? false : true,
        event_type: 0,
        search_date: null,
        is_yearly_view: false,
      },
    };
    api
      .postAuth(request)
      .then((res) => {
        const transformedData = transformList(res.data); //fill multiple days event to respective dates
        setCaldata(transformedData);
        setloaderflag(false);
      })
      .catch((error) => {
        setloaderflag(false);
        if (error && error.response && error.response.status == 403) {
          {
            props.dispatch({
              type: "LOGOUT",
              msg: error.response.data.message,
            });
          }
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            window.location = "/dashboard";
          }, 2000);
        } else {
          toast.error(ErrorMessageHandling(error));
        }
      });
  };

  const transformList = (list) => {
    let tempList = JSON.parse(JSON.stringify(list));
    for (const key in list) {
      list[key].forEach((val, ind) => {
        if (val.event_date_range?.trim().includes(" ")) {
          // it is multi day event eg. "Mon,17-Jul-2023 - Wed,19-Jul-2023"
          const eventToBePushed = val;
          const dateRange = val.event_date_range.split(" ");
          let start = dateRange[0].split(",")[1];
          let end = dateRange[2].split(",")[1];
          const eventDates = getDatesBetween(start, end);
          tempList = getAppendedEvents(tempList, eventDates, eventToBePushed);
        }
      });
    }
    return tempList;
  };

  const getAppendedEvents = (tempArr, eventDates, eventToBePushed) => {
    let tempArrRes = JSON.parse(JSON.stringify(tempArr));
    eventDates.forEach((item, i) => {
      if (i > 0) {
        if (Boolean(tempArrRes[item]?.length)) {
          tempArrRes[item].push(eventToBePushed);
        } else {
          tempArrRes[item] = [];
          tempArrRes[item].push(eventToBePushed);
        }
      }
    });
    return tempArrRes;
  };

  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    return dates;
  };

  return (
    <>
      {loaderflag && <Loader />}
      <ToastContainer />
      <Header />
      <Calender
        status={status}
        setstatus={setstatus}
        calData={calData}
        isInCurrentAcademicYear={isInCurrentAcademicYear}
        setDataDateWise={setDataDateWise}
        fetchCalendarData={fetchCalendarData}
        date={date}
        setdate={setdate}
        dateindex={dateindex}
        yearinit={yearinit}
        monthinit={monthinit}
        setdateindex={setdateindex}
        isopenPopup={isopenPopup}
        closeisopenPopup={closeisopenPopup}
        setmonthinit={setmonthinit}
        setyearinit={setyearinit}
        weeklyoff={weeklyoff}
        setweeklyoff={setweeklyoff}
      />
      {isopenPopup && (
        <EventPopup
          closeisopenPopup={closeisopenPopup}
          dataDateWise={dataDateWise}
          setmorePopup={setmorePopup}
          setitemdata={setitemdata}
          date={date}
          dateindex={dateindex}
          weeklyoff={weeklyoff}
        />
      )}
      {morePopup && (
        <MorePopup
          setmorePopup={setmorePopup}
          itemdata={itemdata}
          date={date}
          dateindex={dateindex}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  const { student_auth, institute_id, student_id, selectedAcadYear } =
    state.auth;
  return { student_auth, institute_id, student_id, selectedAcadYear };
};

export default connect(mapStateToProps)(EventCalender);
