import React from 'react'
import '.././examBack.css'
import moment from 'moment'
import { connect } from 'react-redux'
import ExamcardMock from './examcardMock'
import ExamcardPr from './examcardPr'
import ExamcardOn from './examcardOn'
import ExamcardOth from './examcardOth'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import api from '../../../api/api'
import NoSchedule from '../NoSchedule'
import OfflineClass from '../offlineClass'
import NoOffSchedule from '../NoOffSchedule'
import Moment from 'react-moment'
import { ErrorMessageHandling } from '../../../components/error'
import Loader from '../../../components/loader'
import ErrorBackdrop from '../../../components/error_backdrop'
import Examdesk_exams from './examdesk_exams'


class Product_exams extends React.Component {
    constructor(props)
    {super(props);}

    render() {
        return (
            <div>
            {/*========================IF NO DATE PICKED =======================================================*/}
        { 
         !this.props.clicked_date &&
          <div>
            <div>
              <div>                                        
                {  
                  (                           
                    this.props.AnyProductExam &&
                    !this.props.clicked_date &&
                      <div style={{marginLeft:"20px"}} className="msgdateborder">
                        <div className="msg_days_label">
                          <div className="msg_days_label_days"><p >Products</p></div>
                          <div className="verticalline"></div>
                          <div className="msg_days_label_dates"><p>Exams</p></div>
                        </div>
                        <div className="line_div"></div>
                      </div>
                  )
                }
              </div>
            </div> 
            <div>
              {
                this.props.product_response_data_acc_to_label_id.map((element_object,obj_index)=>
                ((element_object.test_name.toUpperCase().indexOf(this.props.Search.toUpperCase())!=-1) || this.props.Search == "") &&                     
                <div>
                  {
                    (
                    this.ExpiredOrAttempted(element_object) === 'expired' ||
                    this.ExpiredOrAttempted(element_object) === 'attempted_n_under_evaluation' ||
                    this.ExpiredOrAttempted(element_object) === 'attempted_n_result_published'
                    ) &&
                    this.props.AnyProductExam &&
                    !this.props.clicked_date &&
                    <div>
                      { element_object.test_type_id===1 &&                                                            
                      <ExamcardMock 
                      test_id={element_object.test_id}
                      element_object={element_object}
                      status={this.ExpiredOrAttempted(element_object)}
                      FromChild={this.props.FromChild}  
                      />}

                      { element_object.test_type_id===4 &&
                      <ExamcardOn 
                      test_id={element_object.test_id}
                      element_object={element_object}
                      status={this.ExpiredOrAttempted(element_object)}
                      FromChild={this.props.FromChild}  
                      />}                                                                                    
                    </div>
                  }                                                 
                </div>
                )
               } 
            </div>
          </div>
        }
        {
          /*================================IF ANY  DATE PICKED on DATE PICKER =======================================================*/ 
          this.props.clicked_date &&
            <div>     
              <div>
                <div>
                  {  
                    (                           
                      this.props.AnyProductExam &&
                          <div style={{marginLeft:"20px"}} className="msgdateborder">
                            <div className="msg_days_label">
                                <div className="msg_days_label_days"><p >Products</p></div>
                                <div className="verticalline"></div>
                                <div className="msg_days_label_dates"><p>Exams</p></div>
                            </div>
                            <div className="line_div"></div>
                          </div>
                      )
                    }
                  </div>
              </div> 
              <div>
                {
                  this.props.product_response_data_acc_to_label_id.map((element_object,obj_index)=>
                  ((element_object.test_name.toUpperCase().indexOf(this.props.Search.toUpperCase())!=-1) || this.props.Search == "") &&                               
                  <div>                                      
                      <div style={{display:"none"}}>                                                     
                          {
                            element_object.test_start_date &&
                            (this.reverse_start_date_for_click_date_product_exam_schedules
                              = element_object.test_start_date.split(' ')[0]                                                             
                              )                                                          
                          }
                              
                          {
                            element_object.test_end_date &&
                            (
                              this.reverse_end_date_for_click_date_product_exam_schedules
                              = element_object.test_end_date.split(' ')[0]
                            )                                                             
                          }
                       </div>                               

                      {
                        (
                        this.ExpiredOrAttempted(element_object) === 'expired' ||
                        this.ExpiredOrAttempted(element_object) === 'attempted_n_under_evaluation' ||
                        this.ExpiredOrAttempted(element_object) === 'attempted_n_result_published'
                        ) &&

                        moment(this.props.clicked_date).isSameOrAfter(this.reverse_start_date_for_click_date_product_exam_schedules) &&
                        moment(this.props.clicked_date).isSameOrBefore(this.reverse_end_date_for_click_date_product_exam_schedules) &&

                        <div>                                            
                          { 
                            element_object.test_type_id===1 &&    
                            <ExamcardMock 
                            test_id={element_object.test_id}
                            element_object={element_object}
                            status={this.ExpiredOrAttempted(element_object)}
                            FromChild={this.props.FromChild}  
                            />
                          }

                          { 
                            element_object.test_type_id===4 &&
                            <ExamcardOn 
                            test_id={element_object.test_id}
                            element_object={element_object}
                            status={this.ExpiredOrAttempted(element_object)}
                            FromChild={this.props.FromChild}  
                            />
                          }                                        
                        </div>
                      }                                  
                  </div>
                  )
                } 
              </div>
           </div>    
        }
      </div> 
        )
    }
    
    ExpiredOrAttempted(item) {
        var status = ''
        if (
          item.end_timestamp * 1000 < new Date().getTime() && item.total_attempts == 0) {
          status = 'expired'; return status}
        if
        ( item.test_type_id ==2 &&  item.incomplete_attempts + item.total_attempts >= 0 ) 
        { if(item.is_result_published===0)
          {status = 'attempted_n_under_evaluation'
            return status}
          status = 'attempted_n_result_published'
          return status
        }
    
        if ( item.test_type_id ==1 && item.end_timestamp * 1000 < new Date().getTime() && item.total_attempts == 0) 
        { status = 'expired'
          return status  }
    
        if ( item.test_type_id ==1 &&item.incomplete_attempts + item.total_attempts > 0) 
        {if(item.is_result_published===0)
          {status = 'attempted_n_under_evaluation'
            return status}
          status = 'attempted_n_result_published'
          return status }
    
        if ( item.test_type_id ==4 && item.end_timestamp * 1000 < new Date().getTime() && item.incomplete_attempts + item.total_attempts == 0) 
        {if(item.is_result_published===0)
          {status = 'attempted_n_under_evaluation'
            return status }
          status = 'attempted_n_result_published'
          return status  }
    
        if ( item.test_type_id ==4 && item.incomplete_attempts + item.total_attempts > 0 ) 
        { if(item.is_result_published===0)
          {status = 'attempted_n_under_evaluation'
            return status}
          status = 'attempted_n_result_published'
          return status}
          return false
      }
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(Product_exams)
