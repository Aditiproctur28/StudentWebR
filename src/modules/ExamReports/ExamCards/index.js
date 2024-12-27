import React from "react";
import ".././examBack.css";
import moment from "moment";
import { connect } from "react-redux";
import ExamcardMock from "./examcardMock";
import ExamcardPr from "./examcardPr";
import ExamcardOn from "./examcardOn";
import ExamcardOth from "./examcardOth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../api/api";
import NoSchedule from "../NoSchedule";
import OfflineClass from "../offlineClass";
import NoOffSchedule from "../NoOffSchedule";
import Moment from "react-moment";
import { ErrorMessageHandling } from "../../../components/error";
import Loader from "../../../components/loader";
import ErrorBackdrop from "../../../components/error_backdrop";
import Examdesk_exams from "./examdesk_exams";
import Product_exams from "./product_exams";

class ExamSchedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderExamdesk: false,
      loaderProductExam1: false,
      loaderProductExam2: false,
      is_schedules_view_open: this.props.is_schedules_view_open,
      prev_label_id: -1,
      response_data_acc_to_label_id: [],
      product_array_result: "",
      product_response_data_acc_to_label_id: [],
      online_sch_test_id: "",
      element_object: {},
      online_sch_test_name: "",
      online_card_render_frequency: 0,
      exams_name_to_type_convert: { mock: 1, practice: 2, online: 4 },
      error_backdrop_on: false,
      loader_Product_api2_switch: true,
      product_api1_response: [], //after product sharing implemented
    };
  }

  reverse_start_date_for_click_date_examdesk_schedules = "";
  reverse_end_date_for_click_date_examdesk_schedules = "";
  reverse_start_date_for_click_date_product_exam_schedules = "";
  reverse_end_date_for_click_date_product_exam_schedules = "";

  HandleErrorBackdrop = () => {
    this.setState({ error_backdrop_on: false });
    window.location = "/dashboard";
  };

  ProductNoExamOfClickedTypeCheck3(which_test_type) {
    if (which_test_type == 1 || which_test_type == 4) {
      var which_test_type_id = which_test_type;
      var product_response_data_acc_to_label_id =
        this.state.product_response_data_acc_to_label_id;
      var count = 0;
      if (product_response_data_acc_to_label_id.length <= 0) {
        return false;
      } else {
        for (var r in product_response_data_acc_to_label_id) {
          var element_object = product_response_data_acc_to_label_id[r];
          if (
            this.ExpiredOrAttempted(element_object) === "expired" ||
            this.ExpiredOrAttempted(element_object) ===
              "attempted_n_under_evaluation" ||
            this.ExpiredOrAttempted(element_object) ===
              "attempted_n_result_published"
          ) {
            if (
              product_response_data_acc_to_label_id[r].test_type_id ==
              which_test_type_id
            ) {
              count = count + 1;
            }
            if (count > 0) {
              return true;
            }
          }
        }
      }
    }
  }

  HandleChildOnlineCard = (
    is_schedules_view,
    test_id,
    test_name,
    element_object
  ) => {
    this.setState({ is_schedules_view_open: is_schedules_view });
    this.setState({ online_sch_test_id: test_id });
    this.setState({ online_sch_test_name: test_name });
    this.setState({ element_object: element_object });
  };

  ProductTestIdApi1() {
    var product_api1_response = [];
    var product_test_id_arr = [];

    //CMNT:: FOR MOCK
    if (this.props.test_type_id_of_choose_online_btn == 1) {
      this.setState({ loaderProductExam1: true });

      let request = {
        url: `/prod/user-product/v2/assigned-product-test-ids/Mock_Test`,
        headers: {
          Authorization: this.props.auth.student_auth,
          "Content-Type": "application/json",
          "x-prod-inst-id": this.props.auth.institute_id,
          "x-prod-user-id": this.props.auth.user_id,
        },
      };
      api
        .getCustomAuth(request)
        .then((response) => {
          product_api1_response = response.data.result;
          this.setState({ product_api1_response: product_api1_response });
          for (var r in product_api1_response) {
            product_test_id_arr.push(product_api1_response[r].test_id);
          }
          this.setState({
            product_array_result: product_test_id_arr.join(","),
          });
          this.setState({ loaderProductExam1: false });
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
          this.setState({ loaderProductExam1: false });
        });
    }
    //CMNT:: FOR ONLINE
    if (this.props.test_type_id_of_choose_online_btn == 4) {
      this.setState({ loaderProductExam1: true });

      let request = {
        url: `/prod/user-product/v2/assigned-product-test-ids/Online_Test`,
        headers: {
          Authorization: this.props.auth.student_auth,
          "Content-Type": "application/json",
          "x-prod-inst-id": this.props.auth.institute_id,
          "x-prod-user-id": this.props.auth.user_id,
        },
      };
      api
        .getCustomAuth(request)
        .then((response) => {
          product_api1_response = response.data.result;
          this.setState({ product_api1_response: product_api1_response });
          for (var r in product_api1_response) {
            product_test_id_arr.push(product_api1_response[r].test_id);
          }
          this.setState({
            product_array_result: product_test_id_arr.join(","),
          });
          this.setState({ loaderProductExam1: false });
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
          this.setState({ loaderProductExam1: false });
        });
    }
  }

  ProductTestsList2(test_idss) {
    if (
      this.props.test_type_id_of_choose_online_btn == 1 ||
      this.props.test_type_id_of_choose_online_btn == 4
    ) {
      this.setState({ loaderProductExam2: true });
      let request = {
        url: `/tests/list_id`,
        token: btoa(
          this.props.auth.account_id + ":" + this.props.auth.institute_id
        ),
        data: { test_ids: test_idss, user_id: this.props.auth.user_id },
      };
      api
        .postAuthExamW(request)
        .then((response) => {
          this.setState({
            product_response_data_acc_to_label_id: response.data.data,
          });
          this.setState({ loaderProductExam2: false });
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
          this.setState({ loaderProductExam2: false });
        });
    }
  }

  OnlineTestsApi(label_idd) {
    if (this.props.choose_btn_online_mock_or_practice) {
      this.setState({ loaderExamdesk: true });
      let request = {
        url: `/student/testLabels/${label_idd}/tests`,
        token: this.props.auth.examdesk_auth_token,
      };
      api
        .getAuthExamW(request)
        .then((response) => {
          this.setState({ response_data_acc_to_label_id: response.data.data });
          this.setState({ loaderExamdesk: false });
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
          }
          this.setState({ loaderExamdesk: false });
        });
    }
  }

  ExpiredOrAttempted(item) {
    var status = "";
    if (
      item.end_timestamp * 1000 < new Date().getTime() &&
      item.total_attempts == 0
    ) {
      status = "expired";
      return status;
    }
    if (
      item.test_type_id == 2 &&
      item.incomplete_attempts + item.total_attempts >= 0
    ) {
      if (item.is_result_published === 0) {
        status = "attempted_n_under_evaluation";
        return status;
      }
      status = "attempted_n_result_published";
      return status;
    }

    if (
      item.test_type_id == 1 &&
      item.end_timestamp * 1000 < new Date().getTime() &&
      item.total_attempts == 0
    ) {
      status = "expired";
      return status;
    }

    if (
      item.test_type_id == 1 &&
      item.incomplete_attempts + item.total_attempts > 0
    ) {
      if (item.is_result_published === 0) {
        status = "attempted_n_under_evaluation";
        return status;
      }
      status = "attempted_n_result_published";
      return status;
    }

    if (
      item.test_type_id == 4 &&
      item.end_timestamp * 1000 < new Date().getTime() &&
      item.incomplete_attempts + item.total_attempts == 0
    ) {
      if (item.is_result_published === 0) {
        status = "attempted_n_under_evaluation";
        return status;
      }
      status = "attempted_n_result_published";
      return status;
    }

    if (
      item.test_type_id == 4 &&
      item.incomplete_attempts + item.total_attempts > 0
    ) {
      if (item.is_result_published === 0) {
        status = "attempted_n_under_evaluation";
        return status;
      }
      status = "attempted_n_result_published";
      return status;
    }
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.online_or_offline === "online") {
      if (
        prevProps &&
        prevProps.label_id &&
        this.props &&
        this.props.label_id
      ) {
        if (prevProps.label_id !== this.props.label_id) {
          this.ProductTestsList2(this.state.product_array_result);
        }
      }
      if (prevState.product_array_result !== this.state.product_array_result) {
        this.ProductTestsList2(this.state.product_array_result);
      }
      if (prevState !== this.state) {
        this.props.ChildExamSchedules(this.state.is_schedules_view_open);
        this.props.ChildExamSchedules2(
          this.state.online_sch_test_id,
          this.state.online_sch_test_name,
          this.state.element_object
        );
      }
      // re-render on change of each props except on change of search props and clicked_date.
      if (
        prevProps.ChildExamSchedules !== this.props.ChildExamSchedules ||
        prevProps.ChildExamSchedules2 !== this.props.ChildExamSchedules2 ||
        prevProps.online_or_offline !== this.props.online_or_offline ||
        prevProps.choose_btn_online_mock_or_practice !==
          this.props.choose_btn_online_mock_or_practice ||
        prevProps.test_type_id_of_choose_online_btn !==
          this.props.test_type_id_of_choose_online_btn ||
        prevProps.label_id !== this.props.label_id ||
        prevProps.is_schedules_view_open !==
          this.props.is_schedules_view_open ||
        prevProps.offline_choose_btn !== this.props.offline_choose_btn ||
        prevProps.offline_data !== this.props.offline_data ||
        prevProps.offline_label_array !== this.props.offline_label_array ||
        prevProps.offline_label_element !== this.props.offline_label_element ||
        prevProps.off_clicked_date !== this.props.off_clicked_date
      ) {
        this.ProductTestIdApi1();
        this.OnlineTestsApi(this.props.label_id);
      }

      // if(prevProps!== this.props)
      // {
      //    this.ProductTestIdApi1()
      //     this.OnlineTestsApi(this.props.label_id)
      // }
    }
  }

  componentDidMount() {
    this.ProductTestIdApi1();
    this.OnlineTestsApi(this.props.label_id);
  }

  render() {
    return (
      <>
        <ToastContainer />
        {this.state.loaderExamdesk && <Loader />}
        {this.state.loaderProductExam1 && <Loader />}
        {this.state.loaderProductExam2 && <Loader />}
        {this.state.error_backdrop_on && (
          <ErrorBackdrop onCancel={this.HandleErrorBackdrop} />
        )}

        {this.props.online_or_offline === "online" ? ( //------------------------------------------------------FOR ONLINE EXAMINATION
          <div>
            {/* ============================== FOR EXAMDESK SCHEDULES ==========================   */}
            <Examdesk_exams
              response_data_acc_to_label_id={
                this.state.response_data_acc_to_label_id
              }
              AnyProductExam={this.ProductNoExamOfClickedTypeCheck3(
                this.props.test_type_id_of_choose_online_btn
              )}
              Search={this.props.Search}
              FromChild={this.HandleChildOnlineCard}
              clicked_date={this.props.clicked_date}
            />
            {/* ============================== Product-Exam-Schedules ===================    */}
            <Product_exams
              product_response_data_acc_to_label_id={
                this.state.product_response_data_acc_to_label_id
              }
              AnyProductExam={this.ProductNoExamOfClickedTypeCheck3(
                this.props.test_type_id_of_choose_online_btn
              )}
              Search={this.props.Search}
              FromChild={this.HandleChildOnlineCard}
              clicked_date={this.props.clicked_date}
            />
          </div>
        ) : this.props.offline_choose_btn === "" ? (
          <div>
            <NoOffSchedule />
          </div>
        ) : (
          //----------------------------------------------------------------------------------------------FOR OFFLINE EXAMINATION
          <OfflineClass
            offline_choose_btn={this.props.offline_choose_btn}
            offline_data={this.props.offline_data}
            offline_label_array={this.props.offline_label_array}
            offline_label_element={this.props.offline_label_element}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(ExamSchedules);
