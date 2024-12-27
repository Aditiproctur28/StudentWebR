import React, { useState , useEffect } from 'react';
import Uplode_file from './uplode_file_pdf';
import Submit_assignment_link from './submit_assignment_link';
import Uplodedfilelink from './Uplodedfilelink';


const Submit_assignment = (props) => {
    let comment = props.assignmentDetails.student_comment ? props.assignmentDetails.student_comment : "";
    const [remark, setremark] = useState(comment);
    const addRemark = () => {
        props.valueChange('remark', remark);
    }

    const showLinkInput = () => {   
        let arr = props.prev_student_attachments && props.prev_student_attachments.filter((el) => { return el.attachment_url });
        if (Number(props.details.url_List.length) + Number(arr.length) > 4) {
            return false;
        } else {
            return true;
        }
    }
    useEffect(() => {
        addRemark()
    }, [remark])

    return (<>
        <div className={(props.attached === "link" ? "show" : "hide")}>
            {showLinkInput() &&
                <Submit_assignment_link {...props} />
            }
        </div>
        <div style={{ marginTop: "50px" }}>
            {
                props.details.file_list.map((data, index) => (
                    <Uplode_file key={index} details={props.details} assignmentDetails={props.assignmentDetails} valueChange={props.valueChange} i={index} filename={data.name} filelist={props.details.file_list} data={data} />
                ))
            }
            {
                props.prev_student_attachments && props.prev_student_attachments.map((data, index) => (
                    data.attachment_url == null &&
                    <Uplode_file key={index} details={props.details} valueChange={props.valueChange} setPrev={props.setPrev} prev_student_attachments={props.prev_student_attachments} in={index} assignmentDetails={props.assignmentDetails} filename={data.attachment_display_name} data={data} />

                ))
            }
            <div>
                {
                    props.details.url_List.map((data, index) => (
                        <Uplodedfilelink i={index} details={props.details} valueChange={props.valueChange} linkname={data.display_name} i={index} url={data.url} url_List={props.details.url_List} data={data} />
                    ))
                }
                {
                    props.prev_student_attachments && props.prev_student_attachments.map((data, index) => (
                        data.attachment_url && <Uplodedfilelink details={props.details} setPrev={props.setPrev} key={index} in={index} valueChange={props.valueChange} linkname={data.attachment_display_name} url={data.attachment_url} prev_student_attachments={props.prev_student_attachments} data={data} />
                    ))
                }

            </div>

        </div>
        <div className="sub_ass_remark">
            <p>Remarks</p>
            <input  maxLength="200" placeholder="Add Here" value={remark} onChange={(e) => { setremark(e.target.value) }}></input>
        </div>
    </>)
}

export default Submit_assignment;