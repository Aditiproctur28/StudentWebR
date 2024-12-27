import React from "react";
import AnswerIcon from "../../../../assets/exam/answer.png"
const SolutionByAdmin =(props)=>{
    return(<>
    <div style={{marginTop:"32px"}}>
            <div style={{display:"flex", alignItems:"center"}}>
                <img src={AnswerIcon}  height={24} width={24}/>
                <p className="feedbacktitle"> Your Answer</p>
                <div className="stateLine" style={{width:"85%"}}></div>
            </div>
            <div>
                <p className="feedbackmsg">{props?.attempt_answer} </p>
            </div>
        </div>
    
    </>)
}
export default SolutionByAdmin;