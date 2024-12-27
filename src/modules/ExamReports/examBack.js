import React from "react";
import './examBack.css'
import arrow from '../../assets/studyMaterial/arrow.png'
import ComparisionWithStudent from "./comparisionWithStudent";
import { connect } from 'react-redux'
import ExamScoreCard from "./examScoreCard";
import { ErrorMessageHandling } from '../../components/error';
import { ToastContainer, toast } from 'react-toastify';
import api from "../../api/api";
import Loader from "../../components/loader";
import config from '../../config'
import URL from '../../api/url'
let testpurl = URL[config.env].WEB_TEST_PANEL_SCORE_URL;  

class ExamBackNav extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            summary_score_or_comparison: "summary",
            average_report: [],
            question_wise_distribution: [],
            subject_wise_distribution: [],
            test_report: [],
            topper_report: [],
            loaderflag: true
        };
    }
    getScoreAPi() {
        let request = {
            url: `/api/v1/studentdashboard/testReports/${this.props.auth.account_id + '/' + this.props.auth.user_id}/${this.props.online_element_card_test_id}/-1`,
            token: this.props.auth.scorecard_auth_token
        }
        api.getAuth(request).then(data => {
            this.setState({loaderflag:false})
            this.setState({average_report:data.data.average_report})
            this.setState({question_wise_distribution:data.data.question_wise_distribution})
            this.setState({subject_wise_distribution:data.data.subject_wise_distribution})
            this.setState({test_report:data.data.test_report})
            this.setState({topper_report:data.data.topper_report})
        }).catch((error) => {   
            if (error && error.response && error.response.status == 403) {
                { this.props.dispatch({ type: 'LOGOUT',msg:error.response.data.message }) }
            } else if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else { toast.error(ErrorMessageHandling(error));  }
        })
    }
    componentDidMount() {
        this.getScoreAPi(); }
    render() {
        let authToken = this.props.auth.account_id+":"+this.props.auth.user_id+":"+this.props.online_element_card_test_id+":-1";
        authToken=btoa(authToken);
        authToken = authToken.replaceAll("=", "$");
        return (
            <>
            <ToastContainer/>
            {this.state.loaderflag && <div><Loader /></div>}
                {  
                    < div >
                        <div >
                            <div className="back-div2">
                                <span onClick={() => { this.props.FromChildExamBack(false,this.props.element_object.label_id) }}>Back</span>
                                <span className="arrow-exam"><img src={arrow} /></span>
                                <span
                                >{this.props.test_name? this.props.test_name.substr(0,29) :""}</span>
                            </div>
                        </div>
                        <div >
                            <div className="back-div3">
                                <span className="nav-heading-exam" style={this.state.summary_score_or_comparison === "summary" ? { background: "#1953E7", color: "white" } : {}}
                                    onClick={() => { this.setState({ summary_score_or_comparison: "summary" }) }}>Summary</span>
                                    {/* FOR NON-PRODUCT SCH */}
                                    {                             
                                    (                                                               
                                    <span className="nav-heading-exam" style={this.state.summary_score_or_comparison === "score" ? { background: "#1953E7", color: "white" } : {}}
                                    onClick={() => {
                                            this.setState({ summary_score_or_comparison: "score" });                                     
                                            window.open(testpurl+"/advresult/"+authToken);  }}
                                    >Score Card</span>    
                                    )                               
                                    }
                                        {/* FOR PRODUCT EXAM SCH */}
                                    {
                                        this.props.element_object.test_type_id != 2 &&
                                        <span className="nav-heading-exam" style={this.state.summary_score_or_comparison === "comparison" ? { background: "#1953E7", color: "white" } : {}}
                                        onClick=
                                        { () => { this.setState({ summary_score_or_comparison: "comparison" })} }
                                    >Comparison With Topper</span>
                                    }                       
                            </div>
                        </div>
                    </div >
                }    
                { 
                    ( this.state.summary_score_or_comparison === "summary")  && <ExamScoreCard 
                    element_object={this.props.element_object} 
                    online_element_card_test_id={this.props.online_element_card_test_id}  
                    average_report={this.state.average_report} 
                    topper_report={this.state.topper_report}
                        test_report={this.state.test_report}
                    subject_wise_distribution={this.state.subject_wise_distribution}
                    question_wise_distribution={this.state.question_wise_distribution} />
                }
                { 
                    this.state.summary_score_or_comparison === "comparison" && <ComparisionWithStudent
                    average_report={this.state.average_report} 
                    topper_report={this.state.topper_report}
                    test_report={this.state.test_report} /> 
                }
                        
        </>
    )
  }
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(ExamBackNav)