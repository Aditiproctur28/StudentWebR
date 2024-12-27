import { connect } from 'react-redux'
import React from 'react'
import img7 from '../../assets/liveclass/img7.png';
import './Noschedules.css'

class NoSchedule extends React.Component 
 {
render()
{
    return(
        <>  <div className="class_status_container" style={{ background: "white",}} >        
            <div className="class_status_inner_container" style={{ background: "white" }}>
              <p className="no_class_status_p"> Click on the Test Type to view the exam reports </p>
              <img src={img7} />
            </div>
            </div>
        </>
    )
}}
const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(NoSchedule)
