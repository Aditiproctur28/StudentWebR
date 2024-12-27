import React from 'react'
import './examCard.css'
import ghadi2 from '../../../assets/products/ghadi2.png'
import teer from '../../../assets/products/teer.png'
import { connect } from 'react-redux'

class ExamcardPr extends React.Component  {

    constructor(props)
  {super(props);}

render() {
   return (
      <>
         <div className="exam-card">
            <div className="side-margine">
            </div>
            <div className="exam-maindiv">
               <div className="remaining-div" style={{minWidth:"75%"}}>
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
                           <span className="start-date">Attempted</span>
                           <span className="start-dateformat">
                           {this.props.element_object.test_limit>0 &&
                              this.props.element_object.total_attempts +" Out of "+ this.props.element_object.test_limit}
                               {this.props.element_object.test_limit==0 &&
                             this.props.element_object.total_attempts
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
export default connect(mapStateToProps)(ExamcardPr)