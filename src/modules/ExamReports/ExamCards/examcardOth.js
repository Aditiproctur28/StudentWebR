import React from 'react'
import './examCard.css'
import ghadi2 from '../../../assets/products/ghadi2.png'
import teer from '../../../assets/products/examdate.png'
import { connect } from 'react-redux'

class ExamcardOth extends React.Component  {
   constructor(props)
  { super(props);  }

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
                     >{this.props.element_object.test_name.substr(0,25)}</span>
                  </div>
                  <div >
                     <div className="exam-image-div">
                        <img src={teer} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date">End Date</span>
                           <span className="start-dateformat">{this.props.element_object.end_date?this.props.element_object.end_date.substr(0,10):"-"}</span>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div className="exam-image-div">
                        <img src={ghadi2} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date"> Duration </span>
                           <span className="start-dateformat"> 
                           {this.props.element_object.duration?( this.props.element_object.duration> 60 ?(this.props.element_object.duration/60).toFixed(2) + "Hr" : this.props.element_object.duration + "Mins"):"-"} </span>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div className="exam-image-div">
                        <div className="combine-date">
                           <span className="start-date">Subject </span>
                           <span className="start-dateformat"> -</span>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div className="exam-image-div">
                        <div className="combine-date">
                           <span className="start-date">Batch </span>
                           <span className="start-dateformat"> - </span>
                        </div>
                     </div>
                  </div>
               </div>           
               {  
           this.props.status ==="attempted_n_result_published" &&
              <div className="exam-button-div">
                  <button className="exam-button"                
                  onClick={()=>
                     {this.props.FromChild(true,this.props.test_id,this.props.test_name)
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
export default connect(mapStateToProps)(ExamcardOth)