import React  from "react";
import './examBack.css'
import arrow from '../../assets/studyMaterial/arrow.png'
import ComparisionWithStudent from "./comparisionWithStudent";
import { connect } from 'react-redux'
import ExamScoreCard from "./examScoreCard";
import pass from '../../assets/products/pass.png'
import block2 from '../../assets/products/block2.png'
// import ComparisionWithStudent from "./comparisionWithStudent";



class OfflineClassSchForUpcoming extends React.Component  {


    constructor(props)
  {
      super(props);
      
      this.state = 
      {
      
      };
    
   }

 

render()
{
    return(

        <>
            <div className="offline-exam-details">
                <div className="off-exam">
                    <div className="off-exam-date">
                        <span>21-09-2021 Monday</span>
                        <span className="off-heading2">12:00 PM - 1:00 PM  </span>
                    </div>

{/* 
                    <div className="offline-result">
                        <div className="off-div">
                            <span className="off-heading">Attendance</span>
                            <span className="off-image"><img src={pass} /></span>
                        </div>

                        <div className="off-div">
                            <span className="off-heading">Marks</span>
                            <span className="off-heading2">17/20</span>
                        </div>

                        <div className="off-div">
                            <span className="off-heading">Rank</span>
                            <span className="off-heading2">2<img className="off-image2" src={block2} /></span>
                        </div>
                    </div> */}

                    <div className="offline-result2">
                        <span className="off-heading">Subjects</span>
                        <span className="off-heading2">Bioloogy, Science, Maths </span>
                    </div>

                    <div className="offline-result2">
                        <span className="off-heading">Batch</span>
                        <span className="off-heading2">Amet minim mollit non deseru</span>
                    </div>

                    <div className="offline-result2">
                        <span className="off-heading">Room No</span>
                        <span className="off-heading2">4343</span>
                    </div>
                </div>
                <div className="off-exam2-div">
                    <div className="offline-result2">
                        <span className="off-heading">Subject links</span>
                        <span className="off-heading2">Amet minim mollit non deseru</span>
                    </div>
                    <div className="offline-result2">
                        <span className="off-heading">Description</span>
                        <span className="off-heading2">Amet minim mollit non deseru</span>
                    </div>

                </div>

            </div>

        </>
    )
}
}



const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(OfflineClassSchForUpcoming)
