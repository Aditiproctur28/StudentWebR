import React, { useState } from "react";
import "./popupLogin.css";
import { connect } from "react-redux";
var base64 = require("base-64");

function AcadmicYear(props) {
  const [selected, setSelected] = useState(
    props?.student_acad_year[0]?.acad_yr_id
  );

  let path = "";
  if (window.location.host == "localhost:3000") {
    path = `http://localhost:3000`;
  } else {
    // path = `https://` + window.location.host;
    path = `https://` + window.location.host;
  }
  const onSelectAcdYr = () => {
    props.dispatch({
      type: "SWITCH_ACAD_YEAR_NEW",
      acadYearObj: selected,
      dashNavigate: () => (window.location.href = `${path}/dashboard`),
    });
  };

  return (
    <>
      <div className="popup-login-div1">
        <div className="popup-login-div">
          <div className="popup-login">
            <div className="popup-heading">Select Academic Year </div>
            {props?.student_acad_year?.map((el, i) => (
              <label key={i} class="container-popupLogin">
                <div> Academic Year: {el?.acad_yr_name}</div>
                <input
                  type="radio"
                  name="radio"
                  value={el?.acad_yr_id}
                  checked={el?.acad_yr_id == selected}
                  onChange={(e) => {
                    setSelected(Number(e.target.value));
                  }}
                />
                <span class="checkmark"></span>
              </label>
            ))}
          </div>
          <div className="popuplogin-buttons">
            <button
              className="pop-button"
              onClick={() => {
                onSelectAcdYr();
              }}
            >
              Ok
            </button>
            <button
              className="pop-button"
              onClick={() => {
                props?.closeAcdYrPop();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({ ...state.auth });
export default connect(mapStateToProps)(AcadmicYear);
