import React from "react";
import "./../examBack.css";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../api/api";
import NoSchedule from "../NoSchedule";
import NoOffSchedule from "../NoOffSchedule";
import { ErrorMessageHandling } from "../../../components/error";
import ErrorBackdrop from "../../../components/error_backdrop";
import Loader from "../../../components/loader";
import Examdesk_exam from "./examdesk_exam";
import Product_exams from "./product_exams";
import filterDemoAccounts from "../../../utils/temp_demo_accounts";

class ExamSchedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderExamdesk: false,
      loaderProductExam1: false,
      loaderProductExam2: false,
      response_data_acc_to_label_id: [],
      product_array_result: "",
      product_response_data_acc_to_label_id: [],
      response_data_acc_to_label_id_search: {},
      error_backdrop_on: false,
      product_api1_response: [], //after product sharing implemented
    };
    this.demo_account = filterDemoAccounts(this.props.auth.institute_id);
  }
  total_eligible_sch_counts = 0;
  total_eligible_sch_counts_products = 0;

  componentDidMount() {
    this.ProductTestIdApi1();
    this.OnlineTestsApi(this.props.label_id);
    this.OnSearching(this.props.Search);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.online_or_offline === "online") {
      if (
        prevProps.examnav_each_label_obj !== this.props.examnav_each_label_obj
      ) {
        this.total_eligible_sch_counts = 0;
        this.total_eligible_sch_counts_products = 0;
      }
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

      // re-render on change of each props except on change of search props.
      if (
        prevProps.ChildExamSchedules3 !== this.props.ChildExamSchedules3 ||
        prevProps.online_or_offline !== this.props.online_or_offline ||
        prevProps.choose_btn_online_mock_or_practice !==
          this.props.choose_btn_online_mock_or_practice ||
        prevProps.test_type_id_of_choose_online_btn !==
          this.props.test_type_id_of_choose_online_btn ||
        prevProps.label_id !== this.props.label_id ||
        prevProps.examnav_each_label_obj !==
          this.props.examnav_each_label_obj ||
        prevProps.test_labels_data !== this.props.test_labels_data ||
        prevProps.is_schedules_view_open !==
          this.props.is_schedules_view_open ||
        prevProps.offline_choose_btn !== this.props.offline_choose_btn ||
        prevProps.offline_data !== this.props.offline_data ||
        prevProps.offline_label_array !== this.props.offline_label_array ||
        prevProps.offline_label_element !== this.props.offline_label_element
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

  HandleErrorBackdrop = () => {
    this.setState({ error_backdrop_on: false });
    window.location = "/dashboard";
  };

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
        {this.props.online_or_offline === "online" ? (
          (this.state.response_data_acc_to_label_id.length &&
            this.state.response_data_acc_to_label_id.length > 0) ||
          (this.state.product_response_data_acc_to_label_id.length &&
            this.state.product_response_data_acc_to_label_id.length > 0) ? (
            <div className="examdesk_and_product_exams">
              {/* ===================================================EXAMDESK EXAMS======================================================= */}
              <Examdesk_exam
                response_data_acc_to_label_id={
                  this.state.response_data_acc_to_label_id
                }
                Search={this.props.Search}
                ExpiredOrAttempted={this.ExpiredOrAttempted}
                examdesk_or_product={"examdesk"}
                demo_account={this.demo_account}
              />

              {/* ====================================================PRODUCT EXAMS====================================================== */}
              <Product_exams
                product_response_data_acc_to_label_id={
                  this.state.product_response_data_acc_to_label_id
                }
                ifAnyProductExam={this.ProductNoExamOfClickedTypeCheck3(
                  this.props.test_type_id_of_choose_online_btn
                )}
                ExpiredOrAttemptedP={this.ExpiredOrAttemptedP}
                product_api1_response={this.state.product_api1_response}
                Search={this.props.Search}
                examdesk_or_product={"product"}
                demo_account={this.demo_account}
              />
              {/* ==================================================== NO SCHEDULE ====================================================== */}
              {this.total_eligible_sch_counts == 0 &&
              !this.ProductNoExamOfClickedTypeCheck3(
                this.props.test_type_id_of_choose_online_btn
              ) ? (
                <NoSchedule show_no_data_msg={this.props.show_no_data_msg} />
              ) : (
                ""
              )}
            </div>
          ) : (
            <NoSchedule show_no_data_msg={this.props.show_no_data_msg} />
          )
        ) : this.props.offline_choose_btn === "" ? (
          <NoOffSchedule />
        ) : (
          <></>
        )}
      </>
    );
  }

  ProductNoExamOfClickedTypeCheck3 = (which_test_type) => {
    this.total_eligible_sch_counts_products = 0;
    if (which_test_type == 1 || which_test_type == 4) {
      var which_test_type_id = which_test_type;
      var product_response_data_acc_to_label =
        this.state.product_response_data_acc_to_label_id;
      var count = 0;
      if (product_response_data_acc_to_label.length <= 0) {
        return false;
      } else {
        for (var r in product_response_data_acc_to_label) {
          var element_object = product_response_data_acc_to_label[r];
          if (
            this.ExpiredOrAttemptedP(element_object) === "upcoming" ||
            this.ExpiredOrAttemptedP(element_object) === "practice" ||
            this.ExpiredOrAttemptedP(element_object) === "ongoing" ||
            this.ExpiredOrAttemptedP(element_object) === "resume"
          ) {
            if (
              product_response_data_acc_to_label[r].test_type_id ==
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
          this.total_eligible_sch_counts_products = 0;

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
            //  setTimeout(() => { window.location = '/dashboard' }, 1000);
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
          this.total_eligible_sch_counts_products = 0;

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
          this.total_eligible_sch_counts_products = 0;
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
          this.total_eligible_sch_counts = 0;
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
            this.setState({ error_backdrop_on: true });
          }
          this.setState({ loaderExamdesk: false });
        });
    }
  }

  OnSearching = (text) => {
    if (text.trim().length !== 0) {
      let temp = this.state.response_data_acc_to_label_id.filter(function (el) {
        return (
          el.test_name.toUpperCase().includes(text.toUpperCase()) ||
          (el.title !== undefined &&
            el.title !== null &&
            el.title.toUpperCase().includes(text.toUpperCase())) ||
          false
        );
      });
      this.setState({ response_data_acc_to_label_id_search: temp });
    } else {
      this.setState({
        response_data_acc_to_label_id_search:
          this.state.response_data_acc_to_label_id,
      });
    }
  };

  ExpiredOrAttempted = (item) => {
    var status = "";
    if (
      item.test_type_id === 2 &&
      item.test_limit != 0 &&
      item.total_attempts < item.test_limit
    ) {
      this.total_eligible_sch_counts = this.total_eligible_sch_counts + 1;
      status = "practice";
      return status;
    } else if (item.test_type_id === 2 && item.test_limit === 0) {
      this.total_eligible_sch_counts = this.total_eligible_sch_counts + 1;
      status = "practice";
      return status;
    } else {
      if (
        item.end_timestamp * 1000 < new Date().getTime() &&
        item.is_submitted == 0
      ) {
        this.total_eligible_sch_counts = this.total_eligible_sch_counts + 1;
        status = "view";
        return status;
      }
      if (
        item.end_timestamp * 1000 < new Date().getTime() &&
        item.incomplete_attempts + item.total_attempts == 0
      ) {
        status = "expired";
        return status;
      }
      if (
        item.end_timestamp * 1000 < new Date().getTime() &&
        item.incomplete_attempts + item.total_attempts >= 0
      ) {
        status = "attempted";
        return status;
      }

      if (
        status !== "expired" &&
        status !== "attempted" &&
        status !== "ongoing" &&
        item.start_timestamp * 1000 >= new Date().getTime()
      ) {
        this.total_eligible_sch_counts = this.total_eligible_sch_counts + 1;
        status = "upcoming";
        return status;
      }

      if (
        status !== "expired" &&
        status !== "attempted" &&
        status !== "upcoming" &&
        item.start_timestamp * 1000 <= new Date().getTime() &&
        item.end_timestamp * 1000 >= new Date().getTime()
      ) {
        if (item.test_type_id == 4 || item.test_type_id == 1) {
          if (item.total_attempts > 0) {
            status = "expired";
            return status;
          }
        }
        if (item.test_type_id == 2) {
          if (item.total_attempts == item.test_limit) {
            status = "expired";
            return status;
          }
        }
        if (item.test_type_id == 4 || item.test_type_id == 1) {
          if (item.total_attempts === 0 && item.incomplete_attempts > 0) {
            this.total_eligible_sch_counts = this.total_eligible_sch_counts + 1;
            status = "resume";
            return status;
          }
        }
        this.total_eligible_sch_counts = this.total_eligible_sch_counts + 1;
        status = "ongoing";
        return status;
      }
    }
    return false;
  };

  ExpiredOrAttemptedP = (item) => {
    var status = "";
    if (
      item.test_type_id === 2 &&
      item.test_limit != 0 &&
      item.total_attempts < item.test_limit
    ) {
      this.total_eligible_sch_counts_products =
        this.total_eligible_sch_counts_products + 1;
      status = "practice";
      return status;
    } else if (item.test_type_id === 2 && item.test_limit === 0) {
      this.total_eligible_sch_counts_products =
        this.total_eligible_sch_counts_products + 1;
      status = "practice";
      return status;
    } else {
      if (
        item.end_timestamp * 1000 < new Date().getTime() &&
        item.incomplete_attempts + item.total_attempts == 0
      ) {
        status = "expired";
        return status;
      }
      if (
        item.end_timestamp * 1000 < new Date().getTime() &&
        item.incomplete_attempts + item.total_attempts >= 0
      ) {
        status = "attempted";
        return status;
      }
      if (
        status !== "expired" &&
        status !== "attempted" &&
        status !== "ongoing" &&
        item.start_timestamp * 1000 >= new Date().getTime()
      ) {
        this.total_eligible_sch_counts_products =
          this.total_eligible_sch_counts_products + 1;
        status = "upcoming";
        return status;
      }
      if (
        status !== "expired" &&
        status !== "attempted" &&
        status !== "upcoming" &&
        item.start_timestamp * 1000 <= new Date().getTime() &&
        item.end_timestamp * 1000 >= new Date().getTime()
      ) {
        if (item.test_type_id == 4 || item.test_type_id == 1) {
          if (item.total_attempts > 0) {
            status = "expired";
            return status;
          }
        }
        if (item.test_type_id == 2) {
          if (item.total_attempts == item.test_limit) {
            status = "expired";
            return status;
          }
        }
        if (item.test_type_id == 4 || item.test_type_id == 1) {
          if (item.total_attempts === 0 && item.incomplete_attempts > 0) {
            this.total_eligible_sch_counts_products =
              this.total_eligible_sch_counts_products + 1;
            status = "resume";
            return status;
          }
        }
        this.total_eligible_sch_counts_products =
          this.total_eligible_sch_counts_products + 1;
        status = "ongoing";
        return status;
      }
    }
    return false;
  };
}
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(ExamSchedules);
