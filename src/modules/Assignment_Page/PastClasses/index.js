import React, { useEffect, useState } from 'react';
import Dateimg from '../../../assets/assignment/dateimg.png';
import moment from 'moment';
import './AssiPast_module.css';
import Assignment_Img from '../../../assets/assignment/Assignment_Img.png'

const AssiPastClasses = (props) => {
    const [student, filter_students] = useState(props.past_online_assignment_list);
    const [status, filter_status] = useState([])

    useEffect(() => {
        onSerach(props.search)
    }, [props.search]);

    useEffect(() => {
        OnFilter(props.fstatus)
    }, [props.fstatus]);


    const OnFilter = (text) => {
        if (text !== 'Select Status') {
            let temp = props.past_online_assignment_list.filter(function (el) {
                let status_to_compare = el.student_status == 'Submitted' ? (el.teacher_status == "Evaluated" ? el.teacher_status: el.student_status) : el.student_status;
                return status_to_compare === text;
            });
            filter_students(temp);
            filter_status(temp)

        }
        else {
            filter_students(props.past_online_assignment_list);
            filter_status(props.past_online_assignment_list)
        }

    }

    const onSerach = (text) => {
        if (text.trim().length !== 0) {
            let temp = status.filter(function (el) {
                return el.student_status.toUpperCase().includes(text.toUpperCase()) ||
                    el.end_date.toUpperCase().includes(text.toUpperCase()) ||
                    ((el.course_name !== undefined && el.course_name !== null && el.course_name.toUpperCase().includes(text.toUpperCase())) || false) ||
                    ((el.title !== undefined && el.title !== null && el.title.toUpperCase().includes(text.toUpperCase())) || false) ||
                    ((el.subject_name !== undefined && el.subject_name !== null && el.subject_name.toUpperCase().includes(text.toUpperCase())) || false) ||
                    ((el.days_left !== undefined && el.days_left !== null && el.days_left.toString().toUpperCase().includes(text.toUpperCase())) || false)
            });
            filter_students(temp);
        }
        else {
            filter_students(status);
        }
    }
    return (<>
        {student.length == 0 ?
            <div className="assignment_main_div">
                <div className="no_assignment">
                    <p> No Assignments Found! </p>
                </div>
                <div className="no_assignment_img">
                    <img src={Assignment_Img} />
                </div>
            </div>
            :
            student.map((data, index) => {
                return (<div className="Ongoing_Class_Main_Div">      
                    <div className="Inner_Div_Set_Margin">
                        <div className="Class_Name">
                            <p title={data.title} className="Class_Name_P">{data.title}</p>
                        </div>
                        <div className="Course_Name">
                            <p title={data.course_name}>{data.course_name}</p>
                        </div>
                        <div className="Subject_Name">
                            <p title={data.subject_name}>{data.subject_name}</p>
                        </div>
                        <div className="AssiDate">
                            <img src={Dateimg} />
                            <p><lable className="dueDatetitle">Due Date:</lable> {moment(new Date(data.end_date)).format("DD-MM-YYYY")}</p>
                        </div>

                        <div className="Main_Review">
                            <div className="Status">

                                {data.student_status === "Draft" && (
                                    <p className="Status_value">{data.student_status}</p>
                                )}
                                {data.student_status === "Not Submitted" && (
                                    <p className="Status_value Expired ">{data.student_status}</p>
                                )}
                                {
                                    data.student_status === "Pending" && (
                                        <p className="Status_value Open">{data.student_status}</p>
                                    )}
                                {
                                    data.student_status === "Submitted" && (
                                        data.teacher_status == "Evaluated" ?<p className="Status_value Submitted  ">{data.teacher_status}</p>:
                                        <p className="Status_value Submitted  ">{data.student_status}</p>
                                        
                                    )}
                                    {
                                    data.student_status === "Expired" && (
                                        <p className="Status_value Expired ">{data.student_status}</p>
                                    )}
                            </div>

                            <a className="Review_and_Submit" href={`assignment/${data.file_id}`}>View</a>
                        </div>
                    </div>
                </div>)
            })
        }
    </>)
}
export default AssiPastClasses