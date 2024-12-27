import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

function SchOfflineExam(props) {
    const [isopen5, closeisopen5] = useState(false)
    const [isopen6, closeisopen6] = useState(false)
    function del5() {closeisopen5(true) }
    function close5() { closeisopen5(false)}
    function del6() {closeisopen6(true)}
    function close6() {closeisopen6(false)}
    return (
      <div>      
        <div className='callendar_next_each_class_div'>
          <div className='each_class_timings'>
            <div className='class_moto_4'>Offline Exam</div>
            <p>
              <h5 title= {
                  props.data.start_time?
                  (props.data.start_time.length>15?props.data.start_time.substring(0,14)+"....":props.data.start_time)
                  :"-"
                }>
              {
                  props.data.start_time?
                  (props.data.start_time.length>15?props.data.start_time.substring(0,14)+"....":props.data.start_time)
                  :"-"
                }
              </h5>
            </p>
            <p></p>
            <p>
              <h6 title={
                  props.data.duration?
                  (props.data.duration.length>6?props.data.duration.substring(0,6)+"....":props.data.duration+" mins")
                  :"-"
                }>
              {
                  props.data.duration?
                  (props.data.duration.length>6?props.data.duration.substring(0,6)+"....":props.data.duration+" mins")
                  :"-"
                }
                </h6>
            </p>
          </div>
    
          <div className='batch_vertical_div_container'>
            <div className='batch_vertical_div'></div>
          </div>
    
          <div className='subject_teacher_etc'>
            <div className='batch_subject_div'>
            <div className='batch_div'>
            
            <h6>Subject(s)</h6>
            <p>
              <h4 title={
              props.data.subject_name?
              (props.data.subject_name.length>45?props.data.subject_name:props.data.subject_name)
              :"-"
            }>
              {
              props.data.subject_name?
              (props.data.subject_name.length>45?props.data.subject_name.substring(0,44)+"....":props.data.subject_name)
              :"-"
            }
              </h4>                      
            </p>
          </div>
              <div className='batch_div'>
              
                {( !props.auth.is_institute_type_school &&
                  <h6>Batch</h6>
                  )}
            {( !props.auth.is_institute_type_school &&
                  <p>
                  <h4 title={
                  props.data.course?
                  (props.data.course.length>45?props.data.course:props.data.course)
                  :"-"
                }>
                  {
                  props.data.course?
                  (props.data.course.length>45?props.data.course.substring(0,44)+"....":props.data.course)
                  :"-"
                }
                  </h4>
                </p>)}
              </div>
            </div>
            <div className='teacher_attendance_div'>
              <div className='batch_div_off_exam'>         
                <h6>Description                      
                </h6>
                <p>
                  <h4 title={
                  props.data.description?
                  (props.data.description.length>90?props.data.description:props.data.description)
                  :"-"
                }>
                  {
                  props.data.description?
                  (props.data.description.length>90?props.data.description.substring(0,89)+"....":props.data.description)
                  :"-"
                }
                    </h4>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(SchOfflineExam)