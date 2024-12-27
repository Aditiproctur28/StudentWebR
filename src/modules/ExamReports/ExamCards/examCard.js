import React from 'react'
import './examCard.css'
import examdate from '../../assets/products/examdate.png'
import ghadi from '../../assets/products/ghadi.png'
import { connect } from 'react-redux'

class ExamCard extends React.Component  {
   constructor(props)
   {
       super(props);
       this.state = 
       {   
              
       };
    }
render() {

   return (
      <>

         <div className="exam-card">
            <div className="side-margine">
            </div>
            <div className="exam-maindiv">
               <div className="remaining-div">

                  <div className="exam-name">
                     <span className="examtopic-name">Deserunt ullamco est sit aliqua dolor do .</span>
                     <span className="examsub-topic">Product : Deserunt ullamco est sit aliqua dolor do .</span>
                  </div>

                  <div >
                     <div className="exam-image-div">
                        <img src={examdate} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date">Start Date</span>
                           <span className="start-dateformat">21-09-2021</span>
                        </div>
                     </div>
                  </div>

                  <div>
                     <div className="exam-image-div">
                        <img src={ghadi} className="exam-dateimage"></img>
                        <div className="combine-date">
                           <span className="start-date">Time & Duration </span>
                           <span className="start-dateformat"> 12:00 PM . 60 Mins</span>
                        </div>
                     </div>

                  </div>
                  <div>
                     <div className="exam-image-div">
                        <div className="combine-date">
                           <span className="start-date">Subject </span>
                           <span className="start-dateformat"> Maths, English, Design</span>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div className="exam-image-div">
                        <div className="combine-date">
                           <span className="start-date">Batch </span>
                           <span className="start-dateformat"> Deserunt ullamco est sit </span>
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

export default ExamCard;