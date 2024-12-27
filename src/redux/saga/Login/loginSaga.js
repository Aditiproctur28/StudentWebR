import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import api from "../../../api";
var base64 = require("base-64");

const getSetUpArray = (institute_setup_type) => {
  institute_setup_type = (institute_setup_type >>> 0).toString(2);
  let myArr = String(institute_setup_type)
    .split("")
    .map((num) => {
      return Number(num);
    });
  let setUp = [];
  for (let i = myArr.length - 1; i >= 0; i--) {
    if (i !== myArr.length - 1) {
      setUp.push(myArr[i] == 1 ? true : false);
    }
  }
  return setUp;
};

export const watchLogin = function* watchLogin() {
  yield takeLatest("BEGIN_LOGIN", beginLogin);
  // yield takeLatest("FETCH_ACAD_YEAR", fetchAcadYears)
};

function* beginLogin(action) {
  yield put({ type: "LOGIN_LOADING" });
  try {
    let payload = {
      device_id: action.device_id ? action.device_id : null,
      source: "WEB",
      password: action.password,
      user_name: action.user,
    };
    if (action.user_type) {
      payload["user_type"] = action.user_type;
    }
    if (action.user_id) {
      payload["user_id"] = action.user_id;
    }
    if (action.institute_id) {
      payload["institute_id"] = action.institute_id;
    }
    if (action.renew) {
      payload["logout_from_all_devices"] = action.renew;
    }
    const responseData = yield call(api.postAuthHeader, {
      url: "/api/v2/user/v3/login",
      post: payload,
      headers: { timeout: 5000 },
    });
    const allowed_user_type = [1, "1", 99, "99"];
    if (
      responseData.data.statusCode == 200 &&
      Array.isArray(responseData.data.result)
    ) {
      //multiuser case login block
      yield put({ type: "SET_LOADER", loading: false });
      yield put({
        type: "SET_USER_ROLE_LIST",
        show_multi_user_selection: true,
        user_role_list: responseData.data.result,
        multi_user_type: "student",
      });
    } else if (
      responseData.data.statusCode == 200 &&
      responseData.data.result
    ) {
      //single user login block
      let loginData = responseData.data.result;
      yield put({ type: "SET_DEVICE_ID", device_id: loginData.device_id });

      if (loginData.login_option == 10) {
        //check login option 10 then show renew session popup. msg shared with you on chat
        yield put({ type: "SET_LOADER", loading: false });
        setTimeout(() => {
          if (
            window.confirm(
              "You are already logged in on another device. Do you want to use here? You will be logged out from other devices."
            )
          ) {
            let renew_login_data = {
              type: "BEGIN_LOGIN",
              device_id: loginData.device_id,
              renew: true,
              password: action.password,
              user: action.user,
            };

            //if user is multiuser
            if (action.user_type) {
              renew_login_data["user_type"] = action.user_type;
              renew_login_data["user_id"] = action.user_id;
              renew_login_data["institute_id"] = action.institute_id;
            }
            if (loginData.user_id) {
              renew_login_data["user_id"] = loginData.user_id;
            }
            action.dispatch(renew_login_data);
          }
        }, 200);
      } else if (loginData.login_option == 11) {
        //unable to login popup alert msg
        yield put({ type: "SET_LOADER", loading: false });
        setTimeout(() => {
          window.alert(
            "Unable to login! This is not your registered device for login kindly use a registered device. For any query please contact your administrator."
          );
        }, 200);
      } else if (loginData.login_option == 13) {
        //user block alert
        yield put({ type: "SET_LOADER", loading: false });
        setTimeout(() => {
          window.alert(
            "Your account has been blocked. Please contact your institute/school!"
          );
        }, 200);
      } else {
        //allow login
        let student_response = {};
        student_response.inst_announcement = loginData.inst_announcement;
        // student_response.inst_set_up = getSetUpArray(loginData.inst_set_up);
        // D365 inst_ plan details
        // acmic yr changes add acdmic yr id
        student_response.acad_yr_id = loginData.acad_yr_id;
        student_response.inst_set_up = loginData.inst_plan_det;
        student_response.ay_end_date = loginData.ay_end_date;
        student_response.ay_start_date = loginData.ay_start_date;
        student_response.student_acad_year = loginData.student_acad_year;
        student_response.institute_id = loginData.institute_id;
        student_response.institute_name = loginData.institute_name;
        student_response.logo_url = loginData.institute_logo_url;
        student_response.user_id = loginData.user_id;
        student_response.device_id = loginData.device_id;
        student_response.prodUrl = loginData.prodUrl;
        student_response.login_option = loginData.login_option;
        student_response.mobile_no = loginData.phone_no;
        student_response.student_phone = loginData.mobile_no;
        student_response.password = loginData.password;
        student_response.photo_url = loginData.photo_url;
        student_response.join_date = loginData.join_date;
        // student_response.profile_pic = loginData.photo;
        // student_response.join_date = loginData.join_date;
        student_response.email_id = loginData.email_id
          ? loginData.email_id
          : "";
        student_response.account_id = loginData.account_id;
        student_response.name = loginData.name ? loginData.name : "";
        student_response.instagram_url = loginData.instagram_url;
        student_response.help_url = loginData.help_url;
        student_response.linkedin_url = loginData.linkedin_url;
        student_response.whatsapp_url = loginData.whatsapp_url;
        student_response.youtube_url = loginData.youtube_url;
        student_response.fg_page_url = loginData.fg_page_url;
        student_response.country_calling_code = loginData.country_calling_code;
        student_response.terms_and_condition_url =
          loginData.terms_and_condition_url;
        student_response.privacy_policy_url = loginData.privacy_policy_url;
        student_response.user_type = loginData.user_type;
        student_response.is_institute_type_school =
          loginData.is_institute_type_school;
        student_response.examdesk_auth_token = base64.encode(
          loginData.user_id +
            ":" +
            loginData.password +
            ":" +
            loginData.institute_id +
            ":" +
            loginData.account_id
        );
        student_response.scorecard_auth_token = base64.encode(
          loginData.phone_no +
            ":" +
            loginData.password +
            ":" +
            loginData.institute_id
        );
        student_response.extra = {
          enable_eLearn_feature:
            loginData.enable_eLearn_feature == 1 ? true : false,
          course_structure_flag: loginData.course_structure_flag,
          institute_setup_type: loginData.institute_setup_type,
          module_set_up: getSetUpArray(loginData.institute_setup_type),
          zoom_enabled:
            loginData._zoom_integration_enable !== undefined &&
            loginData._zoom_integration_enable !== null &&
            loginData._zoom_integration_enable == true
              ? true
              : false,
        };
        // D365 assignment key
        student_response.enable_online_assignment_feature =
          loginData.enable_online_assignment_feature;
        // D365 my  Product  key
        student_response.enable_eLearn_feature =
          loginData.enable_eLearn_feature;

        if (loginData.student_id) {
          student_response.student_id = loginData.student_id;
          student_response.student_display_id = loginData.student_display_id;
        }
        if (!allowed_user_type.includes(responseData.data.result.user_type)) {
          student_response.parent_name = responseData.data.result.name;
          student_response.parent_id = responseData.data.result.user_id;
          student_response.parent_num = responseData.data.mobile_no;
          student_response.parentslogin = true;
        }
        let student_auth = "";
        if (
          loginData.enable_single_device_login &&
          allowed_user_type.includes(loginData.user_type)
        ) {
          //SSO enabled
          student_auth = base64.encode(
            loginData.user_id +
              "|" +
              loginData.user_type +
              ":" +
              loginData.password +
              ":" +
              loginData.institute_id +
              "|" +
              loginData.acad_yr_id +
              ":" +
              loginData.device_id +
              ":" +
              "WEB"
          );
        } else if (allowed_user_type.includes(loginData.user_type)) {
          // SSO disabled
          student_auth = base64.encode(
            loginData.user_id +
              "|" +
              loginData.user_type +
              ":" +
              loginData.password +
              ":" +
              loginData.institute_id +
              "|" +
              loginData.acad_yr_id
          );
        } else if (loginData.student_details.length == 1) {
          //parent login
          let temp = loginData.student_details[0];

          student_auth = base64.encode(
            temp.user_id +
              "|" +
              temp.user_type +
              ":" +
              temp.password +
              ":" +
              temp.institute_id +
              "|" +
              loginData.acad_yr_id +
              ":" +
              loginData.device_id +
              ":WEB:1|5"
          );
          student_response.student_acad_year = temp.student_acad_year;
          student_response.photo_url = temp.photo_url;
          student_response.join_date = temp.join_date;
          student_response.user_id = temp.user_id;
          student_response.student_id = temp.student_id;
          student_response.student_display_id = temp.student_display_id;
          student_response.institute_id = temp.institute_id;
          student_response.institute_name = temp.institute_name;
          student_response.user_type = temp.user_type;
          student_response.name = temp.student_name;
          student_response.mobile_no = temp.phone_no;
          student_response.parentslogin = true;
          student_response.email_id = temp.email_id ? temp.email_id : "";
          student_response.examdesk_auth_token = base64.encode(
            temp.user_id +
              ":" +
              temp.password +
              ":" +
              temp.institute_id +
              ":" +
              temp.account_id
          );
          student_response.scorecard_auth_token = base64.encode(
            temp.phone_no + ":" + temp.password + ":" + temp.institute_id
          );
        }
        student_response.student_auth = student_auth;
        try {
          // Get the web access token
          const webAccessTokenURL = `/api/v1/institutes/webAccessToken/${loginData.institute_id}`;
          const webAccessTokenResponse = yield call(api.get, {
            url: webAccessTokenURL,
          });

          const auth_token = webAccessTokenResponse.data.result.auth_token;

          // Fetch academic years using the obtained auth_token

          const request = {
            url: `/api/v1/academicYear/all/${loginData.institute_id}`,
            headers: { Authorization: auth_token },
          };
          const acadYearResponse = yield call(api.getAuth, request);

          // Dispatch the success action with academic years
          yield put({
            type: "SET_ACAD_YEAR",
            acad_year_list: acadYearResponse.data,
            acad_yr_id: loginData.acad_yr_id,
          });
        } catch (error) {
          // Dispatch an error action or handle the error as needed
          console.error(error, "Error");
        }
        if (
          !allowed_user_type.includes(responseData.data.result.user_type) &&
          Array.isArray(responseData.data.result.student_details) &&
          responseData.data.result.student_details.length > 1
        ) {
          //if parent login with multiple student
          yield put({ type: "UPDATE_USER_DATA", data: student_response });
          yield put({ type: "SET_LOADER", loading: false });
          yield put({
            type: "SET_USER_ROLE_LIST",
            show_multi_user_selection: true,
            user_role_list: responseData.data.result.student_details,
            multi_user_type: "parent_student",
          });
        } else {
          //simple login

          //restrict single child parent login
          if (
            loginData?.student_details?.length == 1 &&
            loginData?.student_details[0]?.is_login_allowed != true
          ) {
            yield put({
              type: "LOGIN_ERROR",
              error_msg: "Kindly clear fees dues to successfully login.",
            });
          } else {
            yield put({ type: "LOGIN_SUCCESS", ...student_response });
          }
          // yield put({ type: "AY_STUDENTAUTH_INSTID_AYID", student_auth:student_auth, acad_yr_id:loginData.acad_yr_id, institute_id:loginData.institute_id})
        }
      }
    } else if (
      responseData.data.statusCode == 200 &&
      responseData.data.result == null
    ) {
      yield put({ type: "SET_LOADER", loading: false });
      alert(
        'You are not authorized to login here. If you are an institute admin please download Proctur Admin App or use "web.proctur.com"'
      );
    } else {
      yield put({ type: "LOGIN_ERROR", error_msg: responseData.data.message });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      yield put({
        type: "LOGIN_ERROR",
        error_msg: error.response.data.message,
      });
    } else {
      yield put({ type: "LOGIN_ERROR", error_msg: "Network Error" });
    }
  }
}

function* fetchAcadYears(action) {
  try {
    // Get the web access token
    const webAccessTokenURL = `/api/v1/institutes/webAccessToken/${action.instituteId}`;
    const webAccessTokenResponse = yield call(api.get, {
      url: webAccessTokenURL,
    });

    const auth_token = webAccessTokenResponse.data.result.auth_token;

    // Fetch academic years using the obtained auth_token
    const request = {
      url: `/api/v1/academicYear/all/${action.instituteId}`,
      token: auth_token,
    };
    const acadYearResponse = yield call(api.getAuth, request);

    // Dispatch the success action with academic years
    yield put({
      type: "SET_ACAD_YEAR",
      selectedAcadYear: {},
      acad_year_list: acadYearResponse.data,
    });
  } catch (error) {
    // Dispatch an error action or handle the error as needed
    console.error(error, "Error");
  }
}
