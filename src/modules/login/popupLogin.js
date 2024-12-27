import React, { useState } from 'react'
import './popupLogin.css'
import { connect } from 'react-redux';
var base64 = require('base-64');

function PopupLogin(props) {
    const { user_role_list, dispatch, loginDetails, device_id } = props;
    const [selected, setSelected] = useState(0);

    const loginAgain = () => {
        closePopUp();
        dispatch({
            type: 'BEGIN_LOGIN',
            user: loginDetails.alternate_email_id,
            password: loginDetails.password,
            renew: false,
            user_id: user_role_list[selected].user_id ? user_role_list[selected].user_id : "",
            institute_id: user_role_list[selected].institute_id ? user_role_list[selected].institute_id : 0,
            user_type: user_role_list[selected].user_type,
            dispatch,
            device_id: device_id||null
        })
    }

    const closePopUp = () => {
        dispatch({
            type: 'SET_USER_ROLE_LIST', show_multi_user_selection: false, user_role_list: [], multi_user_type: ''
        })
    }

    const setParentStudentDetails = () => {
        let temp = user_role_list[selected];
        let student_auth = base64.encode(
            temp.user_id + "|" + temp.user_type + ":" +
            temp.password + ":" +
            temp.institute_id + 
            "|" +temp.student_acad_year[0].acad_yr_id +
            ":" +
            props.device_id + ":WEB:1|5");
        let examdesk_auth_token = base64.encode(temp.user_id + ":" + temp.password + ":" + temp.institute_id + ":" + temp.account_id);
        let scorecard_auth_token = base64.encode(temp.phone_no + ":" + temp.password + ":" + temp.institute_id)
        let user_id = temp.user_id;
        let student_id = temp.student_id;
        let institute_id = temp.institute_id;
        let institute_name = temp.institute_name;
        let user_type = temp.user_type;
        let name = temp.student_name;
        let mobile_no= temp.phone_no;
        let email_id = (temp.email_id) ? temp.email_id : '';
        let parentslogin = true;
        let photo_url = temp.photo_url;
        let join_date = temp.join_date
        let data = { ...props, student_auth, user_id, student_id, institute_id, institute_name, user_type , examdesk_auth_token ,scorecard_auth_token , name , mobile_no , email_id , photo_url, join_date, parentslogin};

        closePopUp();
        dispatch({
            type: 'LOGIN_SUCCESS',
            ...data,
        })
    }

    return (
        <>
            <div className="popup-login-div1">
                <div className="popup-login-div">
                    <div className="popup-login">
                        <div className="popup-heading">Select Profile</div>
                        {user_role_list.map((el, i) => (
                            <label key={i} class="container-popupLogin">{el.institute_name}
                                {/* student_name - display name */}             
                                <div>{ el.display}: {  props.multi_user_type == 'parent_student'? el.student_name: el.name}</div>      
                                <input type="radio" name="radio" value={i} checked={i == selected} onChange={(e) => { setSelected(Number(e.target.value)); }} />
                                <span class="checkmark"></span>
                            </label>
                        ))}
                    </div>
                    <div className="popuplogin-buttons">
                        <button className="pop-button" onClick={() => {
                            if (props.multi_user_type == 'parent_student' && user_role_list[selected]?.is_login_allowed) {
                                setParentStudentDetails();
                            } else {
                                loginAgain();
                            }
                        }} >Ok</button>
                        <button className="pop-button" onClick={closePopUp} >Cancel</button>
                    </div>

                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({ ...state.auth });
export default connect(mapStateToProps)(PopupLogin);