import React, { Component } from "react"
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment';
import api from '../../api/api';
import "../../css/liveclass/liveClass_module.css";
import Search from '../../components/Search/Search';
import img6 from '../../assets/liveclass/img6.png';
import img7 from '../../assets/liveclass/img7.png';
import Upcoming_Classes from './Upcoming_Classes/Upcoming_Classes';
import Past_Classes from "./Past_Classes/Past_Classes";
import { connect } from 'react-redux';
import Header from '../../components/header';
import Loader from "../../components/loader";
import { ToastContainer, toast } from 'react-toastify';
import { ErrorMessageHandling } from '../../components/error';
import 'react-toastify/dist/ReactToastify.css';
class LiveClasses extends Component {
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  allupcomingclassdate = [];
  pastClasses = [];
  pastClassesData = [];
  faculityname = new Set();
  coursename = new Set();



  state = {
    firstdate: new Date(moment({ day: 1 })),
    seconddate: new Date(),
    toDate: new Date(moment({ day: 1 })),
    fromDate: new Date(),
    viewCalender: "Hide",
    no_class: "class_status",
    show_class: "Todays_Classess",
    upcoming_data: [],
    past_data: [],
    unique_date: [],
    view_proctur_live_recorded_session: "",
    vimeo_video_downlodable: "",
    proctur_live_view_or_download_visibility: '',
    flag: false,
    Search: "",
    student: [],
    search_class: [],
    show_lable: true

  }
  Loaderfunc = (data) => {
    this.setState({ flag: data })
  }
  toggleSearch = (value) => {
    this.setState({ Search: value })
  }

onUpcomingApiCalling =(fromDateSet, toDateSet)=>{
  this.setState({ flag: true })
  let request = {
    url: '/api/v1/meeting_manager/getMeetingV2/' + this.props.auth.institute_id,
    token: this.props.auth.student_auth,
    data: {
      institution_id: this.props.auth.institution_id,
      user_id: this.props.auth.user_id,
      page_offset: 0,
      page_size: -1,
      live_future_past: 3
      , "category": 3,
      "from_date": moment(new Date(fromDateSet)).format("DD-MM-YYYY"),
      "to_date":  toDateSet != "" ? moment(new Date(toDateSet)).format("DD-MM-YYYY") : null
    }
  }
  api.postAuth(request).then(data => {
    this.setState({ flag: false })
    this.setState({ upcoming_data: data.data.upcomingLiveClasses });
    this.addingUngoingClassData(data.data.upcomingLiveClasses)
    this.setState({ search_class: this.state.upcoming_data })

  }).catch((err) => {
    this.setState({ flag: false })
    if (err && err.response && err.response.status == 403) {
      { this.props.dispatch({ type: 'LOGOUT', msg: err.response.data.message }) }
    } else if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message)
    } else {
      toast.error("Network error");
    }

  })
}

  onDatefilterApiCalling = (from_date, to_date) => {
    this.setState({ flag: true })
    let request = {
      url: '/api/v1/meeting_manager/getMeetingV2/' + this.props.auth.institute_id,
      token: this.props.auth.student_auth,
      data: {
        institution_id: this.props.auth.institution_id,
        user_id: this.props.auth.user_id,
        page_offset: 0,
        page_size: -1,
        live_future_past: 3,
        "category": 3,
        "from_date": moment(new Date(from_date)).format("DD-MM-YYYY"),
        "to_date": to_date != "" ? moment(new Date(to_date)).format("DD-MM-YYYY") : null
      }
    }
    api.postAuth(request).then(data => {
      data && this.setState({ flag: false })
      this.setState({ past_data: data.data.pastLiveClasses });
      this.setState({ view_proctur_live_recorded_session: data.data.view_proctur_live_recorded_session })
      this.setState({ vimeo_video_downlodable: data.data.vimeo_video_downlodable })
      this.setState({ proctur_live_view_or_download_visibility: data.data.proctur_live_view_or_download_visibility })
      this.addingPastClassdata(this.state.past_data)

    }).catch((err) => {
      this.setState({ flag: false })
      if (err && err.response && err.response.status == 403) {
        this.props.dispatch({ type: 'LOGOUT', msg: err.response.data.message })
        // { this.props.dispatch({ type: 'LOGOUT' }) }
      } else if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message)
      } else {

        toast.error(ErrorMessageHandling(err))
      }

    })
  }
  onSerach = (text) => {
    let course_name = ''
    if (text.trim().length !== 0) {
      let temp = ((this.state.show_class == "UpComing_Classes" || this.state.show_class == "Todays_Classess") ? this.state.upcoming_data : this.state.past_data).filter(function (el) {
        el.course_list.map((data, index) => {
          course_name = course_name + (data.course_name);
        })
        return el.end_datetime.toUpperCase().includes(text.toUpperCase()) ||
          ((course_name !== undefined && course_name !== null && course_name.toUpperCase().includes(text.toUpperCase())) || false) ||
          ((el.teachersName !== undefined && el.teachersName !== null && el.teachersName.toUpperCase().includes(text.toUpperCase())) || false) ||
          ((el.session_name !== undefined && el.session_name !== null && el.session_name.toUpperCase().includes(text.toUpperCase())) || false)

      }

      );
      if (this.state.show_class == "UpComing_Classes" || this.state.show_class == "Todays_Classess") {
        this.addingUngoingClassData(temp)
        this.setState({ search_class: temp })
      }
      else {
        this.addingPastClassdata(temp)
      }

    }
    else {
      if (this.state.show_class == "UpComing_Classes" || this.state.show_class == "Todays_Classess") {
        this.addingUngoingClassData(this.state.upcoming_data)
        this.setState({ search_class: this.state.upcoming_data })

      }
      else {
        this.addingPastClassdata(this.state.past_data)
      }

    }
  }
  course_name = (course) => {
    var course_name = ''
    course.map((key, index) => {
      if (index === 0) {
        course_name = course_name + "  " + key.course_name
      }
      else {
        course_name = course_name + " , " + key.course_name
      }
    })
    return course_name
  }



  UpcomingclsBtn = () => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.setState({ no_class: "class_status" })
    this.setState({ show_class: "UpComing_Classes" })
    this.setState({ Search: " " })
    this.onUpcomingApiCalling(tomorrow, "");
  }

  TodaysClsBtn = () => {
    this.setState({ show_class: "Todays_Classess" })
    this.setState({ Search: " " })
    this.onUpcomingApiCalling(new Date(), new Date());
  }

  PastclsBtn = () => {
    this.setState({ no_class: "Hide" })
    this.setState({ show_class: "Past_classes" })
    this.setState({ Search: " " })
    this.onDatefilterApiCalling(this.state.firstdate, this.state.seconddate);

  }

  changeDate = (e) => {
    if (e > new Date()) {
      toast.error("Start Date Should Be Less Then Or Equal To  Current Date .");
    }
    else {
      this.setState({ toDate: e })
    }
  }

  changeDate2 = (e) => {
    this.setState({ fromDate: e })
    // this.state.toDate = e;
  }
  ApplyDate = (to_date, from_date) => {
    this.setState({ firstdate: to_date })
    this.setState({ seconddate: from_date })
    this.setState({ show_lable: false })
  }


  changeCalender = () => {
    if (this.state.viewCalender === 'Hide') {
      this.setState({ viewCalender: 'Show' })
    }
    else {
      this.setState({ viewCalender: 'Hide' })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // check whether client has changed
    if (prevState.Search !== this.state.Search) {
      this.onSerach(this.state.Search)
    }
    if (prevState.firstdate !== this.state.firstdate || prevState.seconddate !== this.state.seconddate) {
      this.onDatefilterApiCalling(this.state.firstdate, this.state.seconddate)
    }

  }
  componentDidMount() {
    this.onUpcomingApiCalling(new Date(), new Date());
  }

  addingUngoingClassData = (data) => {
    this.allupcomingclassdate = []
    data.map((key, index) => {
      let str = key.start_datetime.split(' ');
      this.allupcomingclassdate.push(str[0]);
    })
    this.setState({ unique_date: [...new Set(this.allupcomingclassdate)] })

  }

  addingPastClassdata = (data) => {
    this.pastClasses = []
    data.map((data, index) => {
      let date = moment(data.startDateTime).format("DD-MM-YYYY");
      let tym = moment(data.startDateTime).format("hh:mm A")
      let cindex = this.pastClasses.findIndex(pdata => pdata.date == date);
      let diff = (data.endDateTime - data.startDateTime) / 60000;
      let day = moment(date, 'DD-MM-YYYY').format('dddd');
      let course = this.course_name(data.course_list)
      let clas = {
        session_name: data.session_name,
        time_duration: diff + " mins",
        time: tym,
        course_name: course,
        faculityImg: data?.t_photo_url,
        faculity_name: data?.teachersName ?? "",
        download_links: data.download_links
      }

      if (cindex == -1) {
        this.pastClasses = [...this.pastClasses, { day, date, classes: [clas] }]
      } else {
        this.pastClasses[cindex].classes.push(clas)

      }
    })
    this.setState({ student: this.pastClasses })
  }

  returnDayName = (date) => {
    let day = new Date(date).getDay();
    let today = new Date().getDay();
    if (day == today && new Date().toLocaleDateString() == new Date(date).toLocaleDateString()) {
      return 'Today';
    } else {
      return this.days[day];
    }
  }

  render() {

    return (<>
      <div className="liveclassescontainer">
        {(this.state.flag) && <Loader />}

        <Header />
        {/* // this is button bar */}
        <div className="button_bar">
          <div style={{ marginLeft: "32px", display: "flex", alignItems: "center" }}>
            <button className={this.state.show_class == "Todays_Classess" ? "active_button" : "inactive_button"} onClick={this.TodaysClsBtn}>Today's Classes </button>
            {/* <label className="live_class_label_first" onClick={this.UpcomingclsBtn}> {String(this.state.upcoming_data.length).padStart(1, '0')} </label> */}
          </div>
          <div style={{ marginLeft: "32px", display: "flex", alignItems: "center" }}>
            <button className={this.state.show_class == "UpComing_Classes" ? "active_button" : "inactive_button"} onClick={this.UpcomingclsBtn}>Upcoming Classes </button>
            {/* <label className="live_class_label_first" onClick={this.UpcomingclsBtn}> {String(this.state.upcoming_data.length).padStart(1, '0')} </label> */}
          </div>
          <div style={{ marginLeft: "40px", display: "flex", alignItems: "center" }}>
            <button className={this.state.show_class == "Past_classes" ? "active_button" : "inactive_button"} onClick={this.PastclsBtn}> Past Classes  </button>
            {/* <label className="live_class_label" onClick={this.PastclsBtn}>{String(this.state.past_data.length).padStart(1, '0')} </label> */}
          </div>
        </div>

        {/* this is selection bar */}

        <div className="selection_bar">
          <div className="selection_bar_left">{
            this.state.show_class == 'Past_classes' && <>
              <button onClick={this.changeCalender} className="select_date_to_date" ><img src={img6} /> <label > {moment(new Date(this.state.toDate)).format("DD-MM-YYYY")} <span className="to"> to </span> {moment(new Date(this.state.fromDate)).format("DD-MM-YYYY")} </label></button>
              <div className={this.state.viewCalender}>
                <div className="Calender_Only">
                  <div >
                    <Calendar value={this.state.toDate} onChange={this.changeDate} />

                    <button className="Cancle_Date_Button" onClick={this.changeCalender}>Cancel</button>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <Calendar value={this.state.fromDate} onChange={this.changeDate2} />
                    <button className="Apply_Date_Button" onClick={() => { this.ApplyDate(this.state.toDate, this.state.fromDate); this.changeCalender() }}>Apply</button>
                  </div>
                </div>
              </div>
            </>
          }
          </div>
          {/* search bar */}
          <div className="selection_bar_right">
            <Search Search={this.toggleSearch} In={2} />
          </div>
        </div>
        <div style={{ background: "#fafafa", paddingBottom: "50px" }}>
          {((this.state.upcoming_data.length == 0) || (this.state.unique_date.length == 0)) &&
            <div className={this.state.no_class}>
              <p className="class_status_p"> No Classes Available </p>
              <img src={img7} />


            </div>
          }
          {(this.state.upcoming_data.length !== 0) &&
            <div className={(this.state.show_class == "UpComing_Classes" || this.state.show_class == "Todays_Classess") ? "Upcoming_classes" : "Hide"} >
              {
                this.state.unique_date.map((key, index) =>
                (<Upcoming_Classes Loaderfunc={this.Loaderfunc} day={this.returnDayName(key)} date={key.split(' ', 1)} classes={this.state.search_class} />
                ))}

            </div>}
          <div className={this.state.show_class == "Past_classes" ? "show" : "Hide"}>
            {
              this.state.student.length > 0 &&
              <div className="class_found">
                <p> {this.state.past_data.length} past classes found </p>
              </div>
            }
            {
              this.state.student.length > 0 ?
                this.state.student.map((keys, index) => (
                  <Past_Classes day={keys.day}
                    keys={index}
                    date={keys.date}
                    classes={keys.classes}
                    view_proctur_live_recorded_session={this.state.view_proctur_live_recorded_session}
                    vimeo_video_downlodable={this.state.vimeo_video_downlodable}
                    proctur_live_view_or_download_visibility={this.state.proctur_live_view_or_download_visibility} />
                )) :

                <div className="class_status" >
                  <p className="class_status_p"> No Classes Available </p>
                  <img src={img7} />
                </div>

            }

          </div>
        </div>
      </div>
      <ToastContainer />
    </>)
  }
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(LiveClasses)
