import React  from "react";
import './examBack.css'
import { connect } from 'react-redux'
import block2 from '../../assets/products/block2.png'

class OfflineClassSch extends React.Component  {
    constructor(props)
  {super(props); }

    DaysIntToWord= { 0:"Sunday", 1:"Monday",2:"Tuesday",  3:"Wednesday",4:"Thursday", 5:"Friday",6:"Saturday", }
    each_month_digit_value_all_mixed = {"Jan":1,"Feb":2,"March":3,"Mar":3,"April":4,"Apr":4,"May":5,"Jun":6,"June":6,"Jul":7,"July":7,"Aug":8,"Sep":9,"Sept":9,"Oct":10,"Nov":11,"Dec":12,"January":1,"February":2,"March":3,"April":4,"May":5,"June":6,"July":7,"August":8,"September":9, "October":10,"November":11,"December":12}

 subjectList(object)
 {
     var subject_marks_array=[]
     var subject_marks_string=""
     var only_subject_string=""
     var subject_marks_and_only_subject_name_combined_array=[]
   for (var r in object)
   {   subject_marks_array.push(object[r].subject_name+":"+object[r].marks_obtained+"/"+object[r].total_marks+",   ")
       subject_marks_string=subject_marks_string+(object[r].subject_name+" : "+object[r].marks_obtained+" / "+object[r].total_marks+",      ")
       only_subject_string=only_subject_string+(object[r].subject_name+", ")
   }
        subject_marks_and_only_subject_name_combined_array.push(subject_marks_string)
        subject_marks_and_only_subject_name_combined_array.push(only_subject_string)
        return subject_marks_and_only_subject_name_combined_array
 }

render()
{
    return(
    <>
        <div className="entire_off_exam_container" style={{wordBreak:"break-word", }} >
            <div className="offline-exam-details" >
                <div className="off-exam">
                    <div className="off-exam-date" style={{ width:"25%" }} >
                        <span>{this.props.list_element.exam_date?this.props.list_element.exam_date:""}                                 
                        {this.props.list_element.exam_date
                            ?
                            (" "+this.DaysIntToWord
                                [new Date
                                    (this.props.list_element.exam_date.split("-")[2],
                                    this.each_month_digit_value_all_mixed[this.props.list_element.exam_date.split("-")[1]]-1,
                                    this.props.list_element.exam_date.split("-")[0],).getDay() ])
                            :
                            ""     
                        }
                        </span>
                        <span className="off-heading2">{this.props.list_element.start_time?this.props.list_element.start_time:""}- {this.props.list_element.end_time?this.props.list_element.end_time:""} </span>
                    </div>
                    <div className="offline-result" style={{width:"35%",}} >
                        <div className="off-div">
                            <span className="off-heading"  >Attendance</span>
                            <span className="off-image"  style={{width:"100%",marginLeft:"0"}}>
                                <center> 
                                    <div  style={ this.props.list_element.attendance_status && this.props.list_element.attendance_status=="P"
                                        ?
                                        {width:"20px",minWidth:"20px",borderRadius:"5px",background:"#61C611",color:"white",padding:"2px"}
                                        :
                                        this.props.list_element.attendance_status && this.props.list_element.attendance_status!="P"
                                        ? {width:"20px",minWidth:"20px",borderRadius:"5px",background:"#FF4A4E",color:"white",padding:"2px"} :{} } >
                                         {this.props.list_element.attendance_status?this.props.list_element.attendance_status:"-"}
                                    </div>
                                </center>
                            </span>
                        </div>
                        <div className="off-div">
                            <span className="off-heading">Marks</span>
                            <span className="off-heading2" style={{width:"60px"}}>
                                {(( this.props.list_element.courseLevelMarksObtain !=null && (this.props.list_element.courseLevelMarksObtain || this.props.list_element.courseLevelMarksObtain == 0 || this.props.list_element.courseLevelMarksObtain == "0"))&& this.props.list_element.courseLevelTotalMarks !=null && this.props.list_element.courseLevelTotalMarks >=0
                                    ) ?
                                    this.props.list_element.courseLevelMarksObtain+"/"+this.props.list_element.courseLevelTotalMarks:"-"
                                }                
                            </span>
                        </div>
                        <div className="off-div">
                            <span className="off-heading">Rank</span>
                            <span style={{display:"flex"}} className="off-heading2">{this.props.list_element.courseLevelRank?(this.props.list_element.courseLevelMarksObtain && this.props.list_element.courseLevelMarksObtain>0? this.props.list_element.courseLevelRank:"_"):"-"}
                            <div style={this.props.list_element.courseLevelRank && this.props.list_element.courseLevelRank == 0 ? 
                                {display:"none"}
                                :    
                                    this.props.list_element.courseLevelRank && this.props.list_element.courseLevelRank!=1
                                    ?
                                    {display:"none"}
                                    :
                                    !this.props.list_element.courseLevelRank
                                    ?{display:"none"}:{}  }>
                                <img className="off-image2" src={block2}/>
                            </div>
                            </span>
                        </div>
                    </div>

                    <div className="offline-result2" style={{width:"25%", marginLeft:"0", }} >
                        <span className="off-heading">Subjects</span>
                        <span className="off-heading2">
                            {( (!this.props.list_element.subjectWiseExamSchdList ) ||  (this.props.list_element.subjectWiseExamSchdList && Object.getOwnPropertyNames(this.props.list_element.subjectWiseExamSchdList).length==0) )
                                ?
                                (this.props.list_element.subject_name && (this.props.list_element.subject_name.substr(0,24)))                          
                                :   
                                <div style={{display:"flex"}} title={this.subjectList(this.props.list_element.subjectWiseExamSchdList)[1]}>
                                    {this.subjectList(this.props.list_element.subjectWiseExamSchdList)[1].substr(0,19) }
                                    &nbsp;&nbsp;&nbsp;
                                        <div title={ this.subjectList(this.props.list_element.subjectWiseExamSchdList)[0] }
                                            style={ { border:"1px solid rgb(245, 237, 237)", borderRadius:"5px",width:"20px",color:"blue",fontWeight:"bold",fontSize:"20px",fontStretch:"ultraExpanded", cursor:"text"}  }  >
                                            <center>i</center>
                                        </div>                                     
                                </div>
                            }
                        </span>
                    </div>
                    <div className="offline-result2"  style={{ width:"15%", marginLeft:"0", }} >
                        <span className="off-heading">{this.props.auth.is_institute_type_school?"Section":"Batch"}</span>
                        <span className="off-heading2"
                            title={(this.props.element && this.props.element.course_Name)?this.props.element.course_Name:"-"}>  
                            {(this.props.element && this.props.element.course_Name.substr(0,24))?this.props.element.course_Name:"-"}
                        </span>
                    </div>
                </div>
                {!(this.props.auth.is_institute_type_school) &&
                    <div className="off-exam2-div"  >
                        <div className="offline-result2"  >
                            <span className="off-heading">Topic name(s)</span>
                            <span className="off-heading2" style={{width:"120px"}}
                                title={(this.props.list_element && this.props.list_element.topic_name)?this.props.list_element.topic_name:"-"}> 
                                {(this.props.list_element && this.props.list_element.topic_name)?this.props.list_element.topic_name.substr(0,24):"-"}
                            </span>
                        </div>
                        <div className="offline-result2">
                            <span className="off-heading">Description</span>
                            <span className="off-heading2" style={{width:"350px"}} title={this.props.list_element.examDesc?this.props.list_element.examDesc :"-"} >
                                {this.props.list_element.examDesc ?this.props.list_element.examDesc.substr(0,45) :"-" }
                            </span>
                        </div>              
                    </div>
                }
            </div>                   
        </div>
    </>
    )
}}
const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(OfflineClassSch)