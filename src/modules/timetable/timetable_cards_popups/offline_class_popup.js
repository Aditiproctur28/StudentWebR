import cross from '../../../assets/timetable/cross_icon.png';
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

function TtattendancePopups(props) {
  const [attended, setAttended] = useState(0)
  var count=0;

  function CountPresent()
  {
    var count_array=props.responseView.filter(el=> el.status ==="P")
    return count_array.length }

  return (
    <div className='tt_attendance_popup_container'>
      <div className='tt_attendance_popup_inner_container'>
        <div className='tt_cross_icon' style={props.responseView?props.responseView.length?props.responseView.length>4?{top:"1%"}:{top:"4%"}:{top:"4%"}:{top:"4%"}} >
          <img src={cross} onClick={props.onCancel} style={{cursor:"pointer"}}></img>
        </div>    
        <div className='tt_att_popup_top_heading_container'>
          <div className='tt_popup_att_left_heading_container'>
            <h5>Attendance Details</h5>
            <p>
              <div className='horizontal_line_tt_popup'></div>
            </p>
            <p>
              <div className='batch_n_batchtopic'>
                <div className='tt_popup_batch'>
                  <h6>{props.auth.is_institute_type_school?"Section:":"Batch:"}&nbsp;</h6>
                </div>
                <div className='tt_popup_batchtopic'>
                  <h5>{props.course_for_batch}</h5>
                </div>
              </div>
            </p>
          </div>
          <div className='tt_popup_att_right_heading_container'>
            <h6>Class Attended</h6>
            <h4>{CountPresent()}/{props.responseView.length}</h4>
          </div>
        </div>
        <div className='tt_att_popup_below_content_container'>
          <div className='tt_att_below_table_heading_div'>
            <div className='tt_date_n_time'>Date & Time </div>
            <div className='tt_popup_table1_attendance'>
              <center>Attendance</center>
            </div>
            { !props.auth.is_institute_type_school &&       
              <div className='tt_popup_table1_class_type'>Class Type </div>}
            <div className='homework_table1_tt_popup'>Homework</div>
            <div className='remarks_table1_tt_popup'>Remarks</div>
            <div className='description_table1_tt_popup'>Home Work Note(s)</div>
            <div className='description_table1_tt_popup' ><div style={{paddingLeft:"10px"}}>Class Description</div></div>
          </div>         
          {props.responseView.length>0
  ?        props.responseView.map((data,index)=>
          <div className='tt_att_below_content_table_div1'>

            <div className='tt_date_n_time' >
              <div className='tt_date_content1_table1'>{data.date}</div>
              {(data.date && data.start_time && data.end_time)?<div className='date_seperator_tt_popup_container'><div className='date_seperator_tt_popup' >|</div></div>:""}
              <div className='tt_time_content1_table1'>{data.start_time}-{data.end_time}</div>
            </div>
            <div className='tt_popup_table1_attendance'>
              <center>
                <div className='tt_attendance_present_symbol_box'>
                  <div className='tt_attendance_present_symbol_box_text' style={data.status==="P"?{background:"#61C611"}:{background:"#FF4A4E"}}>{data.status}</div>
                </div>
              </center>
            </div>
            {!props.auth.is_institute_type_school &&
              <div className='tt_popup_table1_class_type'>
              <h3 >{data.custom_class_type}</h3>
            </div>}
            <div className='homework_table1_tt_popup'>
              <h3 style={{wordBreak:"break-word"}}>{(!data.home_work_status || (data.home_work_status && data.home_work_status==="Y")) ? 
              "-"
               :
              data.home_work_status
              }</h3>
            </div>
            <div className='remarks_table1_tt_popup'>
              <h2 style={{wordBreak:"break-word"}}>{(data.remark && data.remark.length>0)?data.remark.substr(0,8):"-"}</h2>
            </div>
            <div className='description_table1_tt_popup'>
              <h3 style={{wordBreak:"break-word"}}>{(data.homework_assigned && data.homework_assigned.length && data.homework_assigned.length>0)
              ?
              data.homework_assigned.substr(0,49)
              
              :
              "-"
              }</h3>
            </div>

            <div className='description_table1_tt_popup'>
              <div style={{paddingLeft:"10px"}}>
                <h3 style={{wordBreak:"break-word"}}>{(data.attendance_note && data.attendance_note.length && data.attendance_note.length>0)
                ?
                data.attendance_note.substr(0,49)
                
                :
                "-"
                }</h3>
              </div>
            </div>
            
          </div>)
  : 
      props.loading?
        <div style={{display:"flex",justifyContent:"center" ,color:"#61C611",fontWeight:"bold"}} className='tt_att_below_content_table_div1'>
       . . .
        </div>      
      :
        <div style={{display:"flex",justifyContent:"center" ,color:"#FF4A4E",fontWeight:"bold"}} className='tt_att_below_content_table_div1'>
        NO ATTENDANCE MARKED FOR THIS CLASS!
        </div>     
        }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(TtattendancePopups)