import React from 'react'
import './examCard.css'
import ghadi2 from '../../../assets/products/ghadi2.png'
import teer from '../../../assets/products/teer.png'
import { connect } from 'react-redux'
import config from '../../../config'
import URL from '../../../api/url'
import { ToastContainer, toast } from 'react-toastify'

// let testpurl = URL[config.env].WEB_TEST_PANEL_URL;

class ExamcardPr extends React.Component  {
    constructor(props)
  {super(props);
   this.testpurl = !props.demo_account ? URL[config.env].WEB_TEST_PANEL_URL : URL[config.env].WEB_TEST_PANEL_URL2;
}
render() {

   let authToken = this.props.auth.institute_id+":"+this.props.element_object.test_id+":"+this.props.auth.user_id+":"+this.props.auth.password;
   authToken=btoa(authToken);
   authToken = authToken.replaceAll("=", "$");

   return (
      <>
         <div className="exam-card">         
            <div className="side-margine">
            </div>
            <div className="exam-maindiv">
               <div className="remaining-div">
               <div className="exam-name">
                     <span className="examtopic-name" 
                     title={this.props.element_object.test_name}
                     >
                        {this.props.element_object.test_name.substr(0,47)}
                        {this.props.element_object.test_name.length>47 && "..."}
                     </span>               
                  </div>
                  <div >
                     <div className="exam-image-div">
                        <img src={teer} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date">Attempts</span>
                           <span className="start-dateformat">
                              {this.props.element_object.test_limit>0 &&
                              this.props.element_object.total_attempts +" Out of "+ this.props.element_object.test_limit}
                               {this.props.element_object.test_limit==0 &&
                             "No Limit"
                             }
                           </span>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div className="exam-image-div">
                        <img src={ghadi2} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date"> Duration </span>
                           <span className="start-dateformat"> 
                           {(this.props.element_object.duration || this.props.element_object.duration == 0)?( this.props.element_object.duration> 60 
                              ?
                               Math.trunc((this.props.element_object.duration/60))+ " Hr " + (this.props.element_object.duration%60)+" Mins"
                              : 
                                this.props.element_object.duration + " Mins"):"-"}                        
                           </span>
                        </div>
                     </div>                    
                  </div>
               </div>
               <div className="exam-button-div">
                 {
                  (this.props.status ==="practice" && this.props.element_object.test_limit==0 && !this.props.auth.parentslogin) &&
                     <button className="exam-button" style={{ cursor: 'pointer' }} 
                     onClick={() => window.open(this.testpurl+"/"+authToken, 'location=yes,scrollbars=yes,status=yes')}                    
                     >start</button>
                  }

                  {(this.props.status ==="practice" && this.props.element_object.test_limit==0 && this.props.auth.parentslogin) &&
                     <button className="exam-button" style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}}  onClick={()=>{toast.error("Parents are not allowed to give exam"); }}                    
                     >start</button>
                  }

                 {
                  this.props.status ==="practice" && this.props.element_object.test_limit>0 && 
                  this.props.element_object.total_attempts<this.props.element_object.test_limit && !this.props.auth.parentslogin &&
                     <button className="exam-button" style={{ cursor: 'pointer' }} 
                     onClick={() => window.open(this.testpurl+"/"+authToken, 'location=yes,scrollbars=yes,status=yes')}            
                     >start</button>
                  }

                 {
                  this.props.status ==="practice" && this.props.element_object.test_limit>0 && 
                  this.props.element_object.total_attempts<this.props.element_object.test_limit && this.props.auth.parentslogin &&
                     <button className="exam-button" style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}}   onClick={()=>{toast.error("Parents are not allowed to give exam"); }}
                     >start</button>
                  }
                  {
                  this.props.status ==="practice" && this.props.element_object.test_limit>0 && 
                  this.props.element_object.total_attempts>=this.props.element_object.test_limit && !this.props.auth.parentslogin &&

                     <button className="exam-button" style={{background:"rgb(227, 227, 227)", cursor: 'pointer' }}>start</button>
                  }

                  {
                  this.props.status ==="practice" && this.props.element_object.test_limit>0 && 
                  this.props.element_object.total_attempts>=this.props.element_object.test_limit && this.props.auth.parentslogin &&

                     <button className="exam-button" style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}}  onClick={()=>{toast.error("Parents are not allowed to give exam"); }}>start</button>
                  }
               </div>
            </div>
         </div>
      </>
   )
}
}

const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(ExamcardPr)