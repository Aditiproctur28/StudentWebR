import React from 'react'
import '.././examBack.css'
import moment from 'moment'
import { connect } from 'react-redux'
import ExamcardMock from './examcardMock'
import ExamcardPr from './examcardPr'
import ExamcardOn from './examcardOn'
import ExamcardOth from './examcardOth'
import 'react-toastify/dist/ReactToastify.css'
import NoSchedule from '../NoSchedule'


class Examdesk_exams extends React.Component {
    constructor(props)
    {super(props);}

    render() {
        return (
            <div>    
                <div>
                    {this.props.response_data_acc_to_label_id.length && this.props.response_data_acc_to_label_id.length > 0 
                      ?             
                        <div> 
                            { (this.props.response_data_acc_to_label_id.map(
                                  (element_object, obj_index) =>
                                  ((element_object.test_name.toUpperCase().indexOf(this.props.Search.toUpperCase())!=-1) || this.props.Search == "") && 
                                  <div>
                                    {(this.ExpiredOrAttempted(element_object) === 'expired' || this.ExpiredOrAttempted(element_object) === 'attempted_n_under_evaluation' || this.ExpiredOrAttempted(element_object) === 'attempted_n_result_published') &&
                                          ( //IF NO DATE PICKED
                                            !this.props.clicked_date
                                            ?  
                                              (<div>
                                                  {    
                                                    element_object.test_type_id===1 &&
                                                    <ExamcardMock
                                                      test_name={element_object.test_name}
                                                      test_id={element_object.test_id}
                                                      FromChild={this.props.FromChild}  
                                                      element_object={element_object}
                                                      status={this.ExpiredOrAttempted(element_object)} 
                                                    />
                                                  }
                                                  {
                                                    element_object.test_type_id===2 && element_object.total_attempts>0 &&
                                                    <ExamcardPr
                                                      test_name={element_object.test_name}
                                                      test_id={element_object.test_id}
                                                      FromChild={this.props.FromChild} 
                                                      element_object={element_object}
                                                      status={this.ExpiredOrAttempted(element_object)} 
                                                      />
                                                  }
                                                  {   
                                                    element_object.test_type_id===4 &&
                                                    <ExamcardOn
                                                      test_name={element_object.test_name}
                                                      test_id={element_object.test_id}
                                                      FromChild={this.props.FromChild} 
                                                      element_object={element_object}
                                                      status={this.ExpiredOrAttempted(element_object)}  
                                                      />
                                                  }

                                                  {    
                                                    (!element_object.test_type_id===1 && !element_object.test_type_id===2 && !element_object.test_type_id===4) &&
                                                    <ExamcardOth
                                                      test_name={element_object.test_name}
                                                      test_id={element_object.test_id}
                                                      FromChild={this.props.FromChild} 
                                                      element_object={element_object}
                                                      status={this.ExpiredOrAttempted(element_object)} 
                                                    />
                                                  }
                                              </div>
                                             )                   
                                            :                                           
                                              ( ///////////////////////////////////////////////////IF ANY DATE PICKED                               
                                                <div>
                                                  <div style={{display:"none"}}>
                                                      {  
                                                        element_object.start_date &&
                                                        (this.reverse_start_date_for_click_date_examdesk_schedules
                                                          = element_object.start_date.split(' ')[0].split("-").reverse().join("-")
                                                        )        
                                                      }                                                    
                                                      {
                                                        element_object.end_date &&
                                                        (
                                                          this.reverse_end_date_for_click_date_examdesk_schedules
                                                          = element_object.end_date.split(' ')[0].split("-").reverse().join("-")
                                                        )                                                     
                                                      }
                                                  </div>
                                                    {    
                                                      element_object.test_type_id===1 &&
                                                        ( 
                                                          moment(this.props.clicked_date).isSameOrAfter(this.reverse_start_date_for_click_date_examdesk_schedules) &&
                                                          moment(this.props.clicked_date).isSameOrBefore(this.reverse_end_date_for_click_date_examdesk_schedules)                                  
                                                        ) 
                                                      &&
                                                        <ExamcardMock
                                                            test_name={element_object.test_name}
                                                            test_id={element_object.test_id}
                                                            FromChild={this.props.FromChild} 
                                                            element_object={element_object}
                                                            status={this.ExpiredOrAttempted(element_object)}  
                                                          />
                                                    }

                                                    { 
                                                      element_object.test_type_id===2 && element_object.total_attempts>0 &&
                                                      <ExamcardPr
                                                          test_name={element_object.test_name}
                                                          test_id={element_object.test_id}
                                                          FromChild={this.props.FromChild} 
                                                          element_object={element_object}
                                                          status={this.ExpiredOrAttempted(element_object)}  
                                                        />
                                                    }

                                                    {
                                                        element_object.test_type_id===4 &&
                                                        (moment(this.props.clicked_date).isSameOrAfter(this.reverse_start_date_for_click_date_examdesk_schedules) &&
                                                        moment(this.props.clicked_date).isSameOrBefore(this.reverse_end_date_for_click_date_examdesk_schedules)
                                                        ) 
                                                        &&
                                                        <ExamcardOn
                                                            test_name={element_object.test_name}
                                                            test_id={element_object.test_id}
                                                            FromChild={this.props.FromChild} 
                                                            element_object={element_object}
                                                            status={this.ExpiredOrAttempted(element_object)}    
                                                          />
                                                    }

                                                    {
                                                      (!element_object.test_type_id===1 && !element_object.test_type_id===2 && !element_object.test_type_id===4) &&
                                                      <ExamcardOth
                                                          test_name={element_object.test_name}
                                                          test_id={element_object.test_id}
                                                          FromChild={this.props.FromChild} 
                                                          element_object={element_object}
                                                          status={this.ExpiredOrAttempted(element_object)}  
                                                        />
                                                    }
                                                </div>                                       
                                              )                             
                                          )                
                                      }

                                  </div>
                                )
                              )
                            }
                        </div>
                      : 
                        (!this.props.AnyProductExam &&  !this.props.clicked_date) &&
                          <div>
                              <NoSchedule />
                          </div>
                    }
                </div>    
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
export default connect(mapStateToProps)(Examdesk_exams)
