import React, { useEffect, useState } from 'react'
import '../../../css/assignment/pastviewAssignmentcss/past_assignment_main_page_module.css'
import True_remark from '../../../assets/assignment/true_remark.png'
import Unreached_remark from '../../../assets/assignment/unreached_remark.png'
import Past_New_assignment from './past_new_assignment'
import Past_Submit_assignment from './past_submit_assignment'
import Ongoing_submit_assignment from './ongoing_submit_assignment'
import Past_Remark_assignment from './past_remark_assignment'
import attachimg from '../../../assets/assignment/attachimg.png'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import api from '../../../api/api'
import Header from '../../../components/header'
import Loader from '../../../components/loader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorMessageHandling } from '../../../components/error'
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import fevicon from '../../../assets/favicon.png'

const Pastviewassigment = (props) => {
  let { fileId } = useParams()
  const [assignmentDetails, setassignmentDetails] = useState({})
  const [studentAttachment, setStudentAttachment] = useState({})
  const [flag, setflag] = useState(false)
  const [file_lenght , setFilelength] = useState(null)
  const [classes, setclasses] = useState('')
  const [attached, setattached] = useState('')
  const [stdComment, setstdComment] = useState('')
  const [details, setdetails] = useState({
    url_List: [],
    file_list: [],
    remark: '',
    attachment_id: [],
  })
  const [prev_student_attachments, setPrev] = useState([])

  const valueChange = (k, v) => {
    let temp = details
    temp[k] = v
    setdetails({ ...details, ...temp })
  }
  function fileLength(){
    let arr = prev_student_attachments && prev_student_attachments.filter((el) => { return !el.attachment_url  });
    // setFilelength( arr.length + Number(details.file_list.length))
    if (Number(details.file_list.length) + Number(arr.length) > 4) {
      return false;
  } else {
      return true;
  }
  }

  const fileclick = () => {
    setattached('file')
  }
  const linkclick = () => {
    setattached('link')
  }

  const allattachmentAPI = (file_id) => {
    let request = {
      url: `/api/v2/onlineAssignment/get/${props.auth.institute_id}/${file_id}`,
      token: props.auth.student_auth,
    }
    setflag(true)
    api
      .getAuth(request)
      .then((data) => {
        data.data.result.days_left === -1
          ? setclasses('pastClasses')
          : setclasses('ongoingClasses')
        setassignmentDetails(data.data.result)
        setflag(false)
        setstdComment(data.data.result.student_comment)
        // setPrev(data.data.result.attachment_lists)
      })
      .catch((err) => {
        setflag(false)
        if (err && err.response && err.response.status == 403) {
          {
            props.dispatch({ type: 'LOGOUT',  msg:err.response.data.message })
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message)
        } else {
          toast.error(ErrorMessageHandling(err))
        }
      })
  }

  const assignment_Specificdetail_API = (file_id) => {
    let request = {
      url: `/api/v2/onlineAssignment/studentAttachmentsDetail/${props.auth.institute_id}/${props.auth.student_id}/${file_id}`,
      token: props.auth.student_auth,
    }
    setflag(true)
    api
      .getAuth(request)
      .then((data) => {
        setStudentAttachment(data.data.result.student_attachment)
        setflag(false)
        setPrev(data.data.result.student_attachment)
      })
      .catch((err) => {
        setflag(false)
        if (err && err.response && err.response.status == 403) {
          {
            props.dispatch({ type: 'LOGOUT',  msg:err.response.data.message })
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message)
        } else {
          toast.error(ErrorMessageHandling(err))
        }
      })
  }

  const Validate = (type) => {
    if (
      prev_student_attachments.length === 0 &&
      details.file_list.length === 0 &&
      details.url_List.length === 0
    ) {
      toast.error('Please upload at least one assignment file/url')
    } else if (type == 'draft') {
      SubmitApi('Draft')
    } else {
      //add confirm pop up
      if (window.confirm(' Are you sure you want to submit the Assignment ?')) {
        SubmitApi('Submitted')
      }
    }
  }

  const SubmitApi = (type) => {
    setflag(true)
    let fileJson = {
      institute_id: props.auth.institute_id,
      category_id: 255,
      studentId_array: [props.auth.student_id],
      file_id: fileId,
      student_status: type, //Draft, //Submitted
      student_comment: details.remark,
      attachmentId_array: details.attachment_id,
      url_lists: details.url_List,
    }

    const formData = new FormData()
    if (details.file_list.length > 0) {
      for (let i = 0; i < details.file_list.length; i++) {
        formData.append('files', details.file_list[i])
      }
    } else {
      formData.append('files', null)
    }
    formData.append('fileJson', JSON.stringify(fileJson))

    let request = {
      url: '/api/v2/onlineAssignment/student/updateAssignment',
      headers: {
        Authorization: props.auth.student_auth,
        'Content-Type': 'multipart/form-data',
        "Source": "WEB" 
      },
      data: formData,
    }
   

    api
      .postOther(request)
      .then((data) => {
        setflag(false)
        if (type == 'Draft') {
          setTimeout(() => {
            toast.success('Assignment saved as draft successfully!')
          }, 1000)
          setTimeout(() => {
            window.location = '../assignment'
          }, 2000)
        } else {
          setTimeout(() => {
            toast.success('Assignment submitted successfully!')
          }, 1000)
          setTimeout(() => {
            window.location = '../assignment'
          }, 2000)
        }
      })
      .catch((err) => {
        setflag(false)
        if (err && err.response && err.response.status == 403) {
          {
            props.dispatch({ type: 'LOGOUT', msg:err.response.data.message })
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message)
        } else {
          toast.error(ErrorMessageHandling(err))
        }
      })
  }

  useEffect(() => {
    const favicon = document.getElementById("favicon");
    favicon.href = localStorage.getItem('feviconIcon'); 

    assignment_Specificdetail_API(fileId)
    allattachmentAPI(fileId)

  }, [])
 


  return (
    <>
      {flag && (
        <div>
          <Loader />
        </div>
      )}
      <div>
        <Header />
      </div>
      {Object.values(assignmentDetails).length > 0 && (
        <div className='pastview_assignment_details_container'>
          <div className='pastview_assignment_details_main_div'>
            <div className='pastview_new_assignment_details_div'>
              <div className='pastview_new_assignment_details_name'>
                <p>Here is your new assignment. </p>
              </div>
              <div className='pastview_new_assignment_details_remark'>
                <div className='pastview_new_assignment_details_true'>
                  <img src={True_remark} />
                </div>
                <div className='pastview_new_assignment_details_line'>
                  <hr />
                </div>
              </div>
              <div>
                <Past_New_assignment assignmentDetails={assignmentDetails} />
              </div>
            </div>

            <div className='pastview_submit_assignment_details_div'>
              <div
                className={
                  assignmentDetails.student_status !== 'Submitted'
                    ? 'blure'
                    : 'pastview_submit_assignment_name'
                }
              >
                <p>You need to submit your assignment here. </p>
              </div>
              <div className='pastview_submit_assignment_details_remark'>
                <div className='pastview_submit_assignment_details_unreach'>
                  {assignmentDetails.student_status !== 'Submitted' ? (
                    <img src={Unreached_remark} />
                  ) : (
                    <img src={True_remark} />
                  )}
                </div>
                <div className='pastview_submit_assignment_details_line'>
                  {assignmentDetails.student_status !== 'Submitted' ? (
                    <hr className='hrblur' />
                  ) : (
                    <hr />
                  )}
                </div>
              </div>

              <div className='pastview_div_div'>
                {(classes === 'ongoingClasses' || (classes ==='pastClasses' && assignmentDetails.allow_assignment_late_submission ==="Y" ) )&&
                assignmentDetails.student_status !== 'Submitted' ? (
                  <div className='Assignmentsubmitmaindiv'>
                    <div className='pastview_attach_file_main_div'>
                      <button
                        style={{ background: 'none' }}
                        className={
                          'attach_button ' +
                          (attached === 'file' && 'attach_buttonon_click')
                        }
                        onClick={() => {
                          fileclick()
                         if(fileLength()){
                          document.getElementById('file_selection').click()
                         }
                        
                        }}
                      >
                        <div className='pastview_attach_file'>
                          <div className='pastview_attach_file_img'>
                            <img src={attachimg} />
                          </div>
                          <div className='pastview_attach_file_file'>
                            <p>Attach File</p>
                          </div>
                        </div>
                      </button>
                      <input     
                        id='file_selection'
                        style={{ display: 'none' }}
                        value=''
                        type='file'
                        multiple
                        accept='application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*'
                        onChange={(e)=> {
                          if (e.target.files.length > 0 && e.target.files.length <5) {
                            let temp = details.file_list
                            temp = [...temp, ...e.target.files]
                            valueChange('file_list', temp)
                          }                 
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontSize: '10px',
                            fontWeight: '400',
                            color: '#454545',
                          }}
                        >
                          or
                        </p>
                      </div>
                      <button
                        className={
                          'attach_button ' +
                          (attached === 'link' && 'attach_buttonon_click')
                        }
                        onClick={linkclick}
                      >
                        <div className='pastview_attach_link'>
                          <div className='pastview_attach_file_img'>
                            <img src={attachimg} />
                          </div>
                          <div className='pastview_attach_file_file'>
                            <p>Attach Link</p>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      {!(attached == 'link') ? (
                        <p
                          style={{
                            fontSize: '9px',
                            width: '170px',
                            fontWeight: 'normal',
                          }}
                        >
                          The maximum total size allowed to be uploaded (25 MB) and upto 5 files{' '}
                        </p>
                      ) : (
                        <p
                          style={{
                            fontSize: '9px',
                            width: '160px',
                            fontWeight: 'normal',
                            float: 'right',
                          }}
                        >
                          Link from the web and attach upto 5 links {' '}
                        </p>
                      )}
                    </div>
                    <div className='pastview_submit_assignment_div'>
                      <Ongoing_submit_assignment
                        prev_student_attachments={prev_student_attachments}
                        setPrev={setPrev}
                        details={details}
                        valueChange={valueChange}
                        attached={attached}
                        studentAttachment={studentAttachment}
                        assignmentDetails={assignmentDetails}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='pastview_submit_assignment_div'>
                    {Object.values(studentAttachment).length > 0 && (
                      <Past_Submit_assignment
                        submitassigment={studentAttachment}
                        stdComment={stdComment}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className='pastview_remark_assignment_details_div'>
              <div
                className={
                  !(assignmentDetails.teacher_status === 'Evaluated')
                    ? 'blure'
                    : 'pastview_remark_assignment_name'
                }
              >
                <p>Here you can check remark and solution of assignment.</p>
              </div>
              <div className='pastview_remark_assignment_details_remark'>
                <div className='pastview_remark_assignment_details_true'>
                  {assignmentDetails.student_status !== 'Submitted' ? (
                    <img src={Unreached_remark} />
                  ) : (
                    <img src={True_remark} />
                  )}
                </div>
                <div className='pastview_remark_assignment_details_line'>
                  {assignmentDetails.teacher_status !== 'Evaluated' ? (
                    <hr className='hrblur' />
                  ) : (
                    <hr />
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {assignmentDetails.teacher_status !== 'Evaluated' ? (
                    <img src={Unreached_remark} />
                  ) : (
                    <img src={True_remark} />
                  )}
                </div>
              </div>
              <div className='pastview_div_div'>
                {classes === 'ongoingClasses' ?(
                (assignmentDetails.teacher_status === 'Evaluated') ? (
                  <Past_Remark_assignment
                        assignmentDetails={assignmentDetails}
                      />):
                 ( <div className='review'>
                    <p>Review Pending From Faculty</p>
                  </div>)
                ) : (
                  <div>
                    {assignmentDetails.teacher_status === 'Evaluated' ? (
                      <Past_Remark_assignment
                        assignmentDetails={assignmentDetails}
                      />
                    ) :(<div className='review'>
                    <p>Review Pending From Faculty</p>
                  </div>)}
                  </div>
                  
                )}
                 {classes !== 'ongoingClasses' && (
            <div className='main_button_past'>
            <a
            className= {(assignmentDetails.allow_assignment_late_submission ==="Y" && !(assignmentDetails.student_status === 'Submitted'))?'hide':'go_back_past'}
              style={{ float: 'right' }}
              href='../assignment?open=999'
            >
              Go Back
            </a>
            </div>
          )}
              </div>
            </div>

            <div
              className={
                
                !(assignmentDetails.teacher_status === 'Evaluated')
                  ? 'hide'
                  : 'pastview_complete'
              }
            >
              <p>complete</p>
            </div>
          </div>
          {(classes === 'ongoingClasses' ||  (classes ==='pastClasses' && assignmentDetails.allow_assignment_late_submission ==="Y" ) ) && (
            <div className='main_button'>
              <a className={classes === 'ongoingClasses'? 'go_back':( assignmentDetails.student_status === 'Submitted'? "hide":'go_back') }  href={classes === 'ongoingClasses'?'../assignment':'../assignment?open=999' }>
                Go Back
              </a>
              {
                props.auth.parentslogin?
                <button
                className={
                  assignmentDetails.student_status === 'Submitted'
                    ? 'hide'
                    : (classes === 'ongoingClasses'?'save_as_draft' : 'hide') 
                }
                onClick={()=>toast.error("Parents are not allowed to submit")}
              >
                Save as Draft
              </button>:
               <button
               className={
                 assignmentDetails.student_status === 'Submitted'
                   ? 'hide'
                   : (classes === 'ongoingClasses'?'save_as_draft' : 'hide') 
               }
               onClick={() => {
                 Validate('draft')
               }}
             >
               Save as Draft
             </button>
              }
              {
                 props.auth.parentslogin?
                 <button
                 className={
                   assignmentDetails.student_status === 'Submitted'
                     ? 'hide'
                     : 'submit_assignment'
                 }
                 onClick={()=>toast.error("Parents are not allowed to submit")}
               >
                 Submit Assignment
               </button>:
                   <button
                   className={
                     assignmentDetails.student_status === 'Submitted'
                       ? 'hide'
                       : 'submit_assignment'
                   }
                   onClick={() => {
                     Validate('submit')
                   }}
                 >
                   Submit Assignment
                 </button>

              }
             
            
            </div>
          )}
         
        </div>
      )}

      <ToastContainer limit={1}/>
    </>
  )
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(Pastviewassigment)
