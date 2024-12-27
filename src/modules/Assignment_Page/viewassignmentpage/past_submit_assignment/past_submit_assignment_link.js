import React from 'react';
import '../../../../css/assignment/pastviewAssignmentcss/past_submit_assignment.css'
const past_submit_link = (props) =>{

return(<>
<div className="pastview_sl_maindiv">
    <div className="pastview_sl_linkname">
      <p>{props.link_name}</p>
    </div>
    <div className="pastview_sl_inputlink">
    
        <a onClick={()=>{window.open('http://'+props.link,"_blank")}}>{props.link}</a>
        
    </div>
</div>
</>)
}
export default past_submit_link;