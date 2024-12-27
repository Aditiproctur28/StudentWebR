import React  from "react";
import './../examBack.css'
import { connect } from 'react-redux'
import ExamcardMock from "./examcardMock";
import ExamcardOn from "./examcardOn";
import 'react-toastify/dist/ReactToastify.css';

class Product_exams extends React.Component {
    constructor(props)
    {super(props);}

    render() {
        return (
                <div className="product_exam">
                { (this.props.product_response_data_acc_to_label_id.length && this.props.product_response_data_acc_to_label_id.length>0)
                ?
                    <div className="for_product_schs">       
                        <div className="product_sch_heading">
                            { 
                            (  
                                this.props.ifAnyProductExam &&
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
                        {
                        this.props.product_response_data_acc_to_label_id.map((element_object,obj_index)=>
                        ((element_object.test_name.toUpperCase().indexOf(this.props.Search.toUpperCase())!=-1) || this.props.Search == "") &&                
                            <div className="product_exam_schs">                                               
                            {
                                (
                                   this.props.ExpiredOrAttemptedP(element_object) === 'upcoming' 
                                || this.props.ExpiredOrAttemptedP(element_object) === 'practice'
                                || this.props.ExpiredOrAttemptedP(element_object) === 'ongoing'
                                || this.props.ExpiredOrAttemptedP(element_object) === 'resume'
                                ) &&
                                this.props.ifAnyProductExam &&
        
                                <div>                                                                  
                                { element_object.test_type_id===1 &&
                                <ExamcardMock 
                                test_id={element_object.test_id}
                                element_object={element_object}
                                status={this.props.ExpiredOrAttemptedP(element_object)}
                                product_api1_response={this.props.product_api1_response}
                                examdesk_or_product={this.props.examdesk_or_product}
                                demo_account={this.props.demo_account}
                                />}                               
        
                                { element_object.test_type_id===4 &&
                                <ExamcardOn 
                                test_id={element_object.test_id}
                                element_object={element_object}
                                status={this.props.ExpiredOrAttemptedP(element_object)}
                                product_api1_response={this.props.product_api1_response}
                                examdesk_or_product={this.props.examdesk_or_product}
                                demo_account={this.props.demo_account}
                                />}                                
                                </div>
                            }                                                   
                            </div>
                        )
                        }
                    </div>
                :""    
                }
                </div>
        )
    }
}
const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(Product_exams)