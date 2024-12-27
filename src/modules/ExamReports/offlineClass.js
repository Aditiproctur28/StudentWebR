import React from 'react'
import './offlineClass.css'
import { Line } from 'react-chartjs-2';
import OfflineClassSch from './OfflineClassSchedules'
import OfflineClassSchForUpcoming from './OfflineSchForUpcomingExams'
import NoSchedule from './NoSchedule';
import { connect } from 'react-redux'

    class OfflineClass extends React.Component  {
        constructor(props)
        {super(props);       
        this.state = {choosen_graph_subject:"" };  }
        
        all_exam=[]
        subject_wise_classified_exams=[]
        all_subject_array=[]
        reduced_subjects=[]
        labels_super_array=[]
        data_super_array=[]
        order_of_choosen_graph_subject=""
        graph_plot_data_acc_to_sub_choosen=""
        labels_of_graph_subject_choosen="" 

 render()
  {  
    return (<>
        <div className="offline-container" style={{height:"fit-content"}}>
            { this.props.offline_label_element.length>0
                &&
                    this.props.offline_label_element.map((element,index)=>
                    (  element.pastCourseExamList && element.pastCourseExamList.length>0) 
                    && element.pastCourseExamList.map((list_element,index)=>
                        <div>
                            {this.props.offline_choose_btn===element.course_Name  &&
                            <div> {  <OfflineClassSch element={element} list_element={list_element}/>  } </div> }                                  
                        </div>
                        ) )        
            }

            {this.props.offline_choose_btn==="analysis"  &&  
            <div><div style={{display:"none"}}></div> {  this.AnalysisGraphPlotter()} </div> }
            {this.props.offline_choose_btn==="upcoming_exam" &&
                <div>           
                    { this.props.offline_data &&  this.props.offline_data.batchExamSchdJsons  && this.props.offline_data.batchExamSchdJsons.futureCourseExamSchdJson && 
                    this.props.offline_data.batchExamSchdJsons.futureCourseExamSchdJson[0] && this.props.offline_data.batchExamSchdJsons.futureCourseExamSchdJson[0].futureCourseExamList && 
                    this.props.offline_data.batchExamSchdJsons.futureCourseExamSchdJson[0].futureCourseExamList.length>0
                    ?
                    this.props.offline_data.batchExamSchdJsons.futureCourseExamSchdJson[0].futureCourseExamList.map(()=>         
                        <OfflineClassSchForUpcoming /> )                                
                    : <NoSchedule />
                    }
                </div>        
            }
        </div>
    </>)
 }

 AnalysisGraphPlotter()     
 {
    this.all_exam=[]
    this.all_subject_array=[]
    var all_exm_list=[]
    var all_subject=[]
    this.subject_wise_classified_exams=[]
    this.reduced_subjects=[]
    this.labels_super_array=[]
    this.data_super_array=[]
    this.order_of_choosen_graph_subject=""
    this.graph_plot_data_acc_to_sub_choosen=""
    this.labels_of_graph_subject_choosen=""
    
     if(this.props.offline_label_element.length>0)
        {
            for(var t in this.props.offline_label_element)
            {
                if(this.props.offline_label_element[t].pastCourseExamList && this.props.offline_label_element[t].pastCourseExamList.length>0)
                {
                    for (var u in this.props.offline_label_element[t].pastCourseExamList)
                    {
                        var list_element=(this.props.offline_label_element[t].pastCourseExamList)[u]
                        all_exm_list.push(list_element)

                        if(list_element.subjectWiseExamSchdList && list_element.subjectWiseExamSchdList[0])
                        {
                            all_subject.push(list_element.subjectWiseExamSchdList[0].subject_name)
                        }

                    }
                }
            }
            this.all_exam=all_exm_list
            this.all_subject_array=all_subject
        }
                var duplicate_sub_removed = all_subject.filter(function(item, pos) {
                    return all_subject.indexOf(item) == pos;
                })
            this.subject_wise_classified_exams=[]   
        for (var r in duplicate_sub_removed)
        {
            if(this.state.choosen_graph_subject && this.state.choosen_graph_subject===duplicate_sub_removed[r])
            {
                this.order_of_choosen_graph_subject=r
            }
            this.subject_wise_classified_exams.push([])
            this.data_super_array.push([])
            this.labels_super_array.push([])
            for (var s in all_exm_list )
            {
            if( all_exm_list[s].subjectWiseExamSchdList && all_exm_list[s].subjectWiseExamSchdList[0] && all_exm_list[s].subjectWiseExamSchdList[0].subject_name &&
                all_exm_list[s].subjectWiseExamSchdList[0].subject_name===duplicate_sub_removed[r] )
                {                      
                this.subject_wise_classified_exams[r].push(all_exm_list[s])
                this.data_super_array[r].push(all_exm_list[s].subjectWiseExamSchdList[0].marks_obtained)                       
                this.labels_super_array[r].push(all_exm_list[s].exam_date)                     
                }
            }
        }
        this.reduced_subjects=duplicate_sub_removed
        this.graph_plot_data_acc_to_sub_choosen=this.data_super_array[this.order_of_choosen_graph_subject]
        this.labels_of_graph_subject_choosen=this.labels_super_array[this.order_of_choosen_graph_subject]                 
        var data = {
            labels: this.labels_of_graph_subject_choosen?this.labels_of_graph_subject_choosen:[],
        
            datasets: [{
                label: 'Obtained Marks',
                data: this.graph_plot_data_acc_to_sub_choosen?this.graph_plot_data_acc_to_sub_choosen:[],
                backgroundColor: [],
                borderColor: ['rgba(255, 99, 132, 1)', ],
                borderWidth: 1}]
        }

return(
     <div className="offline-exam-div">
         <center> 
             <div className="offline-exam" >
                 <div className="offline-exam-cont">
                     <span className="off-heading2">Student Performance Report</span>
                     <span  className="off-heading">Subject Wise Exam distribution</span>
                 </div>
                 <div width="400" height="100" className="chart-bar">
                     <Line data={data}   width="400" height="100" />
                 </div>
             </div>
             {   duplicate_sub_removed &&(duplicate_sub_removed.map((element)=>
                 <div style={{display:"inline-block"}}>
                 &nbsp;&nbsp;&nbsp;&nbsp;
                 <input type="radio" value={element} name="gender"  onChange={(e)=>this.setState({choosen_graph_subject:element})}  /> 
                 {element}                            
                 </div>)  )
             }
         </center>       
     </div> )
 } 

}
const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(OfflineClass)