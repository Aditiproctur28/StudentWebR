import React from "react";
import "./examBack.css";
import { connect } from "react-redux";
import ExamNav from "./examNav";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import api from "../../api/api";
import ExamBack from "./examBack";
import ExamSchedules from "./ExamCards";
import Loader from "../../components/loader";
import { ErrorMessageHandling } from "../../components/error";
import ErrorBackdrop from "../../components/error_backdrop";
import SearchImg from "../../assets/search/searchbar.png";
import Bookmarked from "./BookmarkCards";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      online_or_offline: "online",
      show_mock_practice_nav: true,
      is_schedules_view_open: false,
      bookmarks: false,
      examback_label_id: "",
      choose_btn_online_mock_or_practice: "",
      test_type_id_of_choose_online_btn: "",
      online_card_sch_test_id: "",
      element_object: {},
      online_card_sch_test_name: "",
      test_labels_data: {},
      offline_data: {},
      offline_label_array: [],
      offline_label_element: [],
      loader: false,
      loader2: false,
      total_schedules_digit: 0,
      online_testlabels_api_get_failed: false,
      label_id: -1,
      clicked_date: "",
      off_clicked_date: "",
      error_backdrop_on: false,
      offline_choose_btn: "analysis",
      search: "",
    };
  }

  componentDidMount() {
    if (this.state.online_or_offline === "online") {
      this.OnlineTestLabelsApi();
    }
  }

  render() {
    return (
      <>
        {this.state.error_backdrop_on && (
          <ErrorBackdrop onCancel={this.HandleErrorBackdrop} />
        )}
        {this.state.is_schedules_view_open === false &&
        this.state.bookmarks == false ? (
          <div>
            {this.state.loader && <Loader />}
            <ToastContainer />
            {/* =============================================EXAM NAV==================================================== */}
            <nav className="live">
              <div className="live-menu">
                {
                  // inst_set_up[1] if true then only show online exam
                  (this.props.auth.inst_set_up.exam == "ONLINE" ||
                    this.props.auth.inst_set_up.exam == "HYBRID_BLENDED") && (
                    <div
                      className="live-item"
                      onClick={() => {
                        this.setState({ online_or_offline: "online" });
                        this.setState({ show_mock_practice_nav: true });
                        this.OnlineTestLabelsApi();
                      }}
                    >
                      <div
                        className="live-links"
                        style={
                          this.state.online_or_offline === "online"
                            ? { borderBottom: "5px solid #1954E7" }
                            : {}
                        }
                      >
                        <span>Online</span>
                      </div>
                    </div>
                  )
                }

                {this.props.auth.user_type !== 99 &&
                  ((this.props.auth.stud_id ? true : false) ||
                    this.props.auth.inst_set_up.exam == "OFFLINE" ||
                    this.props.auth.inst_set_up.exam == "HYBRID_BLENDED") && (
                    <div
                      className="live-item"
                      onClick={() => {
                        this.setState({ online_or_offline: "offline" });
                        this.OfflineTestLabelsApi();
                      }}
                    >
                      <div
                        className="live-links"
                        style={
                          this.state.online_or_offline === "offline"
                            ? { borderBottom: "5px solid #1954E7" }
                            : {}
                        }
                      >
                        <span>Offline</span>
                      </div>
                    </div>
                  )}
              </div>

              <div
                className="search-study"
                style={
                  this.state.online_or_offline !== "online"
                    ? { display: "none" }
                    : {
                        margin: "0",
                        paddingLeft: "0",
                        paddingRight: "0",
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "px",
                        marginRight: "10px",
                        border: "0",
                      }
                }
              >
                <div className="Search_bar" style={{ width: "100%" }}>
                  <form
                    className="form_Style"
                    onSubmit={(e) => e.preventDefault()}
                    style={{
                      width: "100%",
                      border: "1px solid #D7D5EA",
                      borderRadius: "5px",
                      paddingBottom: "5px",
                      paddingTop: "5px",
                    }}
                  >
                    <input
                      className="Search_Input"
                      type="text"
                      value={this.props.search}
                      placeholder="Search "
                      onChange={(e) =>
                        this.setState({ search: e.target.value })
                      }
                    />
                    <button
                      className="Search_button"
                      style={{ border: 0, background: "#fff" }}
                    >
                      <img src={SearchImg} />
                    </button>
                  </form>
                </div>
              </div>
            </nav>
            {
              //=====================================================EXAM 2nd NAV==============================================
              <ExamNav
                online_or_offline={this.state.online_or_offline}
                show_mock_practice_nav={this.state.show_mock_practice_nav}
                choose_btn_online_mock_or_practice={
                  this.state.choose_btn_online_mock_or_practice
                }
                examback_label_id={this.state.examback_label_id}
                test_labels_data={this.state.test_labels_data}
                ChildExamNav={this.HandleChildExamNav}
                ChildExamNav2={this.HandleChildExamNav2}
                offline_label_array={this.state.offline_label_array}
                offline_label_element={this.state.offline_label_element}
                offline_choose_btn={this.state.offline_choose_btn}
                ChildOffExamNav={this.HandleChildOffExamNav}
                ChildOffExamNav2={this.HandleChildOffExamNav2}
                openBookmark={this.openBookmark}
              />
            }
            {/* =============================================================EXAM Cards======================================= */}
            <ExamSchedules
              ChildExamSchedules={this.HandleChildExamSchedules}
              ChildExamSchedules2={this.HandleChildExamSchedules2}
              online_or_offline={this.state.online_or_offline}
              choose_btn_online_mock_or_practice={
                this.state.choose_btn_online_mock_or_practice
              }
              test_type_id_of_choose_online_btn={
                this.state.test_type_id_of_choose_online_btn
              }
              label_id={this.state.label_id}
              clicked_date={this.state.clicked_date}
              is_schedules_view_open={this.state.is_schedules_view_open}
              offline_choose_btn={this.state.offline_choose_btn}
              offline_data={this.state.offline_data}
              offline_label_array={this.state.offline_label_array}
              offline_label_element={this.state.offline_label_element}
              off_clicked_date={this.state.off_clicked_date}
              Search={this.state.search}
            />
          </div>
        ) : (
          <div>
            {this.state.bookmarks == false && (
              <ExamBack
                FromChildExamBack={this.HandleChildExamBack}
                online_element_card_test_id={this.state.online_card_sch_test_id}
                test_name={this.state.online_card_sch_test_name}
                element_object={this.state.element_object}
              />
            )}
          </div>
        )}
        {this.state.is_schedules_view_open === false &&
          this.state.bookmarks == true && (
            <div>
              <Bookmarked openBookmark={this.openBookmark} />
            </div>
          )}
      </>
    );
  }

  openBookmark = () => {
    this.setState({ bookmarks: !this.state.bookmarks });
  };

  HandleErrorBackdrop = () => {
    this.setState({ error_backdrop_on: false });
    window.location = "/dashboard";
  };

  HandleChildExamSchedules = (is_schedules_view) => {
    this.setState({ is_schedules_view_open: is_schedules_view });
  };
  HandleChildExamSchedules2 = (test_id, test_name, element_object) => {
    this.setState({
      online_card_sch_test_id: test_id,
      online_card_sch_test_name: test_name,
      element_object: element_object,
    });
  };

  HandleChildExamBack = (is_schedules_view, examback_label_id) => {
    this.setState({
      is_schedules_view_open: is_schedules_view,
      examback_label_id: examback_label_id,
    });
  };

  HandleChildExamNav = (online_mock_or_practice, labelID, test_typ_id) => {
    this.setState({
      choose_btn_online_mock_or_practice: online_mock_or_practice,
      label_id: labelID,
      test_type_id_of_choose_online_btn: test_typ_id,
    });
  };

  HandleChildExamNav2 = (clicked_date) => {
    this.setState({ clicked_date: clicked_date });
  };

  HandleChildOffExamNav = (label_name) => {
    this.setState({ offline_choose_btn: label_name });
  };
  HandleChildOffExamNav2 = (clicked_date) => {
    this.setState({ off_clicked_date: clicked_date });
  };

  OnlineTestLabelsApi() {
    this.setState({ loader: true });
    let request = {
      url: `/student/testLabels`,
      token: this.props.auth.examdesk_auth_token,
    };
    api
      .getAuthExamW(request)
      .then((response) => {
        if (response && response.data && response.data.data) {
          if (response.data.data.length >= 1) {
            var atleast_one_mock_test = false;
            var atleast_one_online_test = false;

            for (var i = 0; i < response.data.data.length; i++) {
              if (response.data.data[i].test_type_id == 1) {
                atleast_one_mock_test = true;
              }
              if (response.data.data[i].test_type_id == 4) {
                atleast_one_online_test = true;
              }
            }
            if (!atleast_one_mock_test && !atleast_one_online_test) {
              response.data.data.push({
                label_id: "OnlineP",
                label_name: "Online exam",
                test_type_id: 4,
                title: "Online Exam",
              });
              response.data.data.push({
                label_id: "MockP",
                label_name: "Mock Test",
                test_type_id: 1,
                title: "Mock Test",
              });
            } else if (!atleast_one_mock_test) {
              response.data.data.push({
                label_id: "MockP",
                label_name: "Mock Test",
                test_type_id: 1,
                title: "Mock Test",
              });
            } else if (!atleast_one_online_test) {
              response.data.data.push({
                label_id: "OnlineP",
                label_name: "Online exam",
                test_type_id: 4,
                title: "Online Exam",
              });
            }
          } else if (response.data.data.length == 0) {
            response.data.data.push({
              label_id: "OnlineP",
              label_name: "Online exam",
              test_type_id: 4,
              title: "Online Exam",
            });
            response.data.data.push({
              label_id: "MockP",
              label_name: "Mock Test",
              test_type_id: 1,
              title: "Mock Test",
            });
          }

          this.setState({ test_labels_data: response.data });
          this.setState({ total_schedules_digit: response.data.data.length });
          response.data.data.length === 0 &&
            this.setState({ show_mock_practice_nav: false });
          response.data.data.length === 0 &&
            this.setState({ choose_btn_online_mock_or_practice: "" });
        }
        this.setState({ loader: false });
      })
      .catch((error) => {
        var product_test_labels_if_noexamdesk_schedules = {
          data: [
            {
              label_id: "OnlineP",
              label_name: "Online exam",
              test_type_id: 4,
              title: "Online Exam",
            },
            {
              label_id: "MockP",
              label_name: "Mock Test",
              test_type_id: 1,
              title: "Mock Test",
            },
          ],
        };

        this.setState({
          test_labels_data: product_test_labels_if_noexamdesk_schedules,
        });
        this.setState({ online_testlabels_api_get_failed: true });
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
          this.setState({ error_backdrop_on: true });
        } else {
          if (!ErrorMessageHandling(error).toLowerCase() === "unauthorized") {
            toast.error(ErrorMessageHandling(error));
          }
        }
        this.setState({ loader: false });
      });
  }
  OnlineTestsApi(label_id) {
    let request = {
      url: `/student/testLabels/${this.props.auth.account_id}/tests`,
      token: this.props.auth.examdesk_auth_token,
    };
    api
      .getAuthExamW(request)
      .then((response) => {
        toast.success("tests recived");
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
          this.setState({ error_backdrop_on: true });
        } else {
          toast.error(ErrorMessageHandling(error));
        }
      });
  }

  OfflineTestLabelsApi() {
    this.setState({ loader: true });
    let request = {
      url: `/api/v1/reports/Student/${this.props.auth.stud_id}`,
      token: this.props.auth.student_auth,
    };
    api
      .getAuth(request)
      .then((response) => {
        this.setState({ line: response });
        if (
          response &&
          response.data &&
          response.data.pastCourseExamSchdJson &&
          response.data.pastCourseExamSchdJson.length > 0
        ) {
          var arr = [];
          var brr = [];
          response.data.pastCourseExamSchdJson.map((element, index) => {
            arr.push(element.course_Name);
            brr.push(element);
          });
          this.setState({ offline_label_array: arr });
          this.setState({ offline_label_element: brr });
        }
        if (response && response.data) {
          this.setState({ offline_data: response.data });
        }
        this.setState({ loader: false });
      })
      .catch((error) => {
        this.setState({ loader: false });
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
          this.setState({ error_backdrop_on: true });
        } else {
          toast.error(ErrorMessageHandling(error));
        }
      });
  }
}
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(Nav);
