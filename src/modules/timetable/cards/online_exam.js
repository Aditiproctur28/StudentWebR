import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import 'react-circular-progressbar/dist/styles.css'
import React  from 'react';
import config from '../../../config'
import URL from '../../../api/url'
import { ToastContainer, toast } from 'react-toastify'

// let testpurl = URL[config.env].WEB_TEST_PANEL_URL;

function SchOnlineExam(props) {
 let testpurl= !props.demo_account ? URL[config.env].WEB_TEST_PANEL_URL : URL[config.env].WEB_TEST_PANEL_URL2
  var examstatus=""
  // let authToken = props.auth.institute_id+":"+props.data.test_id+":"+props.auth.user_id+":"+props.auth.password;
  let authToken = props.data.test_inst_id+":"+props.data.test_id+":"+props.auth.user_id+":"+props.auth.password;
  authToken=btoa(authToken);
  authToken = authToken.replaceAll("=", "$");

  examStatuss()
  
  return (
    <div className='callendar_next_each_class_div'>
      <div className='each_class_timings'>
        <div className='class_moto_2'>
          Online Exam       
          </div>
            <p>
              <h5 title={ props.data && props.data.start_time?props.data.start_time:"-" }> 
              {props.data.start_time? (props.data.start_time.length>15?props.data.start_time.substring(0,14)+"....":props.data.start_time):"-"}</h5>
            </p>
            <p></p>
            <p>
              <h6>{props.data.duration? (props.data.duration.length>6?props.data.duration.substring(0,6)+"....":props.data.duration+" Mins"):"-"}</h6>
            </p>
      </div>

      <div className='batch_vertical_div_container'>
        <div className='batch_vertical_div'></div>
      </div>

      <div className='subject_teacher_etc'>
        <div className='batch_subject_div'>
          <div className='batch_div'>
              <h6>Exam Name </h6>
              <p>
                <h4 title={props.data && props.data.subject_name? props.data.subject_name :"-"}>
                    {props.data.subject_name? (props.data.subject_name.length>40?props.data.subject_name.substring(0,39)+"....":props.data.subject_name) :"-"}             
                </h4>
              </p>
          </div>
        {( props.auth.user_type == 99 &&
          <div className='batch_div'>
            <h6>Product Name</h6>
            <p>
              <h4 title={props.data && props.data.product_name? props.data.product_name: '-'}>
                  {props.data && props.data.product_name ? props.data.product_name.length > 45 ? props.data.product_name.substring(0, 44) + '....'  : props.data.product_name : '-'}
              </h4>
            </p>
          </div>)}

          {( props.auth.user_type != 99 && props.data && props.data.product_name &&
          <div className='batch_div'>
            <h6>Product Name</h6>
            <p>
              <h4 title={props.data && props.data.product_name? props.data.product_name: '-'}>
                  {props.data && props.data.product_name ? props.data.product_name.length > 45 ? props.data.product_name.substring(0, 44) + '....'  : props.data.product_name : '-'}
              </h4>
            </p>
          </div>)}

        </div>
        <div className='teacher_attendance_div'>
          <div className='batch_div'>
          </div>
          <div className='tt_class_attendance_div'>
            <div className='tt_2_teacher_name'>
              <h6>Status</h6>
              <p>
                <h4>{examstatus}</h4>
              </p>
            </div>

            <div className='tt_attendance_button'>
              {examstatus==="Ongoing" && !props.auth.parentslogin &&
                <button style={{cursor:"pointer"}}
                onClick={() => window.open(testpurl+"/"+authToken,'location=yes,scrollbars=yes,status=yes')}
                >Start</button>}

              {examstatus==="Ongoing" && props.auth.parentslogin &&
                <button style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}} onClick={()=>{toast.error("Parents are not allowed to give exam"); }}
                >Start</button>}

              {examstatus==="Upcoming" &&
                <button style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}}> Start</button>}

              {examstatus==="Expired" &&
                <div> <button style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}}>Expired</button>           
                  </div>
                }
               {examstatus==="Mock/Practice" &&
               <div>
                 </div>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  function examStatuss()
{
  ///////////////// EPOCHs CALCULATION:
  if(props.data && props.timestring && props.data.date && props.data.end_date && props.data.end_time && props.data.start_time)
  {
    var complete_digit_array= {0:'00',1: '01',2: '02', 3: '03',4: '04',5: '05', 6: '06',7: '07',8: '08', 9: '09', 10: '10',11: '11', 12: '12', 13: '13',14: '14',15: '15',16: '16', 17: '17', 18: '18', 19: '19',20: '20', 21: '21',22: '22', 23: '23',24: '24', 25: '25',26: '26',27: '27',28: '28', 29: '29', 30: '30', 31: '31', }
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
    var curr_time_epoch = new Date(Number(fulldatess.substr(0, 4)),Number(curr_month),Number(today),Number(curr_hour),Number(curr_minute)).getTime()

    //live class start time >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    var class_start_date = props.data.date
    var class_start_year = class_start_date.substr(0, 4)
    var start_date_digit = class_start_date.split('-')[2]
    var class_start_monn = class_start_date.substr(5)
    var class_start_month = class_start_monn.substr(0, 2)
    var class_start_time = props.data.start_time
    var class_hourr = class_start_time.split(':')[0]
    var class_min = class_start_time.split(':')[1].substr(0, 2)
    var AMorPM = class_start_time.split(':')[1].substr(3)
    var class_hour = complete_digit_array[Number(class_hourr)]
    if ((Number(class_hourr) < 12 && AMorPM[0] === 'P') ||(Number(class_hourr) === 12 && AMorPM[0] === 'A')) 
    {class_hour = complete_digit_array[(Number(class_hourr) + 12) % 24]}
    var class_start_time_epoch = new Date( Number(class_start_date.substr(0, 4)),Number(class_start_month), Number(start_date_digit), Number(class_hour), Number(class_min)).getTime()

    //live class end time >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
   
    var class_end_date = props.data.end_date
    var class_end_year = class_end_date.substr(0, 4)
    var end_date_digit = class_end_date.split('-')[2]
    var class_end_monn = class_end_date.substr(5)
    var class_end_month = class_end_monn.substr(0, 2)
    var class_end_time = props.data.end_time
    var class_end_hourr = class_end_time.split(':')[0]
    var class_end_min = class_end_time.split(':')[1].substr(0, 2)
    var endAMorPM = class_end_time.split(':')[1].substr(3)
    var class_end_hour = complete_digit_array[Number(class_end_hourr)]
    if ((Number(class_end_hourr) < 12 && endAMorPM[0] === 'P') ||(Number(class_end_hourr) === 12 && endAMorPM[0] === 'A') ) 
    {class_end_hour = complete_digit_array[(Number(class_end_hourr) + 12) % 24]}
    var class_end_time_epoch = new Date(Number(class_end_date.substr(0, 4)),Number(class_end_month), Number(end_date_digit), Number(class_end_hour), Number(class_end_min)).getTime()
    /////////////////EXAM STATUS
 
    if((Number(curr_time_epoch/1000) >= Number(class_end_time_epoch/1000)) && (Number(curr_time_epoch/1000) > Number(class_start_time_epoch/1000)))
    {examstatus="Expired" }
    else if ((Number(curr_time_epoch/1000) < Number(class_start_time_epoch/1000)) && (Number(curr_time_epoch/1000) < Number(class_end_time_epoch/1000)))
    {examstatus="Upcoming" }
    else if (( Number(curr_time_epoch/1000) >= Number(class_start_time_epoch/1000)) && (Number(curr_time_epoch/1000) < Number(class_end_time_epoch/1000)))
    {examstatus="Ongoing"}
}}}
const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(SchOnlineExam)