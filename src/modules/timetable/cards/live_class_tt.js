import { useState, useEffect } from 'react'
import teacher from '../../../assets/timetable/teacher_icon3.png'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../../../api/api'
import 'react-circular-progressbar/dist/styles.css'
import { ErrorMessageHandling } from '../../../components/error'
import View_Records from '../../liveClass/View_Records/View_Record'
import PopUpVimeo from '../../../components/popupVimeo/vimeo'
import { duration } from 'moment'

function SchLiveClass(props) {
  var complete_digit_array= {0:'00',1: '01',2: '02', 3: '03',4: '04',5: '05', 6: '06',7: '07',8: '08', 9: '09', 10: '10',11: '11', 12: '12', 13: '13',14: '14',15: '15',16: '16', 17: '17', 18: '18', 19: '19',20: '20', 21: '21',22: '22', 23: '23',24: '24', 25: '25',26: '26',27: '27',28: '28', 29: '29', 30: '30', 31: '31', } 
  var is_join_btn_clickable=false
  var view_or_join_btn="view"
  var duration=""

  const [isopen5, closeisopen5] = useState(false)
  const [isopen6, closeisopen6] = useState(false)
  //UU
  const [isOpen, setIsOpen] = useState(false)
  const [vimeo_download_links, setvimeo_download_links] = useState('')
  const [open_modal, setopen_modal] = useState(false)
  let view = props.view_download_links.length === 0 ? false : true
  const join = () => {
    let request = {
      url: `/api/v1/meeting_manager/session/start/${props.auth.institute_id}/${
        props.data.session_id
      }?isZoomLiveClass=${props.data.live_meeting_with == 'Zoom' ? 1 : 0}`,
      token: props.auth.student_auth,
    }
    api.getAuth(request).then((data) => {
      data.data.result.allow_start_session
        ? window.open(props.data.session_link, '_blank')
        : alert('You cannot start the class as the classes can only be started after the scheduled time.'  )
    })
    .catch((error) => {
      if (error && error.response && error.response.status == 403) {
        { props.dispatch({ type: 'LOGOUT' }) }
    } else if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
        window.location = '/dashboard'
    } else { toast.error(ErrorMessageHandling(error));}
    })
  }
  //UU
  
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
 
  Status() // LIVE CLASS STATUS FUNCTION 

  //U
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  const vimeoDownlode = (url, open) => {
    togglePopup()
    setvimeo_download_links(url)
    setopen_modal(open)
  }
  //U

  function del6() {
    closeisopen6(true)
  }

  function close6() {
    closeisopen6(false)
  }
  return (
    <div className='callendar_next_each_class_div'>
      <div>
        {open_modal && (
          <PopUpVimeo open_modal={setopen_modal} vimeo_download_links={vimeo_download_links} />
        )}
      </div>
      {isOpen && (
        <View_Records
          handleClose={togglePopup}
          view_download_links={props.view_download_links}
          view_proctur_live_recorded_session={
            props.api_response.data.result.view_proctur_live_recorded_session
          }
          vimeo_video_downlodable={
            props.api_response.data.result.vimeo_video_downlodable
          }
          proctur_live_view_or_download_visibility={
            props.api_response.data.result
              .proctur_live_view_or_download_visibility
          }
          vimeoDownlode={vimeoDownlode}
        />
      )}

      {/* U///////// */}
      <div className='each_class_timings'>
        <div className='class_moto_3'>Live Class</div>
        <p>
          <h5 title={props.data.start_time ?  props.data.start_time : '-'}>
            {props.data.start_time ? props.data.start_time.length > 15 ? props.data.start_time + '....'  : props.data.start_time : '-'}
          </h5>
        </p>
        <p></p>
        <p>
          <h6>
            {duration?duration: '-' }
          </h6>
        </p>
      </div>

      <div className='batch_vertical_div_container'>
        <div className='batch_vertical_div'></div>
      </div>

      <div className='subject_teacher_etc'>
        <div className='batch_subject_div'>
          <div className='batch_div'>
            {' '}
            <h6>Session Name</h6>
            <p>
              <h5 title= {props.data.session_name ? props.data.session_name : '-'}>
                  {props.data.session_name  ? props.data.session_name.length > 45 ? props.data.session_name.substring(0, 44) + '....' : props.data.session_name  : '-'}
              </h5>
            </p>
          </div>
        {( !props.auth.is_institute_type_school && props.auth.user_type !=99 && props.data && !props.data.product_name &&
        <div className='batch_div'>
            {' '}
            <h6>Category/Course</h6>
            <p>
              <h4 title= {props.data && props.data.master_course_name ? props.data.master_course_name  : '-'}>
                {props.data && props.data.master_course_name  ? props.data.master_course_name.length > 45  ? props.data.master_course_name.substring(0, 44) + '....' : props.data.master_course_name : '-'}
              </h4>
            </p>
          </div>)}

          {( !props.auth.is_institute_type_school && props.auth.user_type !=99 && props.data && props.data.product_name &&
        <div className='batch_div'>
            {' '}
            <h6>Product Name</h6>
            <p>
              <h4 title={props.data && props.data.product_name  ? props.data.product_name : '-'}>
                {props.data && props.data.product_name ? props.data.product_name.length > 45 ? props.data.product_name.substring(0, 44) + '....' : props.data.product_name : '-'}
              </h4>
            </p>
          </div>)}

        {( props.auth.is_institute_type_school && props.auth.user_type !=99 && 
            <div className='batch_div'>    
              <h6>Subject</h6>
                <p>
                  <h4 title={props.data && props.data.subject_name ?  props.data.subject_name : '-'}>
                    {props.data && props.data.subject_name? props.data.subject_name.length > 45? props.data.subject_name.substring(0, 44) + '....'  : props.data.subject_name : '-'}
                  </h4>
                </p>
            </div>)}

          {(  props.auth.user_type ==99 &&  
            <div className='batch_div'>
            {' '}
            <h6>Product Name</h6>
            <p>
              <h4 title={props.data && props.data.product_name  ? props.data.product_name : '-'}>
                {props.data && props.data.product_name ? props.data.product_name.length > 45 ? props.data.product_name.substring(0, 44) + '....' : props.data.product_name : '-'}
              </h4>
            </p>
          </div>)}
        </div>

        <div className='teacher_attendance_div'>
     
    <div className='batch_div'>
     {(  !props.auth.is_institute_type_school && 
            <h6>Batch</h6>)}

        {(  !props.auth.is_institute_type_school &&  
              <p>
              <h4 title={props.data && props.data.course  ? props.data.course  : '-'}>
                {props.data && props.data.course  ? props.data.course.length > 45  ? props.data.course.substring(0, 44) + '....'  : props.data.course  : '-'}
              </h4>
            </p>)}
          </div>
          <div className='tt_teacher_and_button_div'>
            <div className='tt_3_teacher_n_teacher_name'>
              <div className='tt_teacher_image_3'>
                <img src={TeacherPhoto()} height='30px'  style={{borderRadius:"15px"}}></img>
              </div>
              &nbsp;
              <div className='tt_teacher_name' style={{wordBreak:"break-word",padding:"5px"}} 
              title={props.data.teacher_name ? props.data.teacher_name  : '-'}>
                &nbsp;
                {props.data.teacher_name ? props.data.teacher_name.length > 40  ? props.data.teacher_name.substring(0, 39) + '...'  : props.data.teacher_name  : '-'}               
              </div>
            </div>

            {view_or_join_btn === 'view' ? (
                <div  className='tt_attendance_button' >
                  {props.data.download_links.length === 0 ? (
                    <button
                      style={{ background: '#ebe4e4', visibility:"hidden" }}
                      onClick={() => { toast.error(  " Recording List Not Available" )}}
                    >
                      View
                    </button>
                  ) : (
                    <button onClick={togglePopup}  style={{ cursor: 'pointer' }}>
                      View
                    </button>
                  )}
                </div>
              ) : is_join_btn_clickable ? (
                <div className='tt_attendance_button'>
                  {!props.auth.parentslogin && <button onClick={() => {join();del6(); }}  style={{ cursor: 'pointer' }}  >  Join  </button>}
                  { props.auth.parentslogin && <button onClick={() => { del6();toast.error("Parents are not allowed to join"); }}  style={{ background:"rgb(227, 227, 227)", cursor: 'not-allowed'}}  >  Join  </button>}
                </div>
              ) : (
                <div className='tt_attendance_button'>
                  {!props.auth.parentslogin && <button  onClick={()=>{ del6();toast.error("Class not started yet"); }} style={{background:"rgb(227, 227, 227)", cursor: 'not-allowed' }} > Join </button>}
                  { props.auth.parentslogin &&<button  onClick={()=>{ del6();toast.error("Parents are not allowed to join"); }} style={{background:"rgb(227, 227, 227)", cursor: 'not-allowed' }} > Join </button>}
                </div>
              )
            }
          </div>       
        </div>
      </div>
    </div>
  )

  function Status()
{
  if(props.data && props.timestring && props.data.start_time && props.data.end_time) 
  {
  //  present time dates>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  var timestrin = props.timestring
  var fulldatess = timestrin.substr(0, 10)
  var curr_year = fulldatess.substr(0, 4)
  var today = fulldatess.substr(8, 10)
  var curr_monn = fulldatess.substring(5)
  var curr_month = curr_monn.substr(0, 2)
  var currr_time = timestrin.substring(11, 16)
  var curr_time = currr_time.substring(0)
  var curr_hour = curr_time.substring(0, 2)
  var curr_minute = curr_time.substring(3, 5)
  var curr_time_epoch = new Date( Number(fulldatess.substr(0, 4)),  Number(curr_month),  Number(today),  Number(curr_hour),  Number(curr_minute) ).getTime()

    //live class start time >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  var class_start_date = props.data.date
  var class_start_year = class_start_date.substr(0, 4)
  var class_today_date = class_start_date.split('-')[2]
  var class_start_monn = class_start_date.substr(5)
  var class_start_month = class_start_monn.substr(0, 2)
  var class_start_time = props.data.start_time
  var class_hourr = class_start_time.split(':')[0]
  var class_min = class_start_time.split(':')[1].substr(0, 2)
  var AMorPM = class_start_time.split(':')[1].substr(3)
  var class_hour = complete_digit_array[Number(class_hourr)]

  if ( (Number(class_hourr) < 12 && AMorPM[0] === 'P') || (Number(class_hourr) === 12 && AMorPM[0] === 'A')
  ) {  class_hour = complete_digit_array[(Number(class_hourr) + 12) % 24]  }
  var class_start_time_epoch = new Date(Number(class_start_date.substr(0, 4)),  Number(class_start_month),  Number(class_today_date),  Number(class_hour),  Number(class_min) ).getTime()
  var class_end_year = class_start_date.substr(0, 4)
  var class_end_monn = class_start_date.substr(5)
  var class_end_month = class_end_monn.substr(0, 2)
  var class_end_time = props.data.end_time
  var class_end_hourr = class_end_time.split(':')[0]
  var class_end_min = class_end_time.split(':')[1].substr(0, 2)
  var endAMorPM = class_end_time.split(':')[1].substr(3)
  var class_end_hour = complete_digit_array[Number(class_end_hourr)]

  if (  (Number(class_end_hourr) < 12 && endAMorPM[0] === 'P') ||  (Number(class_end_hourr) === 12 && endAMorPM[0] === 'A')  ) 
  { class_end_hour = complete_digit_array[(Number(class_end_hourr) + 12) % 24] }

  var class_end_time_epoch = new Date( Number(class_start_date.substr(0, 4)),  Number(class_end_month), Number(class_today_date),  Number(class_end_hour), Number(class_end_min) ).getTime()
 
 duration=(Math.ceil(
  (class_end_time_epoch - class_start_time_epoch) / 60000) &&Math.ceil((class_end_time_epoch - class_start_time_epoch) / 60000) > 0
  && Math.ceil((class_end_time_epoch - class_start_time_epoch) / 60000) + ' mins')

  if (curr_year > class_start_year && curr_year > class_end_year) {} 
  else if (curr_year < class_start_year && curr_year < class_end_year) {
    view_or_join_btn = 'join'
    is_join_btn_clickable = false
  } else if (curr_year === class_start_year && curr_year === class_end_year) {
    if (curr_month > class_start_month && curr_month > class_end_month) {
    } else if (curr_month < class_start_month && curr_month < class_end_month) {
       view_or_join_btn = 'join'
       is_join_btn_clickable = false
    } else if (
      curr_month == class_start_month &&
      curr_month == class_end_month
    ) {
      if (Number(class_today_date) < Number(today)) {
        view_or_join_btn = 'view'
      } else if (Number(class_today_date) > Number(today)) {
        view_or_join_btn = 'join'
        is_join_btn_clickable = false
      } else {
        if (Number(curr_time_epoch) < Number(class_start_time_epoch)) {
          view_or_join_btn = 'join'   
        }
        if (Number(curr_time_epoch) > Number(class_end_time_epoch)) {
          view_or_join_btn = 'view'
          is_join_btn_clickable = false
        }
        if ( Number(curr_time_epoch) >= Number(class_start_time_epoch) &&  Number(curr_time_epoch) <= Number(class_end_time_epoch)
        ) {
          view_or_join_btn = 'join'
          is_join_btn_clickable = true
        }
      }
    }
  }
}}}
const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(SchLiveClass)