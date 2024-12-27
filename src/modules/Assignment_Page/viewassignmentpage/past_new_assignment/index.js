import React, { useState } from 'react';
import '../../../../css/assignment/pastviewAssignmentcss/past_new_assignment_madule.css'
import Dateicon from '../../../../assets/assignment/dateicon.png';
import Past_Assignment_pdf from './past_new_assignment_pdf';
import moment from 'moment';
import {ImAttachment} from "react-icons/im";
import { connect } from 'react-redux';
const Past_new_assignment = (props) => {
    return (<>
        <div className="pastview_new_assignment_container">
            <div className="pastview_new_assignment_main_div">
                <div className="pastview_new_assignment_class_name">
                    <p>{props.assignmentDetails.title}</p>
                </div>

                <div className="pastview_new_assignment_subject_name">
                    <p><span className="pastview_new_assignment_subject_title_name">Subject:</span>{props.assignmentDetails.subject_name?<span>{props.assignmentDetails.subject_name}</span>:<p>-</p>}</p>
                </div>

                {props.assignmentDetails.topic_name&&<>
                <div className="pastview_new_assignment_subtopic_name">
                    <div className="pastview_new_assignment_topic">
                        <p><span className="pastview_new_assignment_subject_title_name">Topic:</span>{props.assignmentDetails.topic_name?<span>{props.assignmentDetails.topic_name}</span>:<p>-</p>}</p>
                    </div>
                    <div className="pastview_divder_div" >

                    </div>
                    <div className="pastview_new_assignment_subtopic">
                        <p><span className="pastview_new_assignment_subject_title_name">SubTopic:</span>{props.assignmentDetails.sub_topic_name?<span>{props.assignmentDetails.sub_topic_name}</span>:<p>-</p>}</p>
                    </div>
                </div>
                </>}

                <div className="pastview_new_assignment_date">
                    <div className="pastview_new_assignment_date_main">
                        <div className="pastview_date_title">
                            <div>
                                <img src={Dateicon} />
                            </div>
                            <div className="pastview_due_date">
                                <p>Due Date:</p>
                            </div>

                        </div>
                        <div className="pastview_date_text">
                            <p>{moment(new Date(props.assignmentDetails.end_date)).format("DD-MM-YYYY")}</p>
                        </div>

                    </div>
                    <div className="pastview_divder_div">

                    </div>
                    <div className="pastview_course_title_main">
                        <div className="pastview_course_title">
                            <p>{props.auth.is_institute_type_school ?<p>Section</p>:<p>Batch Name</p> } </p>

                        </div>
                        <div className="pastview_course_text">
                            <p>{props.assignmentDetails.course_name}</p>

                        </div>

                    </div>
                </div>

                <div className="pastview_new_assignment_description">
                    <div className="pastview_description_title">
                        <p> Description</p>
                    </div>
                    <div className="pastview_description_text">
                        <p>{props.assignmentDetails.description}</p>

                    </div>
                </div>

                <div className="pastview_new_assignment_pdf">
                    {props.assignmentDetails && props.assignmentDetails.attachment_lists && Array.isArray(props.assignmentDetails.attachment_lists) &&
                        props.assignmentDetails.attachment_lists.map((key, index) => {
                            return (
                                !key.attachment_url ? <Past_Assignment_pdf key={index} size={key.size} name={key.attachment_display_name} attachment_id={key.attachment_id} /> :
                                    <div className="pastview_new_assignment_link">
                                        <p>
                                        {key.attachment_display_name} 
                                        </p>
                                        <div className="pastview_new_assignment_link_details">
                                        <ImAttachment/>
                                        <a target="_blank" onClick={()=>{window.open('http://'+key.attachment_url,"_blank")}}>{key.attachment_url}</a>

                                        </div>
                                        
                                    </div>
                            )

                        })
                    }
                </div>

            </div>



        </div>

    </>)
}
const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(Past_new_assignment)