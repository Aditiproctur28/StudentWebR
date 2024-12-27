import Header from '../../components/header/index'
import profile_img2 from '../../assets/profile/profile_image2.png'
import lock_icon from '../../assets/profile/lock.png'
import email2_icon from '../../assets/profile/email2_icon.png'
import phone from '../../assets/profile/phone.png'
import location_icon from '../../assets/profile/location_icon.png'
import education_icon1 from '../../assets/profile/education_icon1.png'
import profile_icon1 from '../../assets/profile/profile_icon1.png'
import parent from '../../assets/profile/parent_icon.png'
import check from '../../assets/profile/profile_check_icon.png'
import pencil from '../../assets/profile/edit_pencil.png'
import Backdrop from '../../components/backdrop'
import EditAddress from '../profile/profile_popups/edit_address_popup'
import { useState, useEffect, useRef } from 'react'
import EditBirthPlace from '../profile/profile_popups/popup_edit_birth_place'
import ChangePassword from '../profile/profile_popups/password_popup'
import EditBloodGroup from '../profile/profile_popups/popup_edit_blood'
import EditDOB from '../profile/profile_popups/popups_edit_dob'
import { connect } from 'react-redux'
import api from '../../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorMessageHandling } from '../../components/error'
import ErrorBackdrop from '../../components/error_backdrop'

function Profile2(props) {
  const [isopen, setisopen] = useState(false)
  const [isopen1, setisopen1] = useState(false)
  const [isopen2, setisopen2] = useState(false)
  const [isopen3, setisopen3] = useState(false)
  const [isopen4, setisopen4] = useState(false)
  var [error_backdrop_on, setErrorBackdrop] = useState(false)
  const [photo_change_clicked, setPhotoClicked] = useState(false)
  const [profile_data, setprofile_data] = useState({ user_name: props.auth.name, joining_date: '-', mobile_no: '-', address: '-', email_id: '-', class: '-', course: '-', roll_no: '-', mother_tongue: '-', gender: '-', country: '-', birth_place: '-', religion: '-', blood_group: '-', adhar_id: '-', dob: '-', address_state: '-', p_name: '-', p_email: '-', p_profession: '-', guardian_mobile_no: '-', residential_address: '-', parent_contact: '-', parent_adhar_id: '-', guardian_name: '-', guardian_email: '-', photos: props.auth.photo_url ? props.auth.photo_url : profile_img2, photos2: "", })

  function HandleErrorBackdrop() { setErrorBackdrop(false); window.location = '/dashboard' }
  function del() { setisopen(true) }
  function close() { setisopen(false) }
  function del1() { setisopen1(true) }
  function close1() { setisopen1(false) }
  function del2() { setisopen2(true) }
  function close2() { setisopen2(false) }
  function del3() { setisopen3(true) }
  function close3() { setisopen3(false) }
  function del4() { setisopen4(true) }
  function close4() { setisopen4(false) }

  useEffect(() => { AutoLoad() }, [])

  function AutoLoad() {
    if (props.auth.user_type === 1) {
      let request = {
        url: `/api/v1/students/get-student-detail/${props.auth.institute_id}/${props.auth.stud_id}`,
        token: props.auth.student_auth,
      }
      api
        .getAuth(request)
        .then((response) => {
          setprofile_data({
            ...profile_data,
            joining_date: '-',
            mobile_no: response.data.result.student_phone ? response.data.result.student_phone : '-',
            address: response.data.result.current_address ? response.data.result.current_address : '-',
            email_id: props.auth.user_type != 1 ? props.auth.email_id ? props.auth.email_id : "-" : response.data.result.student_email ? response.data.result.student_email : "-",
            class: response.data.result.standard ? response.data.result.standard : '-',
            course: response.data.result.assignedCourses ? response.data.result.assignedCourses : '-',
            roll_no: response.data.result.roll_no && response.data.result.roll_no != 0 ? response.data.result.roll_no : '-',
            mother_tongue: response.data.result.mother_tongue && response.data.result.mother_tongue != -1 ? response.data.result.mother_tongue : '-',
            gender: response.data.result.gender ? response.data.result.gender : '-',
            country: response.data.result.country ? response.data.result.country : '-',
            birth_place: response.data.result.birth_place ? response.data.result.birth_place : '-',
            religion: response.data.result.religion ? response.data.result.religion : '-',
            blood_group: response.data.result.blood_group && response.data.result.blood_group != -1 ? response.data.result.blood_group : '-',
            adhar_id: response.data.result.student_adhar_card ? response.data.result.student_adhar_card : '-',
            dob: response.data.result.dob ? response.data.result.dob.substr(8, 10) + '-' + response.data.result.dob[5] + response.data.result.dob[6] + '-' + response.data.result.dob.substr(0, 4) : '-',
            address_state: response.data.result.state ? response.data.result.state : '-',
            p_name: response.data.result.parent_name ? response.data.result.parent_name : '-',
            p_email: response.data.result.parent_email ? response.data.result.parent_email : '-',
            p_profession: response.data.result.parent_profession && response.data.result.parent_profession != -1 ? response.data.result.parent_profession : '-',
            guardian_mobile_no: response.data.result.guardian_phone ? response.data.result.guardian_phone : '-',
            residential_address: response.data.result.permanent_address ? response.data.result.permanent_address : '-',
            parent_contact: response.data.result.parent_phone ? response.data.result.parent_phone : '-',
            parent_adhar_id: response.data.result.parent_adhar_card ? response.data.result.parent_adhar_card : '-',
            guardian_name: response.data.result.guardian_name ? response.data.result.guardian_name : '-',
            guardian_email: response.data.result.guardian_email ? response.data.result.guardian_email : '-',
            student_profile_update_restrict: response.data.result.student_profile_update_restrict,
            // photos: response.data.result.student_photo?response.data.result.student_photo:"",
            // photos2:response.data.result.student_photo?response.data.result.student_photo:"",
          })
        })
        .catch((error) => {
          if (error && error.response && error.response.status == 403) {
            { props.dispatch({ type: 'LOGOUT' }) }
          } else if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message)
            setErrorBackdrop(true)
          } else { toast.error(ErrorMessageHandling(error)); }
        })
    }
    else { setprofile_data({ ...profile_data, mobile_no: props.auth.student_phone ? props.auth.student_phone : "-", email_id: props.auth.email_id ? props.auth.email_id : "-", }) }
  }

  function getBase64(file) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () { }
    reader.onloadend = function () {
      let photo = reader.result;
      photo = photo.split("base64,")[1];
      setprofile_data({ ...profile_data, photos: reader.result })
      let request = {
        url: `/api/v1/profiles/update/${props.auth.institute_id}/${props.auth.user_id}`,
        token: props.auth.student_auth,
        data: { photo, },
      }
      api
        .putAuth(request)
        .then((data) => {
          toast.success('profile picture updated successfully')
          props.dispatch({
            type: 'PROFILE_INFO',
            to_state_profile_pic: reader.result,
          })
          // window.location.reload(true);
        })
        .catch((error) => {
          if (error && error.response && error.response.status == 403) {
            { props.dispatch({ type: 'LOGOUT', msg: error.response.data.message }) }
          } else if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message)
          } else { toast.error(ErrorMessageHandling(error)); }
        })
    }
    reader.onerror = function (error) { setprofile_data({ ...profile_data, photo: '' }) }
  }
  function upload_file(e) {
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      getBase64(file) // prints the base64 string
    }
  }

  return (
    <>
      <ToastContainer />
      {error_backdrop_on && <ErrorBackdrop onCancel={HandleErrorBackdrop} />}
      <Header />
      <div className='entire_profile_page_container'>
        <div className='inner_container'>
          <div className='profile_top_div'>
            <div className='profile_top_div_subdiv1'>
              <div className='image_first_div_horizontal'>
                <div className='image_first_div_horizontal_inner_container'>
                  <center>
                    <div style={{ flex: 1 }}>
                      <div className='image_div' style={{ width: 95, height: 95, margin: 'auto' }} >
                        {props.auth.user_type == 1 && profile_data.student_profile_update_restrict && <img style={{ cursor: 'pointer' }} className='profile_check_icon' src={check}
                          onClick={() => { setPhotoClicked(true); document.getElementById('imageInput').click() }}
                        ></img>}
                        <input type='file' id='imageInput' style={{ display: 'none' }} name='myFile' accept=' image/*' onChange={upload_file} />
                        <img id='profile_photo_temp' src={profile_data?.photos} // ? profile_data.photos : profile_img2
                        ></img>
                      </div>
                    </div>
                    <div className='image_text_div_container'>
                      <center>
                        <div className='image_text_div_inner_container' onClick={del1} style={{ cursor: 'pointer' }} >
                          <div className='lock_icon'>
                            <img src={lock_icon}></img> &nbsp;
                          </div>
                          <div className='image_text_div'>Change Password</div>
                        </div>
                      </center>
                    </div>
                    {isopen1 && <ChangePassword onCancel={close1} />}
                    {isopen1 && <Backdrop onCancel={close1} />}
                  </center>
                </div>
              </div>
              <div className='image_second_div_horizontal'>
                <div className='image_second_divs_container'>
                  <div className='student_name'>
                    {/* <h6>Student Name:</h6> */}
                  </div>
                  <div className='darlene_robertsene'>
                    {profile_data.user_name}
                  </div>
                  <div className='joined_date'>
                    <h6>Joined Date:</h6>
                  </div>
                  <div className='joined_date_digit'>
                    <h4>{props.auth.join_date ? props.auth.join_date.split("-").reverse().join("-") : "-"}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className='profile_top_div_subdiv2'>
              <div className='profile_page_vertical_div1_container'>
                <span className='profile_span'>
                  <div className='profile_page_vertical_div1'></div>
                </span>
              </div>
              <div className='image_third_div_horizontal'>
                <div className='third_div_container'>
                  <div className='mobile_no_texts'>
                    <h6>Contact No:</h6>
                  </div>
                  <div className='contact_icons_n_digits'>
                    <div className='contact_icon'>
                      {' '}
                      <img src={phone} />
                    </div>
                    &nbsp;
                    <div className='mobile_no_digits'>
                      <div>
                        <h4>&nbsp;&nbsp;&nbsp;{profile_data.mobile_no}</h4>
                      </div>
                    </div>
                  </div>
                  <div className='email_id'>
                    <h6>Email Id:</h6>
                  </div>
                  <div className='email_icons_n_digits'>
                    <div className='email_icon'>
                      <img src={email2_icon} />
                    </div>
                    &nbsp;
                    <div title={profile_data.email_id && profile_data.email_id != "-" && profile_data.email_id} className='profile_user_p_email'>
                      <div style={{ wordBreak: "break-word" }}>
                        {(profile_data.email_id && profile_data.email_id != "-" && profile_data.email_id.length) ? (profile_data.email_id.length < 47 ? profile_data.email_id : profile_data.email_id.substr(0, 47) + "...") : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='profile_page_vertical_div2_container'>
                <span>
                  <div className='profile_page_vertical_div2'></div>
                </span>
              </div>
              <div className='image_fourth_div_horizontal'>
                <div className='fourth_n_top_div'>
                  <div className='fourth_div_container' style={{ wordBreak: "break-word" }}>
                    <div className='address'>
                      <h6>
                        Address&nbsp;
                        {profile_data.student_profile_update_restrict && <img className='edit_addr' src={pencil} onClick={del} style={props.auth.user_type == 1 ? { cursor: 'pointer' } : { display: 'none' }} />}
                      </h6>
                      {isopen && (<EditAddress onCancel={close} profile_data={profile_data} setprofile_data={setprofile_data} />)}
                      {isopen && <Backdrop onCancel={close} />}
                    </div>
                    <div className='address_icons_n_digits'>
                      <div className='address_icon'>
                        <img src={location_icon} />
                      </div>
                      &nbsp;
                      <div title={profile_data.address && profile_data.address != "-" && profile_data.address.length && profile_data.address.length > 100 && profile_data.address} className='address_text'>
                        {profile_data.address.substr(0, 100)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='profile_bottom_div'>
            <div className='bottom_div_inner_container'>
              <div className='education_info_profile'>
                <div className='education_info_inner_container'>
                  <div className='heading'>
                    <div className='education_icon'>
                      <img src={education_icon1}></img>
                    </div>
                    <div className='education_text_container'>
                      <div className='education_info_text'>EDUCATION INFO</div>
                      <div className='dull_line'></div>
                    </div>
                    <div className='dully_horizontal_line1'></div>
                  </div>
                  <div className='class_course_board_container'>
                    <div className='class_n_10th'>
                      <div className='class_n_10th_text'>
                        <h6> {props.auth.user_type == 99 || !props.auth.is_institute_type_school ? 'Standard(s)' : ' Standard'} </h6>
                        <p> <h4> {props.auth.user_type == 99 ? '-' : profile_data.class.substr(0, 20)} </h4> </p>
                      </div>
                    </div>
                    <div className='course_n_neet'>
                      <div className='course_n_neet_text'>
                        <h6> {props.auth.user_type == 99 || !props.auth.is_institute_type_school ? 'Batch(s)' : 'Section'} </h6>
                        <p>
                          <h4 title={props.auth.user_type == 99 ? '-' : profile_data.course}>
                            {props.auth.user_type == 99 ? '-' : (profile_data.course.length > 19 ? profile_data.course.substr(0, 19) + "..." : profile_data.course)}
                          </h4>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='profile'>
                <div className='profile_inner_container'>
                  <div className='heading'>
                    <div className='profile_icon'>
                      <img src={profile_icon1}></img>
                    </div>
                    <div className='profile_text_container'>
                      <div className='profile_text'>PROFILE</div>
                      <div className='dull_line_2'></div>
                    </div>
                  </div>
                  <div className='small_div_container'>
                    <div className='profile_page_small_div2'>
                      {props.auth.is_institute_type_school && (
                        <div className='small_blocks'>
                          <h6>Roll No:</h6>
                          <p><h4>{props.auth.is_institute_type_school ? profile_data.roll_no.substr(0, 10) : '-'}</h4></p>
                        </div>
                      )}
                      <div className='small_blocks'>
                        <h6>Mother tongue :</h6>
                        <p><h4>{profile_data.mother_tongue.substr(0, 15)}</h4> </p>
                      </div>
                      <div className='small_blocks'>
                        <h6>Gender :</h6>
                        <p><h4>{profile_data.gender.substr(0, 10)}</h4> </p>
                      </div>
                      <div className='small_blocks'>
                        <h6>Country : </h6>
                        <p> <h4>{profile_data.country.substr(0, 15)}</h4> </p>
                      </div>
                    </div>
                    <div className='profile_page_vertical_div3_container' style={{ display: 'none' }}  >
                      <span> <div className='profile_page_vertical_div3'></div> </span>
                    </div>
                    <div className='profile_page_small_div3'>
                      <div className='small_blocks'>
                        <h6> Birth Place{' '}
                          {profile_data.student_profile_update_restrict&&<img src={pencil} onClick={del2} style={props.auth.user_type == 1 ? { cursor: 'pointer' } : { display: 'none' }} />}
                        </h6>
                        {isopen2 && (<EditBirthPlace onCancel={close2} profile_data={profile_data} setprofile_data={setprofile_data} />)}
                        {isopen2 && <Backdrop onCancel={close2} />}
                        <p>  <h4>{profile_data.birth_place}</h4> </p>
                      </div>
                      <div className='small_blocks'>
                        <h6>Religion :</h6>
                        <p>  <h4>{profile_data.religion.substr(0, 12)}</h4> </p>
                      </div>
                      <div className='small_blocks'>
                        <h6>  Blood Group{' '} {profile_data.student_profile_update_restrict&&<img src={pencil} onClick={del3} style={props.auth.user_type == 1 ? { cursor: 'pointer' } : { display: 'none' }} />}
                        </h6>
                        {isopen3 && (<EditBloodGroup onCancel={close3} profile_data={profile_data} setprofile_data={setprofile_data} />)}
                        {isopen3 && <Backdrop onCancel={close3} />}
                        <p>  <h4> {profile_data.blood_group === -1 || profile_data.blood_group === '-1' ? '-' : profile_data.blood_group}  </h4> </p>
                      </div>
                    </div>
                    <div className='profile_page_vertical_div3_container' style={{ display: 'none' }} >
                      <span> <div className='profile_page_vertical_div3'></div>  </span>
                    </div>
                    <div className='profile_page_small_divs'>
                      <div className='small_blocks'>
                        <h6>Aadhar ID :</h6>
                        <p> <h4>{profile_data.adhar_id}</h4>  </p>
                      </div>
                      <div className='small_blocks'>
                        <h6>  Date of Birth{' '}
                        {profile_data.student_profile_update_restrict&&<img src={pencil} onClick={del4} style={props.auth.user_type == 1 ? { cursor: 'pointer' } : { display: 'none' }} />}
                        </h6>
                        {isopen4 && (<EditDOB onCancel={close4} profile_data={profile_data} setprofile_data={setprofile_data} />)}
                        {isopen4 && <Backdrop onCancel={close4} />}
                        <p> <h4>{(profile_data.dob !== '-' && profile_data.dob !== "01-01-1900") ? profile_data.dob : '-'}</h4></p>
                      </div>
                      <div className='small_blocks'>
                        <h6>State :</h6>
                        <p><h4>{profile_data.address_state.substr(0, 15)}</h4></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='parent'>
                <div className='parent_inner_container'>
                  <div className='heading'>
                    <div className='parent_icon'>
                      <img src={parent}></img>
                    </div>
                    <div className='parent_text_container'>
                      <div className='parent_text'>PARENT</div>
                      <div className='dull_line_3'></div>
                    </div>
                  </div>
                  <div className='parent_bottom_divs_containerr'>
                    <div className='small_div_container'>
                      <div className='parent_page_small_divs'>
                        <div className='parent_small_blocks'>
                          {props.auth.is_institute_type_school ? <h6>Father Name :</h6> : <h6>Parent Name :</h6>}
                          <p>
                            <h4>{profile_data.p_name.substr(0, 15)}</h4>
                          </p>
                        </div>
                        <div className='parent_small_blocks'>
                        {props.auth.is_institute_type_school ? <h6>Father Email:</h6> : <h6>Parent Email:</h6>}
                          <p>
                            <div className='profile_p_email' style={{ wordBreak: "break-word" }} title={profile_data.p_email && profile_data.p_email != "-" && profile_data.p_email}>
                              {(profile_data.p_email && profile_data.p_email != "-" && profile_data.p_email.length) ? (profile_data.p_email.length < 37 ? profile_data.p_email : profile_data.p_email.substr(0, 37) + "...") : "-"}
                            </div>
                          </p>
                        </div>
                        <div className='parent_small_blocks'>
                        {props.auth.is_institute_type_school ?<h6>&nbsp;Father Profession:</h6>: <h6>&nbsp;Parent Profession:</h6>}
                          <p><h4>{profile_data.p_profession.substr(0, 12)}</h4></p>
                        </div>
                        <div className='parent_small_blocks'>
                          <h6>Guardian Contact nO. :</h6>
                          <p><h4>{profile_data.guardian_mobile_no.substr(0, 15)}</h4></p>
                        </div>
                      </div>
                      <div className='parent_page_small_divs'>
                        <div className='parent_small_blocks'>
                        {props.auth.is_institute_type_school ? <h6>Father Contact :</h6> : <h6>Parent Contact :</h6>}
                          <p><h4>{profile_data.parent_contact.substr(0, 15)}</h4></p>
                        </div>
                        <div className='parent_small_blocks'>
                        {props.auth.is_institute_type_school ?   <h6>Father Aadhar ID: </h6>:   <h6>Parent Aadhar ID: </h6>}
                          <p><h4>{profile_data.parent_adhar_id.substr(0, 12)} </h4> </p>
                        </div>
                        <div className='parent_small_blocks'>
                          <h6>Guardian Name :</h6>
                          <p><h4>{profile_data.guardian_name.substr(0, 15)}</h4> </p>
                        </div>
                        <div className='parent_small_blocks'>
                          <h6>Guardian Email :</h6>
                          <p>
                            <div className='profile_p_email' style={{ wordBreak: "break-word" }} title={profile_data.guardian_email && profile_data.guardian_email != "-" && profile_data.guardian_email}>
                              {(profile_data.guardian_email && profile_data.guardian_email != "-" && profile_data.guardian_email.length) ? (profile_data.guardian_email.length < 37 ? profile_data.guardian_email : profile_data.guardian_email.substr(0, 37) + "...") : "-"}
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='profile_n_parent_bottom'>
                      <h6>Residential Address:</h6>
                      <p> <h4> {profile_data.residential_address.substr(0, 75)} </h4> </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(Profile2)