import React, { useState } from 'react';
import Docimg from '../../../../assets/assignment/docicon.png'
import Cancleimg from '../../../../assets/assignment/upfcancle.png';
import '../../../../css/assignment/submit_assignment.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../../components/loader';



const Uplode_file = (props) => { 
    const SubString = (data) =>{
        if(data.length> 50){     
            return data.substring(0, 50) + "..."
        }
        else {
            return data 
        }
    }

    const cancletoggle = () => {
        if (props.data && props.data.attachment_id) {
            //execute if previouds files
            let uplarr = props.prev_student_attachments;
            uplarr.splice(props.in, 1);
            props.setPrev([...uplarr])
            let temp = props.details.attachment_id;
            temp.push(props.data.attachment_id);
            props.valueChange('attachment_id', temp);

        } else {
            //execute if mew files
            let arr = props.filelist;
            arr.splice(props.i, 1);
            props.valueChange('file_list', arr);
        }

    }

    return (<>
        <div className={"upf_main_div"} >
            <div className="upf_docimg">
                <img src={Docimg} />
            </div>
            <div className="upf_filename">
                <p>{SubString(props.filename)}</p>

            </div>

            {(props.assignmentDetails.student_status === "Pending" || props.assignmentDetails.student_status === "Draft" ||  props.assignmentDetails.student_status === "Not Submitted") &&
                <div className="upf_canclebtn">
                    <button onClick={cancletoggle}><i className="fa fa-times-circle-o" aria-hidden="true" style={{ fontSize: "20px", color: "#FF0707" , cursor:"pointer"}}></i></button>
                </div>
            }

        </div>
        <ToastContainer />

    </>)
}
export default Uplode_file;