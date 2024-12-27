import React, {useEffect, useState} from 'react';
import '../../../../css/assignment/pastviewAssignmentcss/past_remark_assignment.css';
import Past_solution_pdf from './past_solution_pdf';
import api from '../../../../api/api';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Past_remark_assignment = (props) =>{
    const[solutionpdf , setsolutionpdf] = useState({}) 
    const SubString = (data) =>{
        if(data.length> 30){
            return data.substring(0, 30) + "..."
        }
        else {
            return data 
        }
    }
    useEffect(() => {
        let request = {
            url: `/api/v2/onlineAssignment/getAssignmentSolution/${props.auth.institute_id}/${props.auth.student_id}/${props.assignmentDetails.file_id}`,
            token: props.auth.student_auth
        }
        api.getAuth(request).then(data => {
            setsolutionpdf(data.data.result)
           
        }).catch((err) => {
            if (err && err.response && err.response.status == 403) {
               { props.dispatch({ type: 'LOGOUT' }) }
            } else if (err.response && err.response.data && err.response.data.message) {
               toast.error(err.response.data.message)
            }else{
               toast.error("Network error");
            }
   
         })  
        
    }, [])
    return(<>
    <div className="pastview_remark_assignment_div">
       {props.assignmentDetails.evaluation_required == "Y" &&<> <div className="pastview_ra_total_marks">
            
            {props.assignmentDetails.enable_grade?<p>Grade</p>: <p>Total Marks </p>}
            <div className="pastview_ra_total_marks_value">
            {props.assignmentDetails.enable_grade?<label>{props.assignmentDetails.grade}</label>: <label>{props.assignmentDetails.evaluation_marks}</label>} 
            </div>


        </div>
        {
          !props.assignmentDetails.enable_grade&&
          <div className="pastview_ra_marks_obtained">
          <p>Marks Obtained</p>
          <div className="pastview_ra_marks_obtained_value">
          <label>{props.assignmentDetails.student_marks}</label>
          </div>
      </div>  
        }</>}
       
        <div className="pastview_ra_remark">
            <p>Remarks</p>
            <div className="pastview_ra_remark_value">
                {props.assignmentDetails.teacher_comment?<label style={{wordBreak:"break-all"}}>{props.assignmentDetails.teacher_comment}</label>:<lable>---</lable>}
                
            </div>
            

        </div>
        {
            (Object.values(solutionpdf).length > 0)&&
        (<div className="pastview_ra_solution">
            <p>Solutions</p>
            <div className="pastview_ra_salution_pdf">
                {
                   solutionpdf.map((data,index)=>{
                        return(
                            !data.attachment_url&&<Past_solution_pdf key={index} name={data.attachment_name} attachment_id={data.attachment_id} size={data.size}/>
                        )
                    })
                }
                 <div>
            {
                   solutionpdf.map((data,index)=>{
                     
                        return(
                            data.attachment_url&&<div className="solutionUrl">
                                <p title={data.attachment_display_name}>{ SubString(data.attachment_display_name)} </p>
                                <a onClick={()=>{window.open('http://'+props.link_name,"_blank")}}>{data.attachment_url}</a>
                                </div>
                        )
                    })
                }

            </div>
               
            </div>
           
            
        </div>)
}
    </div>
    <ToastContainer/>
    </>)
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(Past_remark_assignment)