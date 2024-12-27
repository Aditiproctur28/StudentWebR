import React, { Component } from "react";
import cal_icon from "../../../assets/timetable/calendar_icon11.png";
import { ErrorMessageHandling } from "../../../components/error";
import ErrorBackdrop from "../../../components/error_backdrop";
import api from "../../../api/api";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import moment from "moment";

class Month extends Component {
  constructor(props) {
    super(props);
    const { start_date, end_date } = props.selectedAcadYear ?? {};
    const isInCurrentAcademicYear = props.selectedAcadYear
      ? moment(new Date()).isBetween(start_date, end_date)
      : true;
    const AYStart = new Date(start_date);
    const AYEnd = new Date(end_date);
    const monthinit = isInCurrentAcademicYear
      ? new Date().getMonth()
      : AYStart.getMonth();
    const yearinit = isInCurrentAcademicYear
      ? new Date().getFullYear()
      : AYStart.getFullYear();
    const AYWiseDate = new Date(yearinit, monthinit);
    const today = new Date();

    this.state = {
      isInCurrentAcademicYear: isInCurrentAcademicYear,
      AYStart: AYStart,
      AYEnd: AYEnd,
      AYWiseDate: AYWiseDate,
      today: new Date(),
      calDaysArr: [],
      month_api_data: {},
      data: {},
      holidayData: {},
      if_day_clicked: true,
      clicked_date: -1,
      full_month_digit: NaN,
      show_clicked_day_bgcolor: true,
      dynamic_month: (isInCurrentAcademicYear ? today : AYWiseDate).getMonth(),
      dynamic_year: (isInCurrentAcademicYear
        ? today
        : AYWiseDate
      ).getFullYear(),
      month_length: 0,
      each_schedule_time: "",
      error_backdrop: false,
    };
  }

  /* {Object.keys(this.state.holidayData).map((index) => parseInt(index.split('-')[2])).includes(index) ?
                          this.state.holidayData[this.state.dynamic_year + '-' + this.state.full_month_digit + '-' + this.complete_digit_array[days]]?.filter((item) => item.event_type == 3).slice(0, 1).map(() => {
                            return (
                              <div>
                                <div>Weekly Off</div>
                              </div>)
                          }) : <div></div>
                        } */

  month_cal_month_skip_btn_check = 0;
  week_days = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };
  dict = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "June",
    6: "July",
    7: "Aug",
    8: "Sept",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  year_arr_full = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  complete_digit_array = {
    1: "01",
    2: "02",
    3: "03",
    4: "04",
    5: "05",
    6: "06",
    7: "07",
    8: "08",
    9: "09",
    10: "10",
    11: "11",
    12: "12",
    13: "13",
    14: "14",
    15: "15",
    16: "16",
    17: "17",
    18: "18",
    19: "19",
    20: "20",
    21: "21",
    22: "22",
    23: "23",
    24: "24",
    25: "25",
    26: "26",
    27: "27",
    28: "28",
    29: "29",
    30: "30",
    31: "31",
  };

  HandleErrorBackdrop = () => {
    this.setState({ error_backdrop: false });
    window.location = "/dashboard";
  };

  componentDidMount() {
    this.Cal();
    this.now();
  }
  render() {
    return (
      <>
        <div
          className="table_tt_month_view"
          onClick={() => {
            this.Cal();
          }}
        >
          {this.state.error_backdrop && (
            <ErrorBackdrop onCancel={this.HandleErrorBackdrop} />
          )}
          <div className="skip_d_months_container_tt2">
            <div className="skip_d_month_inner_container">
              <div className="skip_d_month_inner_container2">
                <div className="previous_n_next_month_tt2">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.back();
                    }}
                  >
                    <b style={{ color: "blue" }}>&lt;</b>{" "}
                  </div>
                </div>
                <div className="calendar_image_n_text_div_tt2">
                  <div className="calendar_image_div_tt2">
                    <div className="tt2_image">
                      <img src={cal_icon} />
                    </div>{" "}
                  </div>
                  <div className="calendar_text_div_tt2">
                    <div className="tt2_calender_text">
                      &nbsp; &nbsp;{this.dict[this.state.dynamic_month]}{" "}
                      {this.state.dynamic_year}{" "}
                    </div>
                  </div>
                </div>
                <div className="previous_n_next_month_tt2">
                  <div
                    onClick={() => {
                      this.next();
                    }}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {" "}
                    &gt;{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tt2_table_container">
            <table rules="none" className="tt_table_calendar2">
              <tr className="fixed_days_tr" style={{ height: "30px" }}>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="fixed_days_container">
                      <div className="fixed_days">Sunday</div>
                    </div>
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="fixed_days_container">
                      <div className="fixed_days">Monday</div>{" "}
                    </div>
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="fixed_days_container">
                      <div className="fixed_days">Tuesday</div>{" "}
                    </div>
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="fixed_days_container">
                      {" "}
                      <div className="fixed_days">Wednesday</div>{" "}
                    </div>
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="fixed_days_container">
                      {" "}
                      <div className="fixed_days">Thursday</div>{" "}
                    </div>
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="fixed_days_container">
                      <div className="fixed_days">Friday</div>{" "}
                    </div>
                  </div>
                </th>
                <th>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="fixed_days_container">
                      {" "}
                      <div className="fixed_days">Saturday</div>
                    </div>
                  </div>
                </th>
              </tr>
              {this.state.calDaysArr.map((weeks, index) => (
                <tr key={index}>
                  {weeks.map((days, index2) => (
                    <td
                      key={index2}
                      style={
                        this.state.show_clicked_day_bgcolor &&
                        this.state.clicked_date &&
                        this.state.if_day_clicked &&
                        Number(days) === Number(this.state.clicked_date)
                          ? { background: "rgb(220,220,220)" }
                          : {}
                      }
                      className={
                        Number(days) === new Date().getDate() &&
                        this.state.dynamic_month === new Date().getMonth() &&
                        "if_schedule_change_background_tt2_table"
                      }
                      onClick={() => {
                        this.setState({ show_clicked_day_bgcolor: true });
                        this.setState({ clicked_date: days });
                        this.setState({ if_day_clicked: true });
                        this.IfDayClicked(days, index2);
                      }}
                    >
                      <center>
                        <div className="days_n_schedule_tt2_container">
                          <div className="dates_tt2_table">
                            <div>
                              {this.state.holidayData[
                                this.state.dynamic_year +
                                  "-" +
                                  this.state.full_month_digit +
                                  "-" +
                                  this.complete_digit_array[days]
                              ] ? (
                                <div className="holiday_label"></div>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="days_tt2">{days}</div>
                          </div>
                          <div className="schedule_tt2_table_container">
                            <div className="schedule_digits_tt2">
                              {this.state.data[
                                this.state.dynamic_year +
                                  "-" +
                                  this.state.full_month_digit +
                                  "-" +
                                  this.complete_digit_array[days]
                              ]
                                ? this.state.data[
                                    this.state.dynamic_year +
                                      "-" +
                                      this.state.full_month_digit +
                                      "-" +
                                      this.complete_digit_array[days]
                                  ].length > 0 &&
                                  this.state.data[
                                    this.state.dynamic_year +
                                      "-" +
                                      this.state.full_month_digit +
                                      "-" +
                                      this.complete_digit_array[days]
                                  ].length
                                : ""}
                            </div>
                            <div className="schedule_text_tt2">
                              {this.state.data[
                                this.state.dynamic_year +
                                  "-" +
                                  this.state.full_month_digit +
                                  "-" +
                                  this.complete_digit_array[days]
                              ]
                                ? this.state.data[
                                    this.state.dynamic_year +
                                      "-" +
                                      this.state.full_month_digit +
                                      "-" +
                                      this.complete_digit_array[days]
                                  ] &&
                                  this.state.data[
                                    this.state.dynamic_year +
                                      "-" +
                                      this.state.full_month_digit +
                                      "-" +
                                      this.complete_digit_array[days]
                                  ].length &&
                                  this.state.data[
                                    this.state.dynamic_year +
                                      "-" +
                                      this.state.full_month_digit +
                                      "-" +
                                      this.complete_digit_array[days]
                                  ].length > 1
                                  ? "Schedules"
                                  : this.state.data[
                                      this.state.dynamic_year +
                                        "-" +
                                        this.state.full_month_digit +
                                        "-" +
                                        this.complete_digit_array[days]
                                    ] &&
                                    this.state.data[
                                      this.state.dynamic_year +
                                        "-" +
                                        this.state.full_month_digit +
                                        "-" +
                                        this.complete_digit_array[days]
                                    ].length &&
                                    this.state.data[
                                      this.state.dynamic_year +
                                        "-" +
                                        this.state.full_month_digit +
                                        "-" +
                                        this.complete_digit_array[days]
                                    ].length == 1
                                  ? "Schedule"
                                  : " "
                                : " "}
                            </div>
                          </div>
                        </div>
                      </center>
                    </td>
                  ))}
                </tr>
              ))}
            </table>
          </div>
        </div>
      </>
    );
  }

  //Callendar values.
  Cal = () => {
    var d = new Date(this.state.dynamic_year, this.state.dynamic_month, 1);
    var first = new Date(d.getFullYear(), d.getMonth(), 1);
    var first_day = first.getDay();
    var last = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    var last_day = last.getDay();
    var total_days_in_month = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    var total_days = total_days_in_month.getDate();
    this.setState({ month_length: total_days });
    let arr = [[], [], [], [], [], []];
    var date = 1;
    var index = 0;
    var loopcount = 1;
    var curr_arr_child = 0;

    while (loopcount <= 42) {
      if (index < first_day || date > total_days) {
        index++;
        arr[curr_arr_child].push("");
      } else if (index >= first_day && date <= total_days) {
        index++;
        arr[curr_arr_child].push(date);
        date++;
      }
      if (arr[curr_arr_child].length == 7) {
        curr_arr_child++;
      }
      loopcount++;
    }
    arr[5][0].length === 0 &&
      arr[5][1].length === 0 &&
      arr[5][2].length === 0 &&
      arr[5][3].length === 0 &&
      arr[5][4].length === 0 &&
      arr[5][5].length === 0 &&
      arr[5][6].length === 0 &&
      arr.pop();

    arr[4][0].length === 0 &&
      arr[4][1].length === 0 &&
      arr[4][2].length === 0 &&
      arr[4][3].length === 0 &&
      arr[4][4].length === 0 &&
      arr[4][5].length === 0 &&
      arr[4][6].length === 0 &&
      arr.pop();

    this.setState({ calDaysArr: arr });
  };

  now = () => {
    //This Month
    const { isInCurrentAcademicYear, today, AYWiseDate } = this.state;
    this.month_cal_month_skip_btn_check = "now";
    this.setState({ if_day_clicked: true });
    let dynamic_year = (
      isInCurrentAcademicYear ? today : AYWiseDate
    ).getFullYear();
    let dynamic_month = (
      isInCurrentAcademicYear ? today : AYWiseDate
    ).getMonth();
    let monthh_length = new Date(dynamic_year, dynamic_month + 1, 0).getDate();
    this.setState({ dynamic_month, dynamic_year });
    var full_month_digit = this.complete_digit_array[dynamic_month + 1];
    this.setState({ full_month_digit });
    var full_first_date_required =
      dynamic_year + "-" + (dynamic_month + 1) + "-" + "01";
    var full_last_date_required =
      dynamic_year + "-" + (dynamic_month + 1) + "-" + monthh_length;
    this.monthNowBackNextRepititveLOC(
      full_first_date_required,
      full_last_date_required
    );
    this.props.is_institute_type_school &&
      this.holidayEvent(full_first_date_required, full_last_date_required);
  };

  back = () => {
    //Previous Month
    const { isInCurrentAcademicYear, today, AYWiseDate, AYStart, AYEnd } =
      this.state;
    const prevMonthDate = new Date(
      this.state.dynamic_year,
      this.state.dynamic_month - 1
    ).getTime();
    if (prevMonthDate < AYStart.getTime()) {
      return;
    }
    this.month_cal_month_skip_btn_check = "back";
    let dynamic_month = 0;
    let dynamic_year = this.state.dynamic_year;

    if (this.state.dynamic_month == 0) {
      dynamic_month = 11;
      dynamic_year = this.state.dynamic_year - 1;
    } else {
      dynamic_month = this.state.dynamic_month - 1;
    }

    if (dynamic_month + 1 === new Date().getMonth() + 1) {
      this.setState({ if_day_clicked: true });
    } else {
      this.setState({ if_day_clicked: false });
    }

    let monthh_length = new Date(dynamic_year, dynamic_month + 1, 0).getDate();
    this.setState({ dynamic_month, dynamic_year });
    var full_month_digit = this.complete_digit_array[dynamic_month + 1];
    this.setState({ full_month_digit });
    var full_first_date_required =
      dynamic_year + "-" + (dynamic_month + 1) + "-" + "01";
    var full_last_date_required =
      dynamic_year + "-" + (dynamic_month + 1) + "-" + monthh_length;
    this.monthNowBackNextRepititveLOC(
      full_first_date_required,
      full_last_date_required
    );
    this.props.is_institute_type_school &&
      this.holidayEvent(full_first_date_required, full_last_date_required);
  };

  next = () => {
    //next month
    const { isInCurrentAcademicYear, today, AYWiseDate, AYStart, AYEnd } =
      this.state;
    const nextMonthDate = new Date(
      this.state.dynamic_year,
      this.state.dynamic_month + 1
    ).getTime();
    if (nextMonthDate > AYEnd.getTime()) {
      return;
    }
    this.month_cal_month_skip_btn_check = "next";
    let dynamic_month = 11;
    let dynamic_year = this.state.dynamic_year;
    if (this.state.dynamic_month == 11) {
      dynamic_month = 0;
      dynamic_year = this.state.dynamic_year + 1;
    } else {
      dynamic_month = this.state.dynamic_month + 1;
    }

    if (dynamic_month + 1 === new Date().getMonth() + 1) {
      this.setState({ if_day_clicked: true });
    } else {
      this.setState({ if_day_clicked: false });
    }
    let monthh_length = new Date(dynamic_year, dynamic_month + 1, 0).getDate();
    this.setState({ dynamic_month, dynamic_year });
    var full_month_digit = this.complete_digit_array[dynamic_month + 1];
    this.setState({ full_month_digit });
    var full_first_date_required =
      dynamic_year + "-" + (dynamic_month + 1) + "-" + "01";
    var full_last_date_required =
      dynamic_year + "-" + (dynamic_month + 1) + "-" + monthh_length;
    this.monthNowBackNextRepititveLOC(
      full_first_date_required,
      full_last_date_required
    );
    this.props.is_institute_type_school &&
      this.holidayEvent(full_first_date_required, full_last_date_required);
  };

  monthNowBackNextRepititveLOC(
    full_first_date_required,
    full_last_date_required
  ) {
    // Common code for previous,now and nex month
    this.props.setLoader(true);
    this.setState({ show_clicked_day_bgcolor: false });
    let request = {
      url: "/api/v2/timeTable/v3",
      token: this.props.student_auth,
      data:
        this.props.user_type != 99
          ? {
              batch_id: "-1",
              course_id: "-1",
              enddate: full_last_date_required,
              institute_id: this.props.institute_id,
              isCourseStructureTimeTable:
                this.props.inst_set_up.classes == "OFFLINE" ||
                this.props.inst_set_up.classes == "HYBRID_BLENDED"
                  ? "Y"
                  : "N",
              isExamIncludedInTimeTable:
                this.props.inst_set_up.exam == "OFFLINE" ||
                this.props.inst_set_up.exam == "HYBRID_BLENDED"
                  ? "Y"
                  : "N",
              is_included_online_class:
                this.props.inst_set_up.classes == "ONLINE" ||
                this.props.inst_set_up.classes == "HYBRID_BLENDED"
                  ? "Y"
                  : "N",
              is_included_online_exam:
                this.props.inst_set_up.exam == "ONLINE" ||
                this.props.inst_set_up.exam == "HYBRID_BLENDED"
                  ? "Y"
                  : "N",
              master_course: "",
              standard_id: "-1",
              startdate: full_first_date_required,
              subject_id: "-1",
              teacher_id: "-1",
              student_id: this.props.student_id,
            }
          : {
              batch_id: "-1",
              course_id: "-1",
              enddate: full_last_date_required,
              institute_id: this.props.institute_id,
              isCourseStructureTimeTable:
                this.props.inst_set_up.classes == "OFFLINE" ||
                this.props.inst_set_up.classes == "HYBRID_BLENDED"
                  ? "Y"
                  : "N",
              isExamIncludedInTimeTable:
                this.props.inst_set_up.exam == "OFFLINE" ||
                this.props.inst_set_up.exam == "HYBRID_BLENDED"
                  ? "Y"
                  : "N",
              is_included_online_class:
                this.props.inst_set_up.classes == "ONLINE" ||
                this.props.inst_set_up.classes == "HYBRID_BLENDED"
                  ? "Y"
                  : "N",
              is_included_online_exam:
                this.props.inst_set_up.exam == "ONLINE" ||
                this.props.inst_set_up.exam == "HYBRID_BLENDED"
                  ? "Y"
                  : "N",
              master_course: "",
              standard_id: "-1",
              startdate: full_first_date_required,
              subject_id: "-1",
              teacher_id: "-1",
              user_id: this.props.user_id,
            },
    };
    api
      .postAuth(request)
      .then((data) => {
        this.setState({ month_api_data: data });
        var short = data.data.result.batchTimeTableList;
        var ultimate_data = [];
        var minus_array_for_exact_days_schedules_count_in_open_user = [];
        var minus_count = 0;

        for (var r in short) {
          if (short[r] && short[r].length > 0) {
            minus_array_for_exact_days_schedules_count_in_open_user.push([]);
            for (var s in short[r]) {
              ultimate_data.push(short[r][s]);
            }
          }
        }
        this.Cal();
        this.setState({ data: data.data.result.batchTimeTableList });
        this.setState({ each_schedule_time: data.data.time });

        if (this.month_cal_month_skip_btn_check !== "now") {
          this.props.monthData(
            ultimate_data,
            -1,
            -1,
            this.state.dynamic_month,
            this.state.dynamic_year,
            data.data.time,
            data
          );
        } else {
          var clicked_day_data = [];
          var date = new Date().getDate();
          var index_of_week_dy = new Date().getDay();
          for (var r in short) {
            if (date === Number(r[8] + r[9])) {
              for (var s in short[r]) {
                clicked_day_data.push(short[r][s]);
              }
            }
          }
          this.props.monthData(
            clicked_day_data,
            date,
            this.week_days[index_of_week_dy],
            this.state.dynamic_month,
            this.state.dynamic_year,
            this.state.each_schedule_time,
            data
          );
        }
        this.props.setLoader(false);
      })
      .catch((error) => {
        this.props.setLoader(false);
        if (error && error.response && error.response.status == 403) {
          {
            this.props.dispatch({
              type: "LOGOUT",
              msg: error.response.data.message,
            });
          }
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message == "Please assign course!"
        ) {
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
          setTimeout(() => {
            window.location = "/dashboard";
          }, 2000);
          this.setState({ error_backdrop: true });
        } else {
          toast.error(ErrorMessageHandling(error));
        }
        this.Cal();
        this.setState({ data: {} });
        this.props.monthData(
          [],
          -1,
          -1,
          this.state.dynamic_month,
          this.state.dynamic_year,
          "",
          {}
        );
      });
  }

  holidayEvent(full_first_date_required, full_last_date_required) {
    let startdate = full_first_date_required;
    let enddate = full_last_date_required;

    function formatDate(date) {
      let parts = date.split("-");
      let year = parts[0];
      let month = String(parts[1]).padStart(2, "0"); // Add leading zero
      let day = String(parts[2]).padStart(2, "0"); // Add leading zero
      return `${year}-${month}-${day}`;
    }

    let formattedStartDate = formatDate(startdate);
    let formattedEndDate = formatDate(enddate);

    let request = {
      url: "/api/v1/holiday_manager/event_for_timetable ",
      token: this.props.student_auth,
      data: {
        institution_id: this.props.institute_id,
        year: formattedStartDate.slice(0, 4),
        student_id: this.props.student_id,
        event_start_Date: formattedStartDate,
        event_end_date: formattedEndDate,
      },
    };
    api
      .postAuth(request)
      .then((res) => {
        const transformedData = this.transformList(res.data); //fill multiple days event to respective dates
        this.setState({
          holidayData: { ...this.state.holidayData, ...transformedData },
        });
      })
      .catch((error) => {
        if (error && error.response && error.response.status == 403) {
          {
            this.props.dispatch({
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
          this.setState({ error_backdrop: true });
        } else {
          toast.error(ErrorMessageHandling(error));
        }
      });
  }
  transformList = (list) => {
    let tempList = JSON.parse(JSON.stringify(list));
    for (const key in list) {
      list[key].forEach((val, ind) => {
        if (val.event_date_range?.trim().includes(" ")) {
          // it is multi day event
          const eventToBePushed = val;
          const dateRange = val.event_date_range.split(" ");
          let start = dateRange[0];
          let end = dateRange[2];
          const eventDates = this.getDatesBetween(start, end);
          tempList = this.getAppendedEvents(
            tempList,
            eventDates,
            eventToBePushed
          );
        }
      });
    }
    return tempList;
  };

  getAppendedEvents = (tempArr, eventDates, eventToBePushed) => {
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

  getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = moment(startDate);

    while (currentDate.isSameOrBefore(endDate, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    return dates;
  };

  IfDayClicked(date, index_of_week_day) {
    var clicked_day_data = [];
    var short = this.state.data;
    for (var r in short) {
      if (date === Number(r[8] + r[9])) {
        for (var s in short[r]) {
          clicked_day_data.push(short[r][s]);
        }
      }
    }
    this.props.monthData(
      clicked_day_data,
      date,
      this.week_days[index_of_week_day],
      this.state.dynamic_month,
      this.state.dynamic_year,
      this.state.each_schedule_time,
      this.state.month_api_data
    );
  }
}
const mapStateToProps = (state) => {
  const {
    is_institute_type_school,
    student_auth,
    user_type,
    institute_id,
    inst_set_up,
    user_id,
    student_id,
    selectedAcadYear,
  } = state.auth;
  return {
    is_institute_type_school,
    student_auth,
    user_type,
    institute_id,
    inst_set_up,
    user_id,
    student_id,
    selectedAcadYear,
  };
};
export default connect(mapStateToProps)(Month);
