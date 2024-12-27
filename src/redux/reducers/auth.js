// import imgprofile from '../../assets/profile/profile_image2.png'
// // import ProfileImage from '../../modules/profile/profile_image2';
import Alerts from "../../services/Alert";
import { encode, decode } from "base-64";

const initialState = {
  alert_flag: false,
  alert_msg: "",
  parent_name: "",
  parent_id: "",
  parent_num: "",
  parentslogin: false,
  logindatetime: "",
  account_id: 0,
  ay_end_date: "",
  ay_start_date: "",
  student_acad_year: [],
  // d365
  inst_set_up: [],
  enable_online_assignment_feature: "",
  enable_eLearn_feature: "",
  email_id: "",
  examdesk_auth_token: "",
  scorecard_auth_token: "",
  inst_announcement: "",
  institute_id: "",
  is_institute_type_school: "",
  name: "",
  password: "",
  student_auth: "",
  fg_page_url: "",
  instagram_url: "",
  whatsapp_url: "",
  privacy_policy_url: "",
  terms_and_condition_url: "",
  help_url: "",
  linkedin_url: "",
  youtube_url: "",
  user_id: 0,
  course_structure_flag: 0, // course or batch module
  userDataTest: {},
  is_institute_type_school: 0,
  student_auth: "",
  user_info: {},
  enable_eLearn_feature: false,
  testprep_enabled: false,
  is_fee_struct_linked: false,
  examdesk_auth_token: "",
  examdesk_old_auth_token: "",
  student_id: 0,
  student_display_id: "",
  institute_setup_type: 0,
  loading: false,
  error: false,
  error_msg: "",
  timestamp: 0,
  institute_name: "",
  logo_url: "",
  device_id: "",
  show_multi_user_selection: false,
  user_role_list: [],
  user_type: -72344,
  stud_id: -1,
  // profile_pic: "",
  student_phone_no: -1,
  student_phone: -1,
  photo_url: "",
  join_date: "",
  prodUrl: "",
  country_calling_code: "",

  acad_yr_id: -1,
  selectedAcadYear: {},
  selectedAcadYrId: "",
  acad_year_list: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        acad_yr_id: action.acad_yr_id,
        logindatetime: new Date(),
        parentslogin: action.parentslogin,
        parent_num: action.parent_num,
        parent_name: action.parent_name,
        parent_id: action.parent_id,
        account_id: action.account_id,
        email_id: action.email_id,
        examdesk_auth_token: action.examdesk_auth_token,
        scorecard_auth_token: action.scorecard_auth_token,
        institute_id: action.institute_id,
        is_institute_type_school: action.is_institute_type_school,
        name: action.name,
        password: action.password,
        student_auth: action.student_auth,
        user_id: action.user_id,
        inst_set_up: action.inst_set_up,
        ay_end_date: action.ay_end_date,
        ay_start_date: action.ay_start_date,
        student_acad_year: action?.student_acad_year,
        // d365 set key
        enable_eLearn_feature: action.enable_eLearn_feature,
        enable_online_assignment_feature:
          action.enable_online_assignment_feature,
        stud_id: action.student_id,
        fg_page_url: action.fg_page_url,
        instagram_url: action.instagram_url,
        linkedin_url: action.linkedin_url,
        help_url: action.help_url,
        whatsapp_url: action.whatsapp_url,
        youtube_url: action.youtube_url,
        terms_and_condition_url: action.terms_and_condition_url,
        privacy_policy_url: action.privacy_policy_url,
        error: false,
        error_msg: "",
        timestamp: Date.now(),
        student_id: action.student_id,
        student_display_id: action.student_display_id,
        institute_name: action.institute_name,
        logo_url: action.logo_url,
        user_type: action.user_type,
        student_phone_no: action.mobile_no,
        student_phone: action.student_phone,
        // profile_pic: action.profile_pic,
        photo_url: action.photo_url,
        join_date: action.join_date,
        inst_announcement: action.inst_announcement,
        prodUrl: action.prodUrl,
        country_calling_code: action.country_calling_code,
        ...action.extra,
      };
    }
    case "LOGIN_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }
    case "LOGIN_ERROR": {
      return {
        ...state,
        loading: false,
        error: true,
        timestamp: Date.now(),
        error_msg: action.error_msg
          ? action.error_msg
          : "Invailid Login Details",
        user_id: 0,
        password: 0,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("isAlreadyLogin");
      let msg = action?.msg ?? "";
      return {
        alert_flag: msg.indexOf(": app_link :") !== -1,
        alert_msg: msg,
        account_id: 0,
        email_id: "",
        examdesk_auth_token: "",
        institute_id: "",
        is_institute_type_school: "",
        name: "",
        password: "",
        student_auth: "",
        user_id: 0,
        course_structure_flag: 0,
        institute_name: "",
        logo_url: "",
        device_id: state.device_id,
        acad_year_list: [],
        selectedAcadYear: {},
        selectedAcadYrId: "",
        student_acad_year: [],
      };
    }

    case "SET_DEVICE_ID": {
      return { ...state, device_id: action.device_id };
    }

    case "SET_LOADER": {
      return { ...state, loading: action.loading };
    }

    case "SET_USER_ROLE_LIST": {
      return {
        ...state,
        show_multi_user_selection: action.show_multi_user_selection,
        user_role_list: action.user_role_list,
        multi_user_type: action.multi_user_type,
      };
    }
    case "PROFILE_INFO": {
      return {
        ...state,
        photo_url: action.to_state_profile_pic,
      };
    }

    case "UPDATE_USER_DATA": {
      return { ...state, ...action.data };
    }
    case "UPDATE_ALERT": {
      return {
        alert_flag: false,
        alert_msg: "",
        account_id: 0,
        email_id: "",
        examdesk_auth_token: "",
        institute_id: "",
        is_institute_type_school: "",
        name: "",
        password: "",
        student_auth: "",
        user_id: 0,
        course_structure_flag: 0,
        institute_name: "",
        logo_url: "",
        device_id: state.device_id,
      };
    }

    case "UNSET_ACAD_YEAR_ID": {
      return {
        ...state,
        selectedAcadYrId: "0",
      };
    }

    case "SWITCH_ACAD_YEAR_NEW": {
      const { acadYearObj } = action;
      const authDecode = decode(state.student_auth);
      const temp = authDecode.split(":");
      temp.splice(2, 1, `${state.institute_id}|${acadYearObj}`);
      const newStudentAuth = encode(temp.join(":"));
      setTimeout(() => {
        action.dashNavigate();
      }, 400);
      return {
        ...state,
        selectedAcadYrId: acadYearObj,
        student_auth: newStudentAuth,
      };
    }

    case "SET_ACAD_YEAR": {
      const selectedAcadYear = action.acad_year_list?.find(
        (item) => item.inst_acad_year_id === action.acad_yr_id
      );
      return {
        ...state,
        acad_year_list: action.acad_year_list,
        selectedAcadYear: selectedAcadYear,
      };
    }

    case "UPDATE_ACAD_YEAR": {
      return { ...state, selectedAcadYear: action.selectedAcadYear };
    }

    case "SWITCH_ACAD_YEAR": {
      const { acadYearObj } = action;
      if (acadYearObj) {
        const authDecode = decode(state.student_auth);
        const temp = authDecode.split(":");
        temp.splice(
          2,
          1,
          `${state.institute_id}|${acadYearObj.inst_acad_year_id}`
        );
        const newStudentAuth = encode(temp.join(":"));
        setTimeout(() => {
          action.dashNavigate();
        }, 400);
        return {
          ...state,
          selectedAcadYear: acadYearObj,
          student_auth: newStudentAuth,
        };
      }
    }

    default: {
      return { ...state };
    }
  }
}

export default reducer;
