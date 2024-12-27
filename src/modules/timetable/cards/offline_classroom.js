import { useState} from 'react'
import teacher from '../../../assets/timetable/teacher_icon3.png'
import TtattendancePopups from '../timetable_cards_popups/offline_class_popup'
import Backdrop from '../../../components/backdrop'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../../../api/api'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { ErrorMessageHandling } from '../../../components/error'

function SchClass(props) {
  const [isopen5, closeisopen5] = useState(false)
  const [responseView, setResponse] = useState([])
  const [attendance, setAttend] = useState(0)
  const [total_class, setTotalClass] = useState([0])

  function TeacherPhoto()
  {
    var srcc=null
    var p_arr=[]
   
        if((props && props.data && props.data.t_photo_url  && props.data.t_photo_url.length && props.data.t_photo_url !="null" && props.data.t_photo_url !=null) )
        {
           if(props.data.t_photo_url.split(",").length>0)
           {
             p_arr=props.data.t_photo_url.split(",")
           }
        }
        srcc = p_arr.find(data => (data != null && data !="null"));  
   if(!srcc){
      srcc=teacher
    }
return srcc
  }

  function del5() {
    closeisopen5(true)
  }
  function close5() {
    closeisopen5(false)
  }
  function ViewAPI() {
    let request = {
      url: `/api/v1/reports/Student/attendance/${props.auth.student_id}/${props.data.batch_id}`,
      token: props.auth.student_auth,
      data: {
        batch_id: props.data.batch_id,
        standard_id: -1,
        subject_id: -1,
        teacher_id: -1,
        type: 1,
        startdate: '',
        enddate: '',
        institute_id: props.auth.institute_id,
        student_id: props.auth.student_id,
      },
    }
    props.setLoader(true)
    api
      .postAuth(request)
      .then((response) => {
        setResponse(response.data)
        props.setLoader(false)
      })
      .catch((error) => {
        props.setLoader(false)
        if (error && error.response && error.response.status == 403) {
          { props.dispatch({ type: 'LOGOUT', msg:error.response.data.message }) }
      } else if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
          
          // window.location = '/dashboard'
      } else {
          toast.error(ErrorMessageHandling(error));
          
      }

      })
  }

  function Attendanc() {
    var attend_array = responseView.filter((d) => d.status !== 'A')
    setAttend(attend_array.length)
    setTotalClass(responseView.length)
    // setPercent(Number((attendance/total_class)*100))
  }

  return (
    <div>
      <ToastContainer />
      <div className='callendar_next_each_class_div'>
        <div className='each_class_timings'>
          <div className='class_moto_1'>Classroom</div>
          <p>
            <h5 title={props.data.start_time
                ? props.data.start_time.length > 15
                  ? props.data.start_time
                  : props.data.start_time
                : '-'}>
              {props.data.start_time
                ? props.data.start_time.length > 15
                  ? props.data.start_time.substring(0, 14) + '....'
                  : props.data.start_time
                : '-'}
            </h5>
          </p>
          <p></p>
          <p>
            <h6 title={props.data.duration
                ? props.data.duration.length > 6
                  ? props.data.duration
                  : props.data.duration + ' mins'
                : '-'}>
              {props.data.duration
                ? props.data.duration.length > 6
                  ? props.data.duration.substring(0, 6) + '....'
                  : props.data.duration + ' mins'
                : '-'}
            </h6>
          </p>
        </div>
        <div className='batch_vertical_div_container'>
          <div className='batch_vertical_div'></div>
        </div>
        <div className='subject_teacher_etc'>
          <div className='batch_subject_div'>
            <div className='batch_div'>
              <h6>Subject</h6>
              <p>
                <h4 title={props.data.subject_name
                    ? props.data.subject_name.length > 45
                      ? props.data.subject_name
                      : props.data.subject_name
                    : '-'}>
                  {props.data.subject_name
                    ? props.data.subject_name.length > 45
                      ? props.data.subject_name.substring(0, 44) + '....'
                      : props.data.subject_name
                    : '-'}
                </h4>
              </p>
            </div>

         
            <div className='batch_div'>
              {( 
                 !props.auth.is_institute_type_school  &&  
              <h6>Batch</h6>
              )}
            {(  
              !props.auth.is_institute_type_school  &&  
                <p>
                <h4 title={props.data.course
                    ? props.data.course.length > 45
                      ? props.data.course
                      : props.data.course
                    : '-'}>
                  {props.data.course
                    ? props.data.course.length > 45
                      ? props.data.course.substring(0, 44) + '....'
                      : props.data.course
                    : '-'}
                </h4>
              </p>
              )}
            </div>
            
          </div>

          <div className='teacher_attendance_div'>
            <div className='tt_teacher_div'>
              <div className='tt_teacher_image' >
                <img src={TeacherPhoto()} height='30px' style={{borderRadius:"15px"}}></img>
              </div>
              &nbsp;
              <div className='tt_teacher_name' style={{wordBreak:"break-word"}} title={props.data.teacher_name
                  ? props.data.teacher_name.length > 45
                    ? props.data.teacher_name
                    : props.data.teacher_name
                  : '-'}>
                &nbsp;
                {props.data.teacher_name
                  ? props.data.teacher_name.length > 45
                    ? props.data.teacher_name.substring(0, 44) + '...'
                    : props.data.teacher_name
                  : '-'}

              </div>
            </div>
            <div className='tt_class_attendance_div'>

              <div className='tt_attendance_and_progress_bar'>
                &nbsp;&nbsp;
                <div className='tt_teacher_name'>Attendance&nbsp;</div>
                <div className='percent_progress_tt_parent'>
                  <div className='percent_progress_tt'>
                    <div className='percent_progress_inner' >
                      <div className='tt_progress_bar' 
                      // style={{border:"1px solid pink"}}
                      >
                        <CircularProgressbar
                          value={props.data.student_attendance_percent}
                          onClick={del5}
                        />
                      </div>
                      <div className='circular_progress_digit' style={{marginTop:"1px",width:"100%",textAlign:"center"}} >
                        {props.data.student_attendance_percent}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='tt_attendance_button'>
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    del5()
                    ViewAPI()
                    Attendanc()
                  }}
                >
                  View
                </button>

                {isopen5 && (
                  <TtattendancePopups
                    course_for_batch={props.data.course}
                    responseView={responseView}
                    attend={{ attendance, total_class }}
                    onCancel={close5}
                    loading={props.loading}
                    setLoader={props.setLoader}
                  />
                )}
                {isopen5 && <Backdrop onCancel={close5} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(SchClass)
