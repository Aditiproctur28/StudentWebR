import React from 'react'
import './examCard.css'
import ghadi2 from '../../../assets/products/ghadi2.png'
import teer from '../../../assets/products/examdate.png'
import { connect } from 'react-redux'

class ExamcardMock extends React.Component  {
    constructor(props)
  {super(props); }

render() {
   return (
      <>
         <div className="exam-card">
            <div className="side-margine">
            </div>
            <div className="exam-maindiv">
               <div className="remaining-div" style={{minWidth:"80%"}}>

               <div className="exam-name">
                     <span className="examtopic-name"
                     title={this.props.element_object.test_name}
                     >{this.props.element_object.test_name.substr(0,47)}{this.props.element_object.test_name.length>47 && "..."}</span>
                  </div>

                  <div >
                     <div className="exam-image-div">
                        <img src={teer} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date">End Date</span>
                        {
                        //  FOR EXAM DESK SCHEDULES END DATE 
                        this.props.element_object.end_date &&  <span className="start-dateformat">{this.props.element_object.end_date?this.props.element_object.end_date.substr(0,10):"-"}</span>
                        }

                        {
                        //  FOR PRODUCT EXAM SCHEDULES END DATE 
                        this.props.element_object.test_end_date &&  <span className="start-dateformat">{this.props.element_object.test_end_date?this.props.element_object.test_end_date.substr(0,10).split("-").reverse().join("-"):"-"}</span>
                        }

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
                               Math.trunc((this.props.element_object.duration/60))+  " Hr " + (this.props.element_object.duration%60)+ " Mins"
                              : 
                                this.props.element_object.duration  +   " Mins"):"-"}
                                
                           </span>
                        </div>
                     </div>                    
                  </div>
               </div>        
           {  
           this.props.status ==="attempted_n_result_published" &&
              <div className="exam-button-div">
                  <button className="exam-button" 
                 
                  onClick={()=>
                     {this.props.FromChild(true,this.props.test_id,this.props.test_name,this.props.element_object)
                     }             
                  }>View</button>              
               </div>
               }
              {
                  (this.props.status ==="expired" 
                  || this.props.status ==="attempted_n_under_evaluation" 
                  ) &&
                  <div className="exam-button-div2">
                  <div className="No-report">No Report Available</div>
               </div>
               }          
            </div>
         </div>
      </>
   )
}
}
const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(ExamcardMock)