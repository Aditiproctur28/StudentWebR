import React from "react";
import SolutionByAdminIcon from "../../../../assets/exam/solutionbyadmin.png"
const SolutionByAdmin =(props)=>{
    return(<>
    <div style={{marginTop:"32px"}}>
            <div style={{display:"flex", alignItems:"center"}}>
                <img src={SolutionByAdminIcon}  height={24} width={24}/>
                <p className="feedbacktitle"> Solution  by admin</p>
                <div className="stateLine" style={{width:"85%"}}></div>
            </div>
            <div>
                <p className="feedbackmsg">{props?.feedback} </p>
            </div>
        </div>
    
    </>)
}
export default SolutionByAdmin;