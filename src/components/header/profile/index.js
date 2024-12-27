import React, { useState, useEffect } from "react";
import Img from "../../../assets/header/profile_img.png";
import Call from "../../../assets/header/call.svg";
import ID from "../../../assets/header/ID.svg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import imgprofile from "../../../assets/profile/profile_image2.png";
import { ToastContainer, toast } from "react-toastify";
import { ErrorMessageHandling } from "../../error";
import "react-toastify/dist/ReactToastify.css";

const Profile_page = (props) => {
  const [flag, setflag] = useState(false);

  const logoutApi = () => {
    setflag(true);
    let request = {
      url: `/api/v1/alternateLogin/logout?deviceId=${props.auth.device_id}`,
      token: props.auth.student_auth,
    };
    api
      .getAuth(request)
      .then((data) => {
        setflag(false);
      })
      .catch((err) => {
        setflag(false);
        if (err && err.response && err.response.status == 403) {
          {
            props.dispatch({ type: "LOGOUT", msg: err.response.message });
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error(ErrorMessageHandling(err));
        }
      });
  };
  return (
    <>
      <div className="popup-box" onClick={props.handleClose}>
        <div className="profile_box">
          <div className="profile_container">
            <div className="upperdiv">
              <div className="profile_photo">
                <img
                  src={props.auth.photo_url ? props.auth.photo_url : imgprofile}
                  width="72"
                  height="72"
                />
              </div>
              <div className="profile_name">
                <p>
                  {props.auth.parentslogin
                    ? props.auth.parent_name
                    : props.auth.name
                    ? props.auth.name
                    : "UserName"}
                </p>
              </div>
              <div className="id_detail_main">
                <div className="po_id_detail">
                  <div className="po_id_img">
                    <img src={ID} />
                  </div>
                  <div className="po_id_num">
                    <p>
                      {props.auth.parentslogin
                        ? props.auth.parent_id
                        : props.auth.student_display_id &&
                          props.auth.student_display_id}
                    </p>
                  </div>
                </div>
                <div className="Po_contact_Detail">
                  <div className="po_contact_img">
                    <img src={Call} />
                  </div>
                  <div className="po_contact_num">
                    <p>{props.auth.student_phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my_profile">
              {/* <p>My Profile</p> */}
              <Link to={{ pathname: "/Profile" }}>
                <p style={{ height: "100%", width: "100%" }}>Profile</p>
              </Link>
            </div>
            <div
              className="log_out"
              onClick={() => {
                logoutApi();
                props.dispatch({ type: "RETURN_TAB", tab: "prod_ongoing" });
                props.dispatch({ type: "LOGOUT", msg: "" });
              }}
            >
              <button>Logout</button>
            </div>
            {(props.auth.privacy_policy_url ||
              props.auth.terms_and_condition_url) && (
              <div className="PrivacyMaindiv">
                <div className="Privacy">
                  {props.auth.privacy_policy_url && (
                    <a href={props.auth.privacy_policy_url} target="_blank">
                      Privacy Policy
                    </a>
                  )}
                </div>
                <div className="Terms_of_service">
                  {props.auth.terms_and_condition_url && (
                    <a
                      href={props.auth.terms_and_condition_url}
                      target="_blank"
                    >
                      Terms Of Service
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(Profile_page);
