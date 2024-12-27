import React from "react";
import "./../examBack.css";
import { connect } from "react-redux";
import ExamcardMock from "./examcardMock";
import ExamcardPr from "./examcardPr";
import ExamcardOn from "./examcardOn";
import ExamcardOth from "./examcardOth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../api/api";
import NoSchedule from "../NoSchedule";
import NoOffSchedule from "../NoOffSchedule";
import { ErrorMessageHandling } from "../../../components/error";
import ErrorBackdrop from "../../../components/error_backdrop";
import Loader from "../../../components/loader";

class Examdesk_exams extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="examdesk_exam">
        {this.props.response_data_acc_to_label_id.length &&
        this.props.response_data_acc_to_label_id.length > 0 ? (
          <div className="for_examdesk_sch">
            {this.props.response_data_acc_to_label_id.map(
              (element_object, obj_index) =>
                element_object.test_name
                  .toUpperCase()
                  .indexOf(this.props.Search.toUpperCase()) != -1 ||
                this.props.Search == "" ? (
                  <div>
                    {(this.props.ExpiredOrAttempted(element_object) ===
                      "upcoming" ||
                      this.props.ExpiredOrAttempted(element_object) ===
                        "practice" ||
                      this.props.ExpiredOrAttempted(element_object) ===
                        "ongoing" ||
                      this.props.ExpiredOrAttempted(element_object) ===
                        "resume" ||
                      this.props.ExpiredOrAttempted(element_object) ===
                        "view") && (
                      <div>
                        {element_object.test_type_id === 1 && (
                          <ExamcardMock
                            test_id={element_object.test_id}
                            element_object={element_object}
                            status={this.props.ExpiredOrAttempted(
                              element_object
                            )}
                            examdesk_or_product={this.props.examdesk_or_product}
                            demo_account={this.props.demo_account}
                          />
                        )}
                        {element_object.test_type_id === 2 &&
                          this.props.ExpiredOrAttempted(element_object) ===
                            "practice" && (
                            <ExamcardPr
                              test_id={element_object.test_id}
                              element_object={element_object}
                              status={this.props.ExpiredOrAttempted(
                                element_object
                              )}
                              demo_account={this.props.demo_account}
                            />
                          )}
                        {element_object.test_type_id === 4 && (
                          <ExamcardOn
                            test_id={element_object.test_id}
                            element_object={element_object}
                            status={this.props.ExpiredOrAttempted(
                              element_object
                            )}
                            examdesk_or_product={this.props.examdesk_or_product}
                            demo_account={this.props.demo_account}
                          />
                        )}
                        {!element_object.test_type_id === 1 &&
                          !element_object.test_type_id === 2 &&
                          !element_object.test_type_id === 4 && (
                            <ExamcardOth
                              test_id={element_object.test_id}
                              element_object={element_object}
                              status={this.props.ExpiredOrAttempted(
                                element_object
                              )}
                            />
                          )}
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(Examdesk_exams);
