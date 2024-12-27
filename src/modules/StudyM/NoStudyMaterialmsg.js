import React from 'react';
import { connect } from 'react-redux';
import documents from '../../assets/document/documents.png';
import prod from '../../assets/document/prod.png';
import "./noStudyMaterial.css";

function NoStudyMAterialmsg(props) {
  return (<>
    <div className="up">
      <div className="up-container">
        {props.selectedtab == "StudyLibrary" ?
          <div>
            {props.course_type.length > 0 && props.course_type.filter((data) => data.isPaid !== "Y").length > 0 ? <p className="up-text1">Click on the {props.auth.is_institute_type_school == false ? "Course Name" : "Standard"} to View the Study Material</p> : <p className="up-text1">No study materials shared yet!</p>}

            <img src={documents} alt="" />
          </div> :
          <div className="image-div">
            {props.course_type.filter((data) => data.isPaid == "Y").length > 0 ? <p className="up-text1">Click on the Product Name to View the Study Material</p> : <p className="up-text1">No material available!</p>}
            <p className="up-text1"></p>
            <img src={prod} alt="" />
          </div>
        }
      </div>
    </div>
  </>);
}

const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps)(NoStudyMAterialmsg)