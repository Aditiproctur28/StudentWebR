import React from 'react'
import './examCard.css'
import examdate from '../../../assets/products/examdate.png'
import ghadi2 from '../../../assets/products/ghadi2.png'
import teer from '../../../assets/products/teer.png'
import { connect } from 'react-redux'

class ExamcardOth extends React.Component  {

    constructor(props)
  { super(props);}

render() {
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
                     >{this.props.element_object.test_name.substr(0,25)}</span>
                  </div>
                  <div >
                     <div className="exam-image-div">
                        <img src={teer} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date">Start Date</span>
                           <span className="start-dateformat">{this.props.element_object.start_date?this.props.element_object.start_date.substr(0,10):"-"}</span>
                        </div>
                     </div>
                  </div>

                  <div>
                     <div className="exam-image-div">
                        <img src={ghadi2} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date">Time & Duration </span>
                           <span className="start-dateformat"> 
                          {this.props.element_object.duration?this.props.element_object.duration:"-"} Mins</span>
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
               <div className="exam-button-div">
                  <button className="exam-button">Start</button>
               </div>
            </div>
         </div>
      </>
   )

}
}

const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(ExamcardOth)
