import { connect } from 'react-redux'
import React from 'react'
import img7 from '../../assets/liveclass/img7.png';


class NoOffSchedule extends React.Component 
 {

render()
{
    return(

        <>

<div className="class_status_container" style={{ background: "white" }} >
          
            <div className="class_status_inner_container" style={{ background: "white" }}>

              {/* <p className="no_class_status_p"> No Exam Available </p> */}
              <img src={img7} />
            </div>
            </div>

      
        </>
    )
}
}



const mapStateToProps = state =>({auth:state.auth})
export default connect(mapStateToProps)(NoOffSchedule)
