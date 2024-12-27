import React, { useState } from 'react';
import "../../../../css/assignment/submit_assignment.css"
import Cancle from "../../../../assets/assignment/upfcancle.png"

const Uplodedfilelink = (props) =>{
    const cancletoggle = () =>{
        if (props.data.attachment_url) {
            let uplarr = props.prev_student_attachments;
            let attachment_id = props.details.attachment_id;
            attachment_id.push(props.data.attachment_id);
            uplarr.splice(props.in, 1);
            props.setPrev([...uplarr])
            props.valueChange('attachment_id',attachment_id);
        }
      
       else {
        //execute if mew files
        let url =  props.url_List
        url.splice(props.i, 1);
        props.valueChange('url_List',  url);
    }
    }
    
    
 
    return(
        <>
        <div className="linkmaindiv">
        <div className="cancleLink">
            <button onClick={cancletoggle}><i className="fa fa-times-circle-o" aria-hidden="true" style={{fontSize:"20px" , color:"#FF0707", cursor:"pointer"}}></i></button>
        </div>
      <div className="link_name">
         <p> {props.linkname} </p>
      </div>
      <div className="linkurl">
         <a onClick={()=>{window.open('http://'+props.url,"_blank")}}>{props.url}</a>
      </div>
      </div>
        </>
    )
}
export default Uplodedfilelink;