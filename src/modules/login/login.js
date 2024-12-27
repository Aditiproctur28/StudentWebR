import React from "react";
import { connect } from "react-redux";
import Loader from "../../components/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupLogin from "./popupLogin";
import api from "../../api/api";
import ForgetPassword from "../login/Forgot";
import login from "../../assets/login/loginarrow.png";
import lock from "../../assets/login/lock.png";
import hide from "../../assets/login/hide.png";
import show from "../../assets/login/show1.png";
import fevbook from "../../assets/favicon.png";
import Dasboard from "../../assets/header/dasboard.svg";
import Alerts from "../../services/Alert";
import config from "../../config";
import AcadmicYear from "./acadmicYear";

var base64 = require("base-64");

class Login extends React.Component {
  constructor(props) {
    super(props);
    if (props.user_id != 0) {
      // window.location = "dashboard";
    }

    this.state = {
      toggle: "false",
      alternate_email_id: "",
      password: "",
      device_id: null,
      show_forgot_password: false,
      show_acdmic_yr: false,
      logo: fevbook,
      alertToggle: false,
    };
  }
  textboxemail = React.createRef();
  txtbpassword = React.createRef();

  componentDidMount = (el, inst) => {
    localStorage.setItem("feviconIcon", fevbook);
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
    } catch (e) {
      console.log("script error", e);
    }
    this.props.dispatch({ type: "SET_LOADER", loading: false });
    let request = {
      url: `/api/v1/institutes/getLogoAndFavIcon?virtualHostUrl=${window.location.host}`,
    };

    api
      .getAuth(request)
      .then((data) => {
        if (data.data != "") {
          this.setState({ logo: data.data[0].logoPath });
          localStorage.setItem("feviconIcon", data.data[0].favIconPath);
          const favicon = document.getElementById("favicon");
          favicon.href = data.data[0].favIconPath;
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.status == 403) {
          {
            this.props.dispatch({
              type: "LOGOUT",
              msg: err.response.data.message,
            });
          }
        }
      });

    if (window.location.href.includes("user=")) {
      var baseUrl = window.location.href;
      let substr = baseUrl.substring(baseUrl.lastIndexOf("user"));
      let params = substr.split("&");
      // user=8800534211&pass=MDQyNzAwMA==
      let user = params[0].substring(5);
      let password = base64.decode(params[1].substring(5));
      setTimeout(
        () =>
          this.props.dispatch({
            type: "BEGIN_LOGIN",
            user,
            password,
            renew: false,
            dispatch: this.props.dispatch,
          }),
        700
      );
    }
  };
  closeAcdYrPop = () => {
    this.setState({ show_acdmic_yr: false });
  };
  goHome = () => {
    window.location.replace(window.location.origin);
  };

  alertToggleFunc = () => {
    this.state.alertToggle == true
      ? this.setState({ alertToggle: false })
      : this.props.dispatch({ type: "UPDATE_ALERT" });
  };

  submit = () => {
    if (this.validation()) {
      this.props.dispatch({
        type: "BEGIN_LOGIN",
        user: this.state.alternate_email_id,
        password: this.state.password,
        renew: false,
        dispatch: this.props.dispatch,
        device_id: this.props.device_id || null,
      });
    }
  };

  handleClose = () => {};
  isNumber = (num) => {
    return /^\d+$/.test(num);
  };
  validateMobileNumber = (number) => {
    var reg = /^[0-9\b]+$/;
    return number === "" || reg.test(number);
  };

  validateEmail = (email) => {
    var reg =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  };

  validation = () => {
    if (this.state.alternate_email_id === "") {
      toast.error("Email or Phone Number is required");
      return false;
    }
    if (this.state.password === "") {
      toast.error("Password is required");
      return false;
    }
    if (
      this.isNumber(this.state.alternate_email_id) &&
      !this.validateMobileNumber(this.state.alternate_email_id)
    ) {
      toast.error("Please enter a valid Phone number");
      return false;
    }
    if (
      !this.isNumber(this.state.alternate_email_id) &&
      !this.validateEmail(this.state.alternate_email_id)
    ) {
      toast.error("You have entered an invalid email address!");
      return false;
    }
    if (
      !this.state.password ||
      (this.state.password && this.state.password.length < 0)
    ) {
      toast.error("Please enter valid password");
      return false;
    }
    if (this.state.password && this.state.password.length < 4) {
      toast.error("Password length should be atleast 4 digits long");
      return false;
    }

    return true;
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.submit();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps?.student_acad_year !== this.props?.student_acad_year) {
      let check = this.props?.student_acad_year?.find((e, i) => {
        return this.props?.acad_yr_id == e?.acad_yr_id;
      });

      this.setState({
        show_acdmic_yr: check == true ? false : true,
      });
      if (check == true ? false : true) {
        this.props.dispatch({ type: "SET_LOADER", loading: false });
      }
    }

    if (
      this.props.user_id > 0 &&
      this.props.timestamp != prevProps.timestamp &&
      this.state.show_acdmic_yr
    ) {
      // toast.success('Login Success');

      window.location = "dashboard";
    }
    if (
      this.props.user_id > 0 &&
      this.props.timestamp != prevProps.timestamp &&
      this.props.acad_yr_id == -1
    ) {
      // toast.success('Login Success');

      window.location = "dashboard";
    }

    if (
      this.props.error == true &&
      this.props.timestamp != prevProps.timestamp
    ) {
      if (this.props.error_msg) {
        this.props.error_msg.includes(": app_link :")
          ? this.setState({ alertToggle: true })
          : toast.error(this.props.error_msg);
      } else {
        toast.error("please contact institute admin.");
      }
    }
  }

  render() {
    return (
      <>
        {!this.props?.student_acad_year?.length == 0 &&
          this.state.show_acdmic_yr && (
            <AcadmicYear closeAcdYrPop={this.closeAcdYrPop} />
          )}
        {this.state.alertToggle == true && (
          <Alerts
            alertToggleFunc={this.alertToggleFunc}
            error_msg={this.props.error_msg}
          />
        )}
        {this.props.alert_flag == true && (
          <Alerts
            alertToggleFunc={this.alertToggleFunc}
            error_msg={this.props.alert_msg}
          />
        )}

        <div>
          {this.props.loading && <Loader />}

          <div className="containers">
            <div className="login-container-6">
              {/* {<img src="/images/login_bg.png" className="login-image" alt=""/>}   */}
            </div>

            <div className="login-container-4">
              <div class="formbg">
                <div className="login-container-head">
                  <div>
                    <img
                      className="main-img"
                      src={this.state.logo}
                      alt=""
                      style={{ maxWidth: 500, maxHeight: 65 }}
                      onClick={this.goHome}
                    />
                  </div>
                  <span className="login-heading-b">Sign In</span>
                  <span className="login-heading-m">to your account</span>
                </div>
                <form id="stripe-login">
                  <div class="login-input-container">
                    <label className="login-text-s">Login</label>
                    <input
                      onKeyDown={this._handleKeyDown}
                      onChange={(event) => {
                        this.setState({
                          alternate_email_id: event.target.value.replace(
                            / /g,
                            ""
                          ),
                        });
                      }}
                      type="text"
                      name="Login"
                      placeholder="Email or Phone Number"
                      className="login_placeholder"
                    />
                  </div>
                  <div>
                    <label className="login-text-s">Password</label>
                    <div className="login-password-field">
                      {/* <i class='fas fa-lock' style={{ color: '#BABABA' }}></i> */}
                      <img
                        style={{ height: "15px", width: "15px" }}
                        src={lock}
                      />
                      <input
                        onKeyDown={this._handleKeyDown}
                        onChange={(event) =>
                          this.setState({ password: event.target.value })
                        }
                        type={this.state.toggle ? "password" : "text"}
                        name="password"
                        placeholder="Password"
                        className="login_placeholder"
                      />
                      <img
                        style={{ height: "12px", width: "15px" }}
                        onClick={() =>
                          this.setState({ toggle: !this.state.toggle })
                        }
                        src={this.state.toggle ? show : hide}
                      />
                    </div>
                  </div>

                  <div class="login-submit-button" onClick={this.submit}>
                    Login{" "}
                    <span>
                      <img
                        src={login}
                        style={{ marginLeft: "5px", marginTop: "5px" }}
                      />
                    </span>
                  </div>
                  {window.location.href.indexOf("my-account") != -1 && (
                    <div class="login-home-button" onClick={this.goHome}>
                      Home
                      <span>
                        <img
                          src={Dasboard}
                          style={{
                            height: "15px",
                            marginLeft: "5px",
                            marginTop: "5px",
                          }}
                        />
                      </span>
                    </div>
                  )}
                  <div class="field">
                    <a
                      class="ssolink"
                      onClick={() => {
                        this.setState({ show_forgot_password: true });
                      }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />

          {this.props.show_multi_user_selection == true && (
            <PopupLogin loginDetails={this.state} />
          )}

          {this.state.show_forgot_password == true && (
            <ForgetPassword
              show_forgot_password={() =>
                this.setState({ show_forgot_password: false })
              }
            />
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({ ...state.auth });
export default connect(mapStateToProps)(Login);
