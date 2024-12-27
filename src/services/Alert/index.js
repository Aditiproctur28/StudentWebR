import React from "react"
import Icon from "../../assets/Icon.png"
import './Alert.css'
import { connect } from "react-redux"
const Alerts = (props)=>{
    return(<>
    <div className="popup-box">
    <div className="box2">
          <div style={{display:"flex", flexDirection:"row", alignItems:"center",}}>
          <img style={{width:"40px", height:"40px", marginRight:"20px"}} src={Icon}/>
          <p className="AlertText">Alert</p>
          </div>
         
        
        <div style={{display:"flex", flexDirection:"column", marginTop:"10px", width:"100%"}}>
            <p >{props.error_msg.split("app_link :")[0]}</p>
        <a href={props.error_msg.split("app_link :").pop()} target="_blank" style={{color:"blue", marginTop:"10px"}}>{props.error_msg.split("app_link :").pop()}</a>
        <div style={{display:"flex", justifyContent:"flex-end" , width:"100%"}}>
        <button style={{ marginTop:"20px", width:"10%", cursor:"pointer"}} onClick={()=>props.alertToggleFunc()}>Ok</button>
        </div>
        </div>  
        </div>

    </div>
    </>)
}
const mapStateToProps = (state) => ({ ...state.auth })
export default connect(mapStateToProps)(Alerts)