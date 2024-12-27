import React from 'react'
import './examCard.css'
import examdate from '../../../assets/products/examdate.png'
import ghadi from '../../../assets/products/ghadi.png'
import { connect } from 'react-redux'
import config from '../../../config'
import URL from '../../../api/url'
import { ToastContainer, toast } from 'react-toastify'

// let testpurl = URL[config.env].WEB_TEST_PANEL_URL;

class ExamcardOn extends React.Component  {

    constructor(props)
  {super(props);
   this.state = 
   {
      product_api1_response:this.props.product_api1_response ? this.props.product_api1_response :[],
      main_inst_id:""
   }; 
   this.testpurl = !props.demo_account ? URL[config.env].WEB_TEST_PANEL_URL : URL[config.env].WEB_TEST_PANEL_URL2;
}

  ProductTest_id()
  {
     var arr=[]
     var main_inst_id=""
     var brr=this.props.element_object
     if(this.props.product_api1_response && this.props.product_api1_response.length>0)
     {
        arr=this.props.product_api1_response
        for (var r in arr)
        {
           if(brr.test_id == arr[r].test_id)
           {
              main_inst_id=arr[r].test_institute_id
              // this.setState({main_inst_id:arr[r].test_institute_id})
              break
           }
        }
        return main_inst_id
     }
  }
  Product_auth_generation()
  {
     let authToken2 = this.ProductTest_id()+":"+this.props.element_object.test_id+":"+this.props.auth.user_id+":"+this.props.auth.password;
     authToken2=btoa(authToken2);
     authToken2 = authToken2.replaceAll("=", "$");
     return authToken2
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
                     >{this.props.element_object.test_name.substr(0,47)}{this.props.element_object.test_name.length>47 && "..."}</span>
                  </div>
                  <div >
                     <div className="exam-image-div">
                        <img src={examdate} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date">Start Date & Time</span>                     
                           {
                        //  FOR EXAM DESK SCHEDULES END DATE 
                        this.props.element_object.start_date &&  <span className="start-dateformat">{this.props.element_object.start_date?
                           this.props.element_object.start_date.substr(0,10)+" "+" , "+" "+this.props.element_object.start_date.split(" ")[1]
                           :"-"}</span>
                        }
                        {
                        //  FOR PRODUCT EXAM SCHEDULES END DATE 
                        this.props.element_object.test_start_date &&  <span className="start-dateformat">{this.props.element_object.test_start_date?
                           this.props.element_object.test_start_date.substr(0,10).split("-").reverse().join("-")+" "+" , "+" "+this.props.element_object.test_start_date.split(" ")[1]
                           :"-"}</span>
                        }                      
                        </div>
                     </div>
                  </div>

                  <div>
                     <div className="exam-image-div">
                        <img src={ghadi} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date">Duration </span>
                           <span className="start-dateformat"> 
                           {(this.props.element_object.duration || this.props.element_object.duration == 0) &&( this.props.element_object.duration> 60 ? this.props.element_object.duration + " Mins " : this.props.element_object.duration + " Mins ")}</span>
                        </div>
                     </div>                  
                  </div>
               </div>
               <div className="exam-button-div">
               {this.props.status ==="upcoming" &&
                     <button className="exam-button" style={{width:"70px"}}>Upcoming</button>
                  }
                  {/*-------------------------------------------------- FOR-EXAMDESK EXAMS START BUTTON */}
                  { 
                   (this.props.examdesk_or_product=="examdesk" && this.props.status ==="ongoing" && !this.props.auth.parentslogin) &&
                     <button className="exam-button" 
                     onClick={() => window.open(this.testpurl+"/"+authToken,'location=yes,scrollbars=yes,status=yes')}>
                        
                        Start</button>
                  }
                  { 
                   (this.props.examdesk_or_product=="examdesk" && this.props.status ==="ongoing" && this.props.auth.parentslogin) &&
                     <button className="exam-button"  style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}} onClick={()=>{toast.error("Parents are not allowed to give exam"); }} >
                        
                        Start</button>
                  }
                  { 
                   (this.props.examdesk_or_product=="examdesk" && this.props.status ==="resume" && !this.props.auth.parentslogin) &&
                     <button className="exam-button" 
                     onClick={() => window.open(this.testpurl+"/"+authToken,'location=yes,scrollbars=yes,status=yes')}>
                        
                        Resume</button>
                  }
                   { 
                   (this.props.examdesk_or_product=="examdesk" && this.props.status ==="view" && !this.props.auth.parentslogin) &&
                     <button className="exam-button" 
                     onClick={() => window.open(this.testpurl+"/"+authToken,'location=yes,scrollbars=yes,status=yes')}>
                        
                        View</button>
                  }
                
                  { 
                   (this.props.examdesk_or_product=="examdesk" && this.props.status ==="resume" && this.props.auth.parentslogin) &&
                     <button className="exam-button"  style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}} onClick={()=>{toast.error("Parents are not allowed to give exam"); }} >
                        
                        Resume</button>
                  }
                  {/*-------------------------------------------------- FOR-PRODUCT EXAMS START BUTTON */}

                  { 
                   (this.props.examdesk_or_product=="product" && this.props.status ==="ongoing" && !this.props.auth.parentslogin && this.props.product_api1_response && this.props.product_api1_response.length>0) &&
                     <button className="exam-button" 
                     onClick={() => window.open(this.testpurl+"/"+this.Product_auth_generation(),'location=yes,scrollbars=yes,status=yes')}> 
                        
                        Start</button>
                  }
                  
                  { 
                   (this.props.examdesk_or_product=="product" && this.props.status ==="ongoing" && this.props.auth.parentslogin && this.props.product_api1_response && this.props.product_api1_response.length>0) &&
                     <button className="exam-button"  style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}} 
                     onClick={()=>{toast.error("Parents are not allowed to give exam"); }} >
                        
                        Start</button>
                  }
                  { 
                   (this.props.examdesk_or_product=="product" && this.props.status ==="resume" && !this.props.auth.parentslogin && this.props.product_api1_response && this.props.product_api1_response.length>0) && 
                     <button className="exam-button" 
                     onClick={() => window.open(this.testpurl+"/"+this.Product_auth_generation(),'location=yes,scrollbars=yes,status=yes')}> 
                        
                        Resume</button>
                  }
                  { 
                   (this.props.examdesk_or_product=="product" && this.props.status ==="resume" && this.props.auth.parentslogin && this.props.product_api1_response && this.props.product_api1_response.length>0) &&
                     <button className="exam-button"  style={{background:"rgb(227, 227, 227)",cursor: 'not-allowed'}} 
                     onClick={()=>{toast.error("Parents are not allowed to give exam"); }} >
                        
                        Resume</button>
                  }    
               </div>
            </div>
         </div>
      </>
   )
}
}

const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(ExamcardOn)