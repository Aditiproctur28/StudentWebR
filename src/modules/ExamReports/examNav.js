import React from "react";
import "./examNav.css";
import { connect } from "react-redux";
import Slider from "../../services/Slider";
import BookMarkIcon from "../../assets/exam/bookmarkicon.png";

class ExamNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked_date: "",
      off_clicked_date: "",
      choosen_label_id: "",
    };
  }

  IfReturningFromExamBack() {
    this.props.examback_label_id &&
      this.setState({ choosen_label_id: this.props.examback_label_id });
  }

  componentDidMount() {
    this.IfReturningFromExamBack();
  }

  render() {
    return (
      <>
        {/* ==============================================================ONLINE===================================================== */}
        {this.props.online_or_offline === "online" ? (
          this.props.test_labels_data.data &&
          this.props.test_labels_data.data.length > 0 ? (
            <div
              className="exam-nav"
              style={{
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                overflowY: "hidden",
                borderBottom: "1px solid  #DDDFE3",
              }}
            >
              <nav
                className="live"
                style={{ borderBottom: "0", width: "100%", minWidth: "500px" }}
              >
                <div
                  className="back-div2"
                  style={{ overflowY: "auto", height: "50px" }}
                >
                  <div className="back-div3" style={{ height: "fitContent" }}>
                    <Slider>
                      {this.props.test_labels_data.data.map(
                        (label_element, index) => (
                          <div
                            className="child"
                            style={
                              label_element.label_id ===
                              this.state.choosen_label_id
                                ? { color: "#fff", background: "#1953E7" }
                                : {}
                            }
                          >
                            <span
                              className="navheaddingreport"
                              style={
                                label_element.label_id ===
                                this.state.choosen_label_id
                                  ? { color: "#fff", background: "#1953E7" }
                                  : {}
                              }
                              onClick={() => {
                                this.setState({
                                  choosen_label_id: label_element.label_id,
                                });
                                this.props.ChildExamNav(
                                  label_element.label_name,
                                  label_element.label_id,
                                  label_element.test_type_id
                                );
                              }}
                            >
                              {label_element.label_name}
                            </span>
                          </div>
                        )
                      )}
                    </Slider>
                  </div>
                </div>
              </nav>

              <div
                style={{
                  minHeight: "4vh",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="bookmark-button"
                  onClick={() => {
                    this.props.openBookmark();
                  }}
                >
                  <img height="33px" width="33px" src={BookMarkIcon} />
                  <p className="bookmark-title">Bookmarked Questions</p>
                </div>
                <div
                  style={{
                    margin: "0",
                    marginRight: "20px",
                    marginTop: "2px",
                    width: "180px",
                  }}
                  className="examdate-filter"
                >
                  <div className="examdate-img"></div>
                  <div className="examdate-heading">
                    <form>
                      <input
                        value={this.state.clicked_date}
                        style={{
                          width: "90%",
                          border: "0",
                          outline: "0",
                          cursor: "text",
                        }}
                        placeholder="Sort By Date"
                        type="date"
                        onChange={(event) => {
                          this.setState({ clicked_date: event.target.value });
                        }}
                      ></input>
                    </form>
                    {this.props.ChildExamNav2(this.state.clicked_date)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )
        ) : (
          // =====================================================================OFFLINE ==========================================
          <div className="exam-nav">
            <nav className="live1">
              <div className="back-div">
                <div className="back-div3">
                  <span
                    className="nav-heading-exam"
                    style={
                      this.props.offline_choose_btn === "analysis"
                        ? { color: "#fff", background: "#1953E7" }
                        : {}
                    }
                    onClick={() => {
                      this.props.ChildOffExamNav("analysis");
                    }}
                  >
                    {"Analysis"}
                  </span>
                  {this.props.offline_label_array.length > 0 &&
                    this.props.offline_label_array.map((label_name, index) => (
                      <span
                        className="nav-heading-exam"
                        style={
                          this.props.offline_choose_btn === label_name
                            ? { color: "#fff", background: "#1953E7" }
                            : {}
                        }
                        onClick={() => {
                          this.props.ChildOffExamNav(label_name);
                        }}
                      >
                        {label_name}
                      </span>
                    ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(ExamNav);
